const express = require('express')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')

const { postRegister, postLogin } = require('../controllers/auth')

router.post('/register', postRegister)
router.post('/login', postLogin)
router.route('/validateToken').get(authenticateUser)

module.exports = router
