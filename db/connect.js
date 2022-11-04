const mongoose = require('mongoose')

mongoose
    .connect('mongodb://localhost:27017/volunteer', { useNewUrlParser: true })
    .catch((error) => console.error(error))
