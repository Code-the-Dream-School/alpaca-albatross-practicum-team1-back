const { StatusCodes } = require('http-status-codes')
const Posting = require('../models/posting')

const getAllPosting = async (req, res) => {
    const postings = await Posting.find()
    return postings
    //res.status(200).json({ postings })
}

const createPosting = async (req) => {
    const { username, message } = req.body
    const user = await User.find({ username })
    const post = {
        username,
        message,
        status: 'current',
        createdBy: user[0]._id
    }
    return await Posting.create(post)
}

module.exports = {
    getAllPosting,
    createPosting
}
