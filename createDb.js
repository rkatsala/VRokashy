var mongoose = require('mongoose');
var async = require('async');

mongoose.connect('mongodb://localhost/vrokashy');

var conn = mongoose.connection;

conn.on('error', console.error);

conn.once('open', function() {
  conn.db.dropDatabase(function(err) {
    
    var User = require('./models/userMongo');
    var Post = require('./models/contentMongo').Post;
    
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
      
      var posts = [
        { body: "1-й пост", _creator: user._id },
        { body: "2-й пост", _creator: user._id },
        { body: "3-й пост", _creator: user._id },
      ];
      
      async.each(posts, function(postData, callback) {
        var post = new Post(postData);
        post.save(function(err, post) {
          if (err) return callback(err);
          console.log("Post of %s saved to database", user.name.full);
          // console.dir(post);
          callback();
        });
        user.posts.push(post);
      });

      user.save(function(err, user) {
        if (err) return callback(err);
        console.log("%s saved to database", user.name.full);
        // console.dir(user);
        callback();
      });
    }, function(err) {
      if (err) return console.error(err);
      mongoose.disconnect();
    });
    
  });
});

