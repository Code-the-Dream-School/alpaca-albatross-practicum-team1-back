const express = require('express')
const router = express.Router()
const { get } = require('../controllers/posting')

router.route('/getPosts').get(get)

module.exports = router
