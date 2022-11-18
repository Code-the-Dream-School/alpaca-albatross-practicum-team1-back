const express = require('express')
const router = express.Router()
const { get, create, getPost } = require('../controllers/posting')

router.route('/getPosts').get(get)
router.route('/createPost').post(create)
router.route('/getPost').get(getPost)

module.exports = router
