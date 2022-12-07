const { register } = require('../services/register')
const { StatusCodes } = require('http-status-codes')
const { login } = require('../services/login')
const authenticateUser = require('../middleware/authentication')
const User = require('../models/user')

async function postRegister(req, res, next) {
    try {
        const token = await register(req)
        res.status(StatusCodes.OK).json({
            token
        })
    } catch (error) {
        next(error)
    }
}

async function postLogin(req, res, next) {
    try {
        const user = await login(req)
        res.status(StatusCodes.OK).json({
            user
        })
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: error.message
        })
    }
}

async function validateToken(req, res, next) {
    try {
        authenticateUser(req, res)
        const user = await User.findById(req.user.userId)
        res.status(StatusCodes.OK).json({
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        res.status(StatusCodes.UNAUTHORIZED).json({
            error: error.message
        })
        next(error)
    }
}

module.exports = { postRegister, postLogin, validateToken }
