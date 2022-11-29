const { StatusCodes } = require('http-status-codes')
const Posting = require('../models/posting')
const User = require('../models/user')

const getAllPosts = async (req, res) => {
    const postings = await Posting.find()
    return postings
}

const createPost = async (req) => {
    const { username, message, title } = req.body
    const user = await User.find({ username })
    const post = {
        username,
        message,
        status: 'current',
        createdBy: user[0]._id,
        title
    }
    const createdPost = await Posting.create(post)
    return createdPost
}

const getPosts = async (req, res) => {
    const { username } = req.body
    const post = await Posting.find({ username })
    if (!post) {
        throw new Error(`No posting with username`)
    }
    return post
}
const updatesPost = async (req, res) => {
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

module.exports = {
    getAllPosts,
    createPost,
    getPosts,
    updatesPost
}
