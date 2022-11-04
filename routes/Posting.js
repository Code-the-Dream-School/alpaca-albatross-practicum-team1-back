const express = require('express')
const router = express.Router()
const { getAllPosting } = require('../controllers/posting')

router.route('/').get(getAllPosting)

module.exports = router
