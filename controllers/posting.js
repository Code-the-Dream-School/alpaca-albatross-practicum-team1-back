const Posting = require('../models/posting')
const User = require('../models/user')
const mongoose = require('mongoose')
const postingService = require('../services/posting')
const { StatusCodes } = require('http-status-codes')
const UnauthenticatedError = require('../errors/UnauthenticatedError')

async function get(req, res, next) {
    try {
        const posts = await postingService.getAllPosts(req)
        res.status(StatusCodes.OK).json({ posts: posts })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: error.message
        })
        next(error)
    }
}

async function create(req, res, next) {
    try {
        const post = await postingService.createPost(req)
        res.status(StatusCodes.OK).json({ id: post._id.toString() })
    } catch (error) {
        if (error.name == 'UnauthenticatedError') {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: error.message
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message
            })
        }
        next(error)
    }
}

const getPost = async (req, res, next) => {
    try {
        const post = await postingService.getPosts(req)
        res.status(StatusCodes.OK).json({ post: post })
    } catch (error) {
        if (error.name == 'UnauthenticatedError') {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: error.message
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message
            })
        }
        next(error)
    }
}
const updatePost = async (req, res) => {
    try {
        const post = await postingService.updatesPost(req)
        res.status(StatusCodes.OK).json({ post: post })
    } catch (error) {
        if (error.name == 'UnauthenticatedError') {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: error.message
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message
            })
        }
        next(error)
    }
}
const applicantPost = async (req, res) => {
    try {
        const post = await postingService.applicantsPost(req)
        res.status(StatusCodes.OK).json({ post: post })
    } catch (error) {
        if (error.name == 'UnauthenticatedError') {
            res.status(StatusCodes.UNAUTHORIZED).json({
                error: error.message
            })
        } else {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: error.message
            })
        }
        next(error)
    }
}

module.exports = {
    get,
    create,
    getPost,
    updatePost,
    applicantPost
}
