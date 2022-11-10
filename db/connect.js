const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/volunteer'

const connectDB = () => {
    return mongoose.connect(url).then(console.log('`MongoDB Connected: ${url}'))
}

module.exports = connectDB
