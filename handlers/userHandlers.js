var User = require('../models/userMongo');

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
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user.posts);
  });
}

exports.showPost = function(req, res, next) {
  User.findById(req.params.id, function(err, user) {
    if (err) return next(err);
    if (!user) return next();
    res.status(200).send(user.posts.id(req.params.postid));
  });
}
