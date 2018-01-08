var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var dogs = require('./routes/pet_route')(app);

var server = app.listen(5000, function () {
    console.log('Pet Server is running at 127.0.0.1:5000');
});