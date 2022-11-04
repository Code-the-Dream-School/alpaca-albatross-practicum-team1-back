const { model } = require('mongoose')
const User = require('../models/user')

const login = async (req, res) => {
    const { userName, password } = req.body
    if (!userName || !password) {
        throw 'Please provide username and password'
        //TODO add auth
    }
    res.status(200).json({ isLoggedIn: true })
}

module.exports = { login }
