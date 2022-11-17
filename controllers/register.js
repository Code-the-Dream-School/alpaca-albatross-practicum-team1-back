const { register } = require('../services/register')
const { StatusCodes } = require('http-status-codes')

async function post(req, res, next) {
    try {
        const token = register(req)
        res.status(StatusCodes.OK).json({
            token
        })
    } catch (error) {
        next(error)
    }
}
module.exports = { post }
