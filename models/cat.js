var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
    name: {type: String},
    age: {type: Number},
    type: {type: String}
});

module.exports = mongoose.model('Cat', catSchema);