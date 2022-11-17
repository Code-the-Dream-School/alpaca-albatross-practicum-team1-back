require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const cors = require('cors')

app.use(express.json())
app.use(cors())

// routers
const authRouter = require('./routes/register')
const loginRouter = require('./routes/login')
const postingRouter = require('./routes/Posting')
// routes
app.use('/', loginRouter)
app.use('/auth', authRouter)
app.use('/post', postingRouter)

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
