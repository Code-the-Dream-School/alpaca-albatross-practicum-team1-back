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

async function create(req, res, next) {
    try {
        const posting = await postingService.createPosting(req)
        res.send('Posting created')
    } catch (error) {
        console.error('Error while creating post', error.message)
        next(error)
    }
}
module.exports = { get, create }
