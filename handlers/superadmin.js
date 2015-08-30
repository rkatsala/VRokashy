var User = require('../models/user');

exports.showSuperAdmins = function(req, res, next) {
  var users = "";
  for (var id in User.db) {
    if (User.db[id]._isAdmin) {
      users += "<p>" + User.db[id]._fullName + "</p>";
    }
  }
  
  res.status(200)
    .render("users", {title: "Адміністратори", body: users});
};