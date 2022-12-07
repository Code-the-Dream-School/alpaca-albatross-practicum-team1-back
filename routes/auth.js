const express = require('express')
const router = express.Router()

const {
    postRegister,
    postLogin,
    validateToken
} = require('../controllers/auth')

router.post('/register', postRegister)
router.post('/login', postLogin)
router.route('/validateToken').get(validateToken)

module.exports = router
