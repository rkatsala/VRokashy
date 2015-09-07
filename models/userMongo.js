var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = require('./contentMongo').postSchema;

var userSchema = new Schema({
		name : {
			first : String,
			last : String
		},
		email : {
			type : String,
			unique : true
		},
		password : String,
    posts: [postSchema]
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

var User = mongoose.model('User', userSchema);

module.exports = User;
