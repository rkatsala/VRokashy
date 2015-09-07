var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    body : {
      type : String,
      required : true
    },
    date : {
      type : Date,
    default:
      Date.now
    }
});

exports.postSchema = postSchema;

// exports.Post = mongoose.model('Post', postSchema);
