var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Post = require('./contentMongo').Post;
var crypto = require('crypto');

var userSchema = new Schema({
		name: {
			first: { type: String, required: true },
			last: { type: String, required: true }
		},
		email: {
			type: String,
			unique: true,
      required: true
		},
		hashedPassword: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    created: {
      type: Date,
      default: Date.now
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post'}]
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
  
userSchema.virtual('password')
  .set(function(password) {
    this.salt = Math.random() + '';
    this.hashedPassword = this.encryptPassword(password);
  });
  
userSchema.methods.encryptPassword = function(password) {
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

userSchema.methods.checkPassword = function(password) {
  return this.encryptPassword(password) === this.hashedPassword;
};

var User = mongoose.model('User', userSchema);

module.exports = User;
