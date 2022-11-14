const express = require('express')
const router = express.Router()
const { get, create } = require('../controllers/posting')

router.route('/getPosts').get(get)
router.route('/createPost').post(create)

module.exports = router
