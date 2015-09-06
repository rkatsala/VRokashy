var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost/vrokashy');

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
  db.db.dropDatabase(function(err) {
    
    var User = require('./models/userMongo');
    
    var users = [
      {
        name: {full: "Роман Кацала"}, 
        email: "rkatsala@gmail.com", 
        password: "qwerty1234"
      },
      {
        name: {full: "Вася Пупкін"},
        email: "user@user.org",
        password: "123"
      },
      {
        name: {full: "Ваня Доу"},
        email: "john@doe.com",
        password: "qqq111"
      }
    ];
    
    async.each(users, function(userData, callback) {
      var user = new User(userData);
      user.save(function(err, user) {
        if (err) return callback(err);
        console.log("%s saved to database", user.name.full);
        callback();
      });
    }, function(err) {
      if (err) return console.error(err);
      mongoose.disconnect();
    });
    
  });
});

