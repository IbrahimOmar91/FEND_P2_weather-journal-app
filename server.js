// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
/* Spin up the server*/
const server = app.listen(port, listening);
function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};

// Post 
app.post('/weather', (req, res) => {
    const {
        date,
        temperature,
        feelings
    } = req.body
    projectData.date = date;
    projectData.temperature = temperature;
    projectData.feelings = feelings;
    console.log('data received from client:')
    console.log(req.body)
    res.send({
        success: true
    })
})

// get routes / endpoints
app.get('/weather', (req, res) => {
    res.send(projectData);
})