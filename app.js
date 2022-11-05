require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

// routers
const authRouter = require('./routes/auth')
// routes
app.use('api/v1/auth', authRouter)

// TODO: move to env file & get proper dev/prod url(depending on environment)
mongoose
    .connect('mongodb://127.0.0.1:27017/volunteer', { useNewUrlParser: true })
    .then(console.log('connection successful'))
    .catch((error) => console.error(error))

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()
