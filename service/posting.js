const Posting = require('../models/posting')

const getAllPosting = async (req, res) => {
    const postings = await Posting.find()
    res.status(200).send(message, username)
}

module.exports = { getAllPosting }
