var User = require('../models/userMongo');
var Post = require('../models/contentMongo').Post;

exports.showUsers = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.status(200).send(users);
  });
};

exports.showProfile = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user);
  });
}

exports.showAllPosts = function(req, res, next) {
  User.findById(req.params.id)
  .populate('posts')
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user.posts);
  });
}

exports.showPost = function(req, res, next) {
  Post.findById(req.params.postid)
  .populate('_creator', 'name')
  .exec(function(err, post) {
    if (err) return next(err);
    if (!post) return next();
    res.status(200).send(post);
  });
}

