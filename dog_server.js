var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://dragneelfps:pass1234@ds247587.mlab.com:47587/dogs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var dogs = require('./routes/dog_route')(app);

var server = app.listen(4000, function () {
    console.log('Dog Server is running at 127.0.0.1:4000');
});