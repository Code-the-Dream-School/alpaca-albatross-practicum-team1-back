const { StatusCodes } = require('http-status-codes')
const Posting = require('../models/posting')
const User = require('../models/user')
const { transporter } = require('./email')
const authenticateUser = require('../middleware/authentication')

const getAllPosts = async (req, res) => {
    const posts = await Posting.find()
    return posts
}

const createPost = async (req, res) => {
    await authenticateUser(req, res)
    const { message, title, username } = req.body
    const { userId } = req.user
    const user = await User.findById(userId)
    console.log('logging user', user)
    const post = {
        username,
        message,
        status: 'current',
        createdBy: user._id,
        title
    }
    const createdPost = await Posting.create(post)
    return createdPost
}

const getPosts = async (req, res) => {
    await authenticateUser(req, res)
    const { username } = req.body
    const post = await Posting.find({ username })
    if (!post) {
        throw new Error(`No posting with username`)
    }
    return post
}
const updatesPost = async (req, res) => {
    await authenticateUser(req, res)
    const { message, status, title, id } = req.body
    const post = await Posting.findByIdAndUpdate(
        id,
        { message, status, title },
        {
            new: true,
            runValidators: true
        }
    )
    if (!post) {
        throw new Error(`No post found`)
    }
    return post
}
const applicantsPost = async (req, res) => {
    await authenticateUser(req, res)
    const { id } = req.body
    const { userId } = req.user
    const user = await User.findById(userId)
    console.log(user)
    const post = await Posting.findById(id)
    const creator = await User.findById(post.createdBy)
    console.log(post)

    const mailOptions = {
        from: process.env.MAIL_USER,
        to: creator.email,
        subject: 'A VolunteerBoard member is here to help!',
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('error occurred', err)
        } else {
            console.log('email sent', data)
        }
    })

    if (!post) {
        throw new Error('No post found')
    }

    post.applicants.push(user[0]._id)

    post.save()

    return post
}

module.exports = {
    getAllPosts,
    createPost,
    getPosts,
    updatesPost,
    applicantsPost
}
