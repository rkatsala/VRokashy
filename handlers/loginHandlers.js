var User = require('../models/userMongo').User;

exports.get = function (req, res, next) {
	res.status(200).send("Вхід у мережу")
};

exports.post = function (req, res, next) {
	var email = req.body.email;
	var password = req.body.password;

	User.login(email, password, function (err, user) {
		if (err) return next(err);
    
    	if (user.admin) req.session.admin = user.admin;

		req.session.user = user._id;
		// res.send("Користувач " + user.name.full + " зайшов в мережу");
		console.log("Користувач " + user.name.full + " зайшов в мережу");
		res.status(200).send(user);
	});
};
