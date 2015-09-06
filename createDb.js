var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/vrokashy');

var db = mongoose.connection;

db.on('error', console.error);

db.once('open', function() {
  db.db.dropDatabase(function(err) {
    
    var User = require('./models/userMongo');
    
    var user = new User({
      name: {
        full: "Вася Пупкін"
      },
      email: "user@user.org",
      password: "123"
    });
    
    user.save(function(err, user) {
      if (err) return console.error(err);
      console.dir(user.name.full);
      
      User.find(function(err, users) {
        if (err) return console.error(err);
        console.dir(users);
        
        mongoose.disconnect();
      });
    });
  });
});

