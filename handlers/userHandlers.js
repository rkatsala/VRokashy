var User = require('../models/userMongo');

exports.showUsers = function(req, res, next) {
  User.find(function(err, users) {
    if (err) return res.status(500).send(err);
    res.status(200).send(users);
  });
};