import express from 'express'
import { Users } from '../mongoDB/models.js'
import { validPassword, genPassword, issueJWT, authmiddlwr } from '../lib/utils.js'



const router = express.Router()



router.post('/login', async (req, res) => {
    const user = await Users.findOne({ mail: req.body.email }).catch(err => console.log(err))
    if(!user) return res.status(404).json({description: 'User not found'})

    console.log('Connected: ',user.username)

    const goodPassword = await validPassword(req.body.pass, user.hash, user.salt)

    if (goodPassword) {
        const token = issueJWT(user)

        res.cookie('token', token, {maxAge: 1000*3600*24*7, httpOnly: true, sameSite: 'lax'})

        res.status(200).json({token, username: user.username});
    }
    else {
        res.status(401).json({description: 'Wrong password'})
    }
})


router.post('/register', checkIfValid, async (req, res) => {  
    const checkUser = await Users.findOne({ username: req.body.pseudo }, 'username')
    
    if(checkUser?.username === req.body.pseudo) {
        return res.status(303).json({description: 'username already taken'})
    }

    const [salt, hash] = await genPassword(req.body.pass)
    const user = new Users({
        username: req.body.pseudo,
        mail: req.body.email,
        hash: hash,
        salt: salt
    })
    user.save((err, doc) => {
        if (err) {
            console.log(err)
            res.json({ success: false })
        }
        else {
            res.json({ success: true })
        }
    })
})


router.patch('/logout', async(req, res) => {
    res.cookie('token', '', {maxAge: 0, httpOnly: true, sameSite: 'lax'})
    res.status(200).send()
})


router.patch('/checkauth', authmiddlwr, async(req, res) => {
    const user = await Users.findOne({ _id: req.jwt.sub }, 'username')
    res.send(user.username)
})


export default router



function checkIfValid(req, res, next) {
    let errRes = {description: 'bad syntax', syntax: []}

    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
    !req.body.pseudo && errRes.syntax.push('pseudo')
    if(!req.body.email || !emailRegex.test(req.body.email)) errRes.syntax.push('email')
    !req.body.pass && errRes.syntax.push('pass')
    req.body.pass2 !==req.body.pass && errRes.syntax.push('pass2')
    !req.body.condition && errRes.syntax.push('condition')

    errRes.syntax.length ? res.status(400).json(errRes) : next()   
}



router.patch('/avatar', async (req, res, next) => {

    let avatar = await Users.findOne({user: req.body.user}, 'avatar')
    res.json({avatar})
})