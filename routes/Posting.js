const express = require('express')
const router = express.Router()
const { getAllPosting } = require('../controller/posting')

router.route('/').get(getAllPosting)

module.exports = router
