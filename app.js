const express = require('express');
const app = express();

const PORT = 3000;

const mustacheExpress = require('mustache-express')
// setting the templating engine as mustache
app.engine('mustache',mustacheExpress())
// telling express that all the views (pages) will be inside
// views directory
app.set('views','./views')
// set the view engine to mustache
app.set('view engine','mustache')

const bodyParser = require('body-parser')

// this adds the ability to parse the body
app.use(bodyParser.urlencoded({ extended: false }))

// anything inside public folder can be accessed at the root level
app.use(express.static('css'))


let Trip = require('./trip')

let trips = [];

app.get('/', (req,res) => {
    res.render('index', {tripList: trips});
});

app.post('/addTrip', (req,res) => {

    let id = Date.now();
    let title = req.body.title;
    let imageUrl = req.body.imageUrl;
    let departureDate = req.body.departureDate;
    let returnDate = req.body.returnDate;

    let trip = new Trip(id, title, imageUrl, departureDate, returnDate);
    
    trips.push(trip)

    res.redirect("/");
});


app.post('/deleteTrip', (req,res) => {

    let id = req.body.id;

    let getObjIfExists = trips.find(function(trip){
        return trip.id === parseInt(id)
    });

    let indexOfObj = trips.indexOf(getObjIfExists)
    trips.splice(indexOfObj,1)

    res.redirect("/");
});


app.listen(PORT, () => {
    console.log("Server started");
});

