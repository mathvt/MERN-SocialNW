import express from 'express'
import { Users } from '../mongoDB/models.js'
import { validPassword, genPassword, issueJWT } from '../lib/utils.js'


const router = express.Router()



router.post('/login', async (req, res) => {
    const user = await Users.findOne({ username: req.body.username })
    !user && res.status(401).send('User not found')

    const goodPassword = await validPassword(req.body.password, user.hash, user.salt)

    if (goodPassword) {
        const {token, expire} = issueJWT(user)
        res.status(200).json({ success: true, token, expire });
    }
    else {
        res.status(401).send('Wrong password')
    }


})


router.post('/register', async (req, res) => {
    const checkUser = await Users.findOne({ username: req.body.username }, 'username')
    if(checkUser.username === req.body.username) return res.send('username already taken')

    const [salt, hash] = await genPassword(req.body.password)
    const user = new Users({
        username: req.body.username,
        mail: req.body.mail,
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


router.post('/logout', (req, res) => {
    //TODO
})



export default router
