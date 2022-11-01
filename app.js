const express = require('express')
const app = express()
const port = 3000

// TODO: move to env file & get proper dev/prod url(depending on environment)
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://127.0.0.1:27017'

MongoClient.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err, client) => {
        if (err) {
            return console.log(err)
        }
        const db = client.db('volunteer')

        console.log(`MongoDB Connected: ${url}`)
    }
)

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Welcome to Volunteer Page!')
})
app.post('/posting', (req, res) => {
    res.status(200).json({ isSuccess: true })
})

app.listen(port, () => {
    console.log(`server is listening on port ${port}...`)
})
