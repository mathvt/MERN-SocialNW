import mongoose from 'mongoose'


mongoose.connect(process.env.DB_STRING,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => err ? console.log(err) : console.log('Connected to Mongo'))






//Multiple connections:
/*const [dbConnection, sessionConnection] = new Array(2).fill(0).map(() =>
    mongoose.createConnection(process.env.DB_STRING,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
        (err) => err ? console.log(err) : console.log('Connected to Mongo'))
)


export {dbConnection, sessionConnection}*/