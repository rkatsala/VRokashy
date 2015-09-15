var User = require('../models/userMongo');

exports.get = function (req, res, next) {
	res.status(200).send("Реєстрація")
};

exports.post = function(req, res, next) {
/*   var body = req.body;
  var userData = {
    name: {
      first: body.firstName,
      last: body.lastName
    },
    email: body.email,
    password: body.password
  };
 */ 
  var userData = req.body.userData;
  
  User.signUp(userData, function(err, user) {
    if (err) return next(err);
    
    req.session.user = user._id;
    res.send("Користувач " + user.name.full + " успішно зареєстрований");
  })
};
