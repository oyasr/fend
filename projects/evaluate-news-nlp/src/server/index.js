// Imports the environment variables file
const dotenv = require('dotenv')
dotenv.config();

// Imports the required dependencies
var path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')

// Creates the express app instance
const app = express()

// Encables Cross Origin Resource Sharing
const cors = require('cors');

// Express app configuration
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.use(express.static('dist'))

// Meaning-Cloud configuration
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1?'
const apiKey = process.env.API_KEY
console.log(`Your API Key is ${process.env.API_KEY}`);
let userInput = []

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

app.post('/api', async function(req, res) {
    // Gets the user input through the HTTP POST request body
    userInput = req.body.url;
    console.log(`You entered: ${userInput}`);

    // Sets up the API URL
    const apiURL = `${baseURL}key=${apiKey}&url=${userInput}&lang=en`

    // Get the response
    const response = await fetch(apiURL)
    const mcData = await response.json()
    console.log(mcData)
    res.send(mcData)
})

// Designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
