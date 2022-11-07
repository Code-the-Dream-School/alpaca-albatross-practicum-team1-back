const Posting = require('../models/posting')
const mongoose = require('mongoose')
const postingService = require('../service/posting')

async function get(req, res, next) {
    try {
        const posts = await postingService.getAllPosting(req)
        res.json({ posts: posts })
    } catch (error) {
        console.error(`Error while getting posts`, error.message)
        next(error)
    }
}
module.exports = { get }
