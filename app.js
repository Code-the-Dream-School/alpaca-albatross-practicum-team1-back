const express = require('express')
const app = express()
const port = 3000
const posting = require('./models/posting')

//db connection
const mongoose = require('mongoose')
const connectDB = require('./db/connect')

//routers

const postingRouter = require('./routes/Posting')

app.use(express.json())

app.use('/posts', postingRouter)

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()
