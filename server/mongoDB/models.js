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
        avatar: Buffer,
        date: {
            type: Date,
            default: Date.now
        }
    }
)


const Posts = mongoose.model(
    'posts',
    {
        user: String,
        message: String,
        comments: 
        [
            { 
            user: String, 
            text: String,
            date: { type: Date, default: Date.now },
            deleted: {type: Boolean, default: false}
            }
        ],
        sort: { type: Date, default: Date.now},
        date: Date,
        deleted: {type: Boolean, default: false},
        like: Array,
        image: {type: Buffer, default: null}
    }
)

//Posts.find((err,doc) => console.log(doc))

export { Users, Posts }