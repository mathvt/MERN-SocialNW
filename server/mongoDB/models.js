import mongoose from 'mongoose'


const Users = mongoose.model(
    'users',
    {
        username: {
            type: String, //make unique
            required: true
        },
        mail: {
            type: String,
            required: true
        },
        hash: {
            type: String,
            required: true
        },
        salt: {
            type: String,
            required: true
        },
        profile_img: Buffer,
        date: {
            type: Date,
            default: Date.now
        }
    }
)


const Posts = mongoose.model(
    'posts',
    {
        author: String,
        body: String,
        comments: [{ author: String, body: String, date: Date }],
        date: { type: Date, default: Date.now },
        hidden: Boolean,
        like: Array,
        img: Buffer
    }
)

//Posts.find((err,doc) => console.log(doc))

export { Users, Posts }