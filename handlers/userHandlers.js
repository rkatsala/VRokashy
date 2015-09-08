var User = require('../models/userMongo');

exports.showUsers = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return next(err);
    res.status(200).send(users);
  });
};

exports.showProfile = function(req, res, next) {
  User.findOne({_id: req.params.id}, function(err, user) {
    if (err) return next(err);
    // if (!user) next();
    res.status(200).send(user);
  });
}