var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: {type: String, require: true, index: true, unique: true},
  admin: {type: Boolean, default: false},
  courseID: String
});

module.exports = exports = mongoose.model('User', userSchema);