var User = require('../models/user');


exports.showUsers = function(req, res, next) {
  var users = "";
  for (var id in User.db) {
    users += "<p>" + User.db[id]._fullName + "</p>";
  }
  
  res.status(200)
    .render("users", {title: "Користувачі", body: users});
};
  
exports.showUsersById = function(req, res, next) {
  var users = "";
  for (var id in User.db) {
    users += "<p>" + id + ": " + User.db[id]._fullName + "</p>";
  }
  
  res.status(200).render("users", {title: "Користувачі по ID", body: users});
};

exports.showProfile = function(req, res, next) {
  var userId = req.params.id;
  var userProfile = User.db[userId].showProfile();
  var userProfileString = "";
  for (var key in userProfile) {
    userProfileString += "<p>" + key.slice(1) + ": " + userProfile[key] + "</p>";
  }
  
  res.status(200).render("users", {title: userProfile._fullName, body: userProfileString});
};

exports.showContent = function(req, res, next) {
  var userId = req.params.id;
  var userProfile = User.db[userId].showProfile();
  var content = userProfile._content;
  var contentString = "";
  for (var type in content) {
    contentString += "<h2>" + type + "</h2>";
    var somecontent = content[type];
    for (var i = somecontent.length - 1; i >= 0; i--) {
      contentString += "<h3>" + somecontent[i]._head + "     " + somecontent[i]._date.toLocaleString() + "</h3>" +  "<p>" + somecontent[i]._body + "</p>";
    }
  }
  
  res.status(200).render("users", {title: userProfile._fullName, body: contentString});
};

exports.showContentType = function(req, res, next) {
  var userId = req.params.id;
  var type = req.params.type;
  var userProfile = User.db[userId].showProfile();
  var somecontent = userProfile._content[type];
  var contentString = "<h2>" + type + "</h2>";;
  for (var i = somecontent.length - 1; i >= 0; i--) {
    contentString += "<h3>" + somecontent[i]._head + "     " + somecontent[i]._date.toLocaleString() + "</h3>" +  "<p>" + somecontent[i]._body + "</p>";
  }
  res.status(200).render("users", {title: userProfile._fullName, body: contentString});
}