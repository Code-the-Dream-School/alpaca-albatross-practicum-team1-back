const { StatusCodes } = require('http-status-codes')
const Posting = require('../models/posting')
const User = require('../models/user')

const getAllPosting = async (req, res) => {
    const postings = await Posting.find()
    return postings
}

const createPosting = async (req) => {
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

const getPosting = async (req, res) => {
    const {
        params: { id: username }
    } = req

    const posting = await Posting.findOne({ _id: username })
    if (!posting) {
        throw new Error(`No posting with username`)
    }
    res.status(StatusCodes.OK).json({ posting })
}

module.exports = {
    getAllPosting,
    createPosting,
    getPosting
}
