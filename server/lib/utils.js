import crypto from 'crypto'
import jsonwebtoken from 'jsonwebtoken'
import fs from 'fs'
import { Posts, Users } from '../mongoDB/models.js'


const priv_key = fs.readFileSync('./keys_ring/private.pem', 'utf-8')
const pub_key = fs.readFileSync('./keys_ring/public.pem', 'utf-8')



export async function genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = await new Promise((resol) =>
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, hash) => {
            if (err) console.error(err)
            else return resol(hash.toString('hex'))
        })
    )

    return [salt, hash]
}


export async function validPassword(password, hash, salt) {
    const hashVerify = await new Promise((resol) =>
        crypto.pbkdf2(password, salt, 10000, 64, 'sha512', (err, hash) => {
            if (err) console.log(err)
            else return resol(hash.toString('hex'))
        })
    )

    return hash === hashVerify;
}


export function issueJWT(user) {
    const expiresIn = '1w'
    const payload = {
        sub: user._id,
        iat: Date.now()
    }

    const signedToken = jsonwebtoken.sign(payload, priv_key, { expiresIn, algorithm: 'RS256' })

    return 'Bearer ' + signedToken
       
}


export function authmiddlwr(req, res, next) {
    
    let parsedToken = req.cookies['token']
    if(req.cookies['token'])
        parsedToken = parsedToken.split(' ')
    else
        return res.status(303).json(null)

    try {
        if (parsedToken[0] !== 'Bearer' || !/\S+\.\S+\.\S+/i.test(parsedToken[1])) throw new Error('nok')

        const verification = jsonwebtoken.verify(parsedToken[1], pub_key, { algorithms: ['RS256'] })
        req.jwt = verification
        next()

    } catch(err) {
        console.log(err.message)
        res.status(401).json({ success: false, msg: "You are not authorized to visit this route" })
    }
}