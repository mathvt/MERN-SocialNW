import express from 'express'
import { Posts } from '../mongoDB/models.js'
import { authmiddlwr } from '../lib/utils.js'


const router = express.Router()

router.use(authmiddlwr)

router.put('/', async (req, res) => {
    console.log(req.body)
    new Posts(req.body).save((err, doc) => err ? console.log(err) : res.json(doc))
})



export default router