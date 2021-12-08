import express from 'express'
import { Posts, Users } from '../mongoDB/models.js'
import { authmiddlwr } from '../lib/utils.js'
import multer from 'multer'

const upload = multer()


const router = express.Router()


router.patch('/discussion', async (req, res) => {
    let result = await Posts.find({ deleted: false }, null, { skip: req.body.limit, limit: 10, sort: { sort: -1 } })
    res.json(result)
})

router.patch('/trending', async (req, res) => {
    let result = await Posts.aggregate([
        { $match: { deleted: false } },
        { $project: 
            {
                user: 1,
                message: 1,
                comments: 1,
                date: 1,
                deleted: 1,
                image: 1,
                like: 1,
                length: { $size: '$like' }
            } 
        },
        { $sort: { length: -1 } } ,
        { $limit: 3 }
    ])
    console.log(result)
    res.json(result)
})



router.use(upload.single())
router.use(authmiddlwr)
router.use(checkUser)



router.post('/newMessage', async (req, res, next) => {

    let data = req.body

    if (!data.user || (!data.message && !data.image)) {
        return res.sendStatus(400)
    }

    if (!data.image) data.image = null

    new Posts(data).save((err, doc) => {
        if (err) {
            console.log(err)
            res.sendStatus(500)
        }
        else {
            res.status(200).json(doc)
        }
    })

})


router.put('/editMsg', async (req, res, next) => {

    let postToModify = await Posts.findOne({ _id: req.body.oldMessage }).catch(err => next(err))
    let user = await Users.findOne({ _id: req.jwt.sub }).catch(err => next(err))

    if (postToModify.user === user.username) {

        Posts.updateOne({ _id: req.body.oldMessage }, { message: req.body.newMessage },
            (err) => {
                err ? next(err) : res.sendStatus(200)
            }
        )
    }
    else {
        res.sendStatus(403)
    }
})


router.put('/deleteMsg', async (req, res, next) => {

    let postToDelete = await Posts.findOne({ _id: req.body.messageToDelete }).catch(err => next(err))
    let user = await Users.findOne({ _id: req.jwt.sub }).catch(err => next(err))

    if (postToDelete.user === user.username) {

        Posts.updateOne({ _id: req.body.messageToDelete }, { deleted: true },
            (err) => {
                err ? next(err) : res.sendStatus(200)
            }
        )
    }
    else {
        res.sendStatus(403)
    }
})


router.put('/postComment', async (req, res, next) => {

    try {
        if (!req.body.comment) return res.sendStatus(400)

        let message = await Posts.findOne({ _id: req.body.messageId })
        message.comments.push({ user: req.body.user, text: req.body.comment })
        await message.save()

        res.json(message)
    } catch (err) { err && console.log(err) }


})



router.put('/likeMsg', async (req, res, next) => {

    let post = await Posts.findOne({ _id: req.body.message }, 'like').catch(err => next(err))
    let postLike = post.like
    let user = req.body.user

    try {
        if (!postLike.includes(user)) {
            postLike.push(user)

        }
        else {
            postLike.splice(postLike.indexOf(user), 1)
        }
    } catch (err) {
        console.error(err)
        return res.sendStatus(400)
    }

    Posts.updateOne({ _id: req.body.message }, { like: postLike }, err => err && next(err))
    console.log(postLike)
    res.json(postLike)
})



export default router



async function checkUser(req, res, next) {

    try {
        if (!req.body.user) return next()

        let signedUser = await Users.findOne({ _id: req.jwt.sub })

        if (signedUser.username !== req.body.user) return res.sendStatus(403)
        else return next()
    }
    catch (err) { err && next(err) }
}