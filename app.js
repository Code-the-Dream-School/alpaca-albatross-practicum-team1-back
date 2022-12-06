require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const cors = require('cors')

app.use(express.json())
app.use(cors())

const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const postingRouter = require('./routes/Posting')


// routes
app.use('/auth', authRouter)
app.use('/post', postingRouter)
app.use('/post', authenticateUser, authPostingRouter)

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
