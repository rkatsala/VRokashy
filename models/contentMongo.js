var mongoose = require('mongoose');
var User = require('./userMongo');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    _creator: { type: Schema.Types.ObjectId, ref: 'User' },
    body : {
      type : String,
      required : true
    },
    date : {
      type : Date,
      default: Date.now
    }
});

// exports.postSchema = postSchema;

exports.Post = mongoose.model('Post', postSchema);
