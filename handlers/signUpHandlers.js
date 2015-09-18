var User = require('../models/userMongo').User;

exports.get = function (req, res, next) {
	res.status(200).send("Реєстрація")
};

exports.post = function(req, res, next) {
  var userData = req.body;
  
  User.signUp(userData, function(err, user) {
    if (err) return next(err);
    
    req.session.user = user._id;
    res.send("Користувач " + user.name.full + " успішно зареєстрований");
  })
};
