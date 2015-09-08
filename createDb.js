var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost/vrokashy');

var conn = mongoose.connection;

conn.on('error', console.error);

conn.once('open', function() {
  conn.db.dropDatabase(function(err) {
    
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

      user.posts.push(
        {body: "1-й пост"}, 
        {body: "2-й пост"},
        {body: "3-й пост"}
      );
      
      user.save(function(err, user) {
        if (err) return callback(err);
        console.log("%s saved to database", user.name.full);
        console.dir(user);
        callback();
      });
    }, function(err) {
      if (err) return console.error(err);
      mongoose.disconnect();
    });
    
  });
});

