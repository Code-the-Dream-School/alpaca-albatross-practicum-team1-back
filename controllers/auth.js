const { model } = require('mongoose')
const User = require('../models/user')

const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw 'Please provide username and password'
        //TODO add auth
    }
    res.status(200).json({ isLoggedIn: true })
}

module.exports = { login }
