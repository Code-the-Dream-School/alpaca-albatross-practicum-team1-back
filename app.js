require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const cors = require('cors')

app.use(express.json())
app.use(cors())

process.on('uncaughtException', function (error) {
    console.log(error.stack)
})

const authenticateUser = require('./middleware/authentication')

// routers
const authRouter = require('./routes/auth')
const postingRouter = require('./routes/Posting')
const authPostingRouter = require('./routes/authPosting')
// routes
app.use('/auth', authRouter)
app.use('/post', postingRouter)
app.use('/post', authenticateUser, authPostingRouter)

// TODO: move to env file & get proper dev/prod url(depending on environment)
mongoose
    .connect(process.env.DB_URL, { useNewUrlParser: true })
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
