var mongoose = require('mongoose');

var dogSchema = mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    type: {type: String}
});

module.exports = mongoose.model('Dog', dogSchema);