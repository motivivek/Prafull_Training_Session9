var mongoose = require('mongoose')

var mongoSchema = mongoose.Schema
var test = new mongoSchema ({
    "x":String,
    "id":Number,
    
    
});
module.exports = mongoose.model('test',test)