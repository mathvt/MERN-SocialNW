import express from 'express'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

import './mongoDB/db.js'

/*
    In  a .env file:
        PORT=
        DB_STRING=
*/


import msg from './routes/msg.js'
import users from './routes/users.js'

const app = express()
const port = process.env.PORT || 8080

app .use(express.urlencoded({extended : true}))
    .use(express.json())
    .use(cookieParser())
    .use(logger('dev'))

    //.use(express.static(path.join(__dirname, '../client/build')))

    .use('/', users)
    .use('/', msg)


    .listen(port, () => console.log(`Server started at http://localhost:${port}`))
