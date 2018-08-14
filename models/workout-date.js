var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workoutDate = new Schema({
    date : String,
    day : String
})

module.exports = mongoose.model('Workout-date', workoutDate);