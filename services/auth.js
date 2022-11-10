const User = require('../models/user')
const { StatusCodes } = require('http-status-codes')

const register = async (req, res) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({
        token
    })
}

module.exports = {
    register
}
