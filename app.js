const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

const url = 'mongodb://127.0.0.1:27017/volunteer'
mongoose.connect(url).then(console.log('`MongoDB Connected: ${url}'))
//routers
const authRouter = require('./routes/Auth')
const postingRouter = require('./routes/Posting')

// TODO: move to env file & get proper dev/prod url(depending on environment)

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
