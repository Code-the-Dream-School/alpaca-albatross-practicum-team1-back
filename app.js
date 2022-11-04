const express = require('express')
const app = express()

const port = 3000

//routers
const authRouter = require('./routes/Auth')
const postingRouter = require('./routes/Posting')

// TODO: move to env file & get proper dev/prod url(depending on environment)
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017'

MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            return console.log(err)
        }
        const db = client.db('volunteer')

        console.log(`MongoDB Connected: ${url}`)
    }
)

app.use(express.json())

//routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/posting', postingRouter)

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()
