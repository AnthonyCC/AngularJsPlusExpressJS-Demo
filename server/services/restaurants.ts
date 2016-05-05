import mongoose = require('mongoose');
debugger;
mongoose.connect('mongodb://localhost/test');

let Schema = mongoose.Schema;

let restaurants = mongoose.model('restaurant', new Schema({
    borough     : String,
    cuisine      : String
}),'restaurants');


let users = mongoose.model('testuser', new Schema({
    name     : String,
}),'testUsers');
export= { restaurants:restaurants , users: users};