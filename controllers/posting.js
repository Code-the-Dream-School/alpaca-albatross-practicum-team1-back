const Posting = require('../models/posting')
const mongoose = require('mongoose')
const postingService = require('../services/posting')

async function get(req, res, next) {
    try {
        const posts = await postingService.getAllPosts(req)
        res.json({ posts: posts })
    } catch (error) {
        console.error(`Error while getting posts`, error.message)
        next(error)
    }
}

async function create(req, res, next) {
    try {
        const post = await postingService.createPost(req)
        res.json({ id: post._id.toString() })
    } catch (error) {
        console.error('Error while creating post', error.message)
        next(error)
    }
}

const getPost = async (req, res, next) => {
    try {
        const post = await postingService.getPosts(req)
        res.json({ post: post })
    } catch (error) {
        console.error(`Error while getting posting`, error.message)
        next(error)
    }
}

module.exports = { get, create, getPost }
