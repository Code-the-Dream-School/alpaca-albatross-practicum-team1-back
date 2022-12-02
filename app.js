require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const cors = require('cors')
const nodemailer = require('nodemailer')

app.use(express.json())
app.use(cors())

// routers
const authRouter = require('./routes/auth')
const postingRouter = require('./routes/Posting')
const { PROCESSING } = require('http-status-codes')
// routes
app.use('/auth', authRouter)
app.use('/post', postingRouter)

// TODO: move to env file & get proper dev/prod url(depending on environment)
mongoose
    .connect('mongodb://127.0.0.1:27017/volunteer', { useNewUrlParser: true })
    .then(console.log('connection successful'))
    .catch((error) => console.error(error))

//nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
})

const mailOptions = {
    from: process.env.MAIL_USER,
    to: 'perryl17@gmail.com',
    subject: 'A kind soul applied to your post',
    text: 'it works'
}
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        console.log('error occured', err)
    } else {
        console.log('email sent', data)
    }
})

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()
