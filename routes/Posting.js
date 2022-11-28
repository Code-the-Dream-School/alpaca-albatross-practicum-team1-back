const express = require('express')
const router = express.Router()
const { get, create, getPost, updatePost } = require('../controllers/posting')

router.route('/getPosts').get(get)
router.route('/createPost').post(create)
router.route('/getPost').get(getPost)
router.route('/updatePost').patch(updatePost)

module.exports = router
