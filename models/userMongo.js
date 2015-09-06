var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/vrokashy');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: {
    first: String,
    last: String
  },
  email: {
    type: String,
    unique: true
  },
  password: String
});

userSchema.virtual('name.full')
  .get(function () {
    return this.name.first + ' ' + this.name.last;
  })
  .set(function (name) {
    var split = name.split(' ');
    this.name.first = split[0];
    this.name.last = split[1];
  });

module.exports = mongoose.model('User', userSchema);