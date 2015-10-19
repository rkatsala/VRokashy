var User = require('../models/userMongo').User;
var HttpError = require('./errorHandlers').HttpError;

exports.get = function (req, res, next) {
	res.status(200).send("Реєстрація")
};

exports.post = function(req, res, next) {
  var userData = req.body;
  if (userData.admin) return next(new HttpError(403, "Недопустима операція"));
  
  User.signUp(userData, function(err, user) {
    if (err) return next(err);
    
    req.session.user = user._id;
    console.log("Користувач " + user.name.full + " успішно зареєстрований");
    res.status(200).send(user);
  })
};
