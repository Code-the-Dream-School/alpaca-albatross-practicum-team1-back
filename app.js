const express = require('express')
const app = express()
const port = 3000
const User = require('./models/user')
const posting = require('./models/posting')

//db connection
const mongoose = require('mongoose')
const connectDB = require('./db/connect')
const url = 'mongodb://127.0.0.1:27017/volunteer'
mongoose.connect(url).then(console.log('`MongoDB Connected: ${url}'))

//routers
const authRouter = require('./routes/Auth')
const postingRouter = require('./routes/Posting')

app.use(express.json())

//routes
app.use('/auth', authRouter)
app.use('/posts', postingRouter)

//tests
app.post('/testAddNewUser', (req, res) => {
    var newUser = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
    })
    // const userStore = User.findByIdAndRemove()
    newUser.save(newUser)
    res.status(200).json({ success: true })
})

app.post('/testAddPost', async (req, res) => {
    const user = await User.find()
    const posts = new posting({
        username: req.body.username,
        message: req.body.message,
        status: 'current',
        createdBy: user[0]._id,
    })
    // const userStore = User.findByIdAndRemove()
    posts.save()
    res.status(200).json({ success: true })
})

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}
start()
