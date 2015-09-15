var User = require('../models/userMongo').User;
var Post = require('../models/contentMongo').Post;

exports.getAllUsers = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.status(200).send(users);
  });
};

exports.getUser = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user);
  });
}

exports.getAllPosts = function(req, res, next) {
  User.findById(req.params.id)
  .populate('posts', 'body date')
  .exec(function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user.posts);
  });
}

exports.getPost = function(req, res, next) {
  Post.findById(req.params.postid)
  .where('_creator').equals(req.params.id)
  .select('body date')
  .exec(function(err, post) {
    if (err) return next(err);
    if (!post) return next();
    res.status(200).send(post);
  });
}

