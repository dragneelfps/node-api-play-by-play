var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://dragneelfps:pass1234@ds245357.mlab.com:45357/cats')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cats = require('./routes/cat_route')(app);

var server = app.listen(3000, function () {
    console.log('Dog Server is running at 127.0.0.1:3000');
});