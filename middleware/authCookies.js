module.exports = function(req, res, next) {
	if (req.session.user) {
		var userId = req.session.user;
		res.cookie("userId", userId);

	} else {
		res.clearCookie("userId");
	}

	if (req.session.admin) {
		var isAdmin = req.session.admin;
		res.cookie("isAdmin", isAdmin);
	} else {
		res.clearCookie("isAdmin");
	}
	
	next();
};