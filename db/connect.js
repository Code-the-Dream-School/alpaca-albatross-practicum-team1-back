const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/volunteer'

mongoose.connect(url).then(console.log('`MongoDB Connected: ${url}'))
