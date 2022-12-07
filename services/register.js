const User = require('../models/user')

const register = async (req) => {
    const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    const token = user.createJWT()
    return token
}

module.exports = { register }
