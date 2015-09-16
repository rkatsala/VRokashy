var User = require('../models/userMongo').User;
var Post = require('../models/contentMongo').Post;
var async = require('async');
var HttpError = require('./errorHandlers').HttpError;

exports.getAllUsers = function(req, res, next) {
  User.find()
    .select('name email posts')
    .exec(function(err, users) {
      if (err) return next(err);
      res.status(200).send(users);
    });
};

exports.getUser = function(req, res, next) {
  User.findById(req.params.user_id)
    .select('name email posts')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.status(200).send(user);
    });
}

exports.getAllPosts = function(req, res, next) {
  User.findById(req.params.user_id)
    .populate('posts', 'body date')
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.status(200).send(user.posts);
    });
}

exports.postPost = function(req, res, next) {
  var body = req.body.body;
  var creator = req.params.user_id; // req.session.user;
  
  async.waterfall([
    // Verify user existence
    function(callback) {
      User.findById(creator, function(err, user) {
        if (err) return next(err);
        
        if (!user) {
          callback(new HttpError(404, "Користувач з таким id не зареєстрований"));
        } else {
          callback(null, user);
        }
      });
    },
    // Create post
    function(user, callback) {
      Post.create({ body: body, _creator: user._id}, function(err, post) {
        if (err) return next(err);
        
        user.posts.push(post);
        user.save(callback);
      });
    }
  ], function(err, user) {
    if (err) return next(err);
    
    res.send("Пост для користувача " + user.name.full + " додано");
  });
}

exports.getPost = function(req, res, next) {
  Post.findById(req.params.post_id)
    .where('_creator').equals(req.params.user_id)
    .select('body date')
    .exec(function(err, post) {
      if (err) return next(err);
      if (!post) return next();
      res.status(200).send(post);
    });
}

