import fs from 'fs'
import crypto from 'crypto'


(async () => {
    crypto.generateKeyPair(
        'rsa',
        {
            modulusLength: 4096,
            publicKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs1',
                format: 'pem'
            }
        },
        (err, publicKey, privateKey) => write(err, publicKey, privateKey)
)
}) ().catch((err) => console.log(err))



function write(err, publicKey, privateKey) {
    if (err) console.log(err)
    else {
        // Private key should be saved elsewhere.
        fs.writeFile('./private.pem', privateKey, (err) => err && console.log(err))
        fs.writeFile('./public.pem', publicKey, (err) => err && console.log(err))
    }
}