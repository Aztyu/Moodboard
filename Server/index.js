const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

const moodUser = {}
const moods = ['Relaxed', 'Sad', 'Angry', 'Crazy',  'Stressed', 'Tired', 'Girlboss', 'Ken', 'Goblin', 'Happy', 'Iconic', 'Rabbit', 'Worried', 'Thirsty', 'Cooking']

// 'Savage', 'Confused', 'Happy''Worried', 'Proud', 'Surprised', 'Hot mess', 'Loved', 'Nervous', 'Beautiful'
app.use(bodyParser.json())
app.use(cors())

// Setup CORS
var corsOptions = {
    origin: 'http://localhost:8000,http://corentinbeal.fr/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.options('*', cors(corsOptions))

// Get all the available moods
app.get('/mood', (_, res) => {
    res.json(moods)
})

// Manage the users Mood
app.post('/mood/user', (req, res) => {
    const body = req.body;
    if (!body || !body.mood || !body.user) {
        res.status(400).send('Missing parameters')
    }
    moodUser[body.user] = body.mood
    res.send()
})

app.get('/mood/user', (_, res) => {
    res.json(moodUser)
})

// Sert à distribuer les images
app.use(express.static('content'))

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
