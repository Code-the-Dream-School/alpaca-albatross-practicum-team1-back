const { StatusCodes } = require('http-status-codes')
const Posting = require('../models/posting')

const getAllPosting = async (req, res) => {
    const postings = await Posting.find()
    return postings
    //res.status(200).json({ postings })
}

const createPosting = async (req, res) => {
    req.body.createdBy = req.user.userId
    const post = await Posting.create(req.body)
    res.status(StatusCodes.CREATED).json({ post })
}

module.exports = {
    getAllPosting,
    createPosting
}
