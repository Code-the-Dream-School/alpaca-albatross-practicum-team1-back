const { register } = require('../services/register')
const { StatusCodes } = require('http-status-codes')
const { login } = require('../services/login')

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

module.exports = { postRegister, postLogin }
