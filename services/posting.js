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
    const { userId } = req.user
    const allPosts = await Posting.find({ createdBy: userId })
    const postsWithUsernames = []
    let usernames = []
    for (post of allPosts) {
        const usernames = []
        for (applicant of post.applicants) {
            const user = await User.findById(applicant)
            usernames.push(user.username)
        }
        const updatedPost = {
            username: post.username,
            title: post.title,
            message: post.message,
            users: usernames,
            _id: post._id
        }
        postsWithUsernames.push(updatedPost)
    }

    if (!post) {
        throw new Error(`No posting with username`)
    }

    return postsWithUsernames
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
    const post = await Posting.findById(id)
    const creator = await User.findById(post.createdBy)

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

    post.applicants.push(user._id)

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
