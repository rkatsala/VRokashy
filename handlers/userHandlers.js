var User = require('../models/userMongo').User;
var Post = require('../models/contentMongo').Post;
var async = require('async');
var HttpError = require('./errorHandlers').HttpError;

exports.getAllUsers = function(req, res, next) {
  User.find()
    .select('-hashedPassword -salt -__v')
    .lean()
    .exec(function(err, users) {
      if (err) return next(err);
      res.status(200).send(users);
    });
};

exports.checkUser = function(req, res, next) {
  if (req.session.admin) return next();
  
  if (req.session.user) {
    if (req.session.user === req.params.user_id) {
      return next();
    } else {
      return next(new HttpError(403, "Нема прав доступу"))
    }
  } else {
    return next(new HttpError(401, "Ви не авторизовані"));
  }
}

exports.getUser = function(req, res, next) {
  var user_id = req.params.user_id;
  
  User.findById(user_id)
    .select('-hashedPassword -salt -__v')
    .populate('posts', 'body date')
    .lean()
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.status(200).send(user);
    });
}

exports.putUser = function(req, res, next) {
  var user_id = req.params.user_id;
  var body = req.body;
  
  if (!Object.keys(body).toString()) {
    return next(new HttpError(400, "Нема даних для оновлення"));
  }
  
  if (body.name) {
    if ( !(body.name.first && body.name.last) ) {
      return next(new HttpError(400, "Дані імені не коректні"));
    }
  }
 
  if (body.hashedPassword || body.salt || body.admin) {
    return next(new HttpError(403, "Недопустима операція"));
  };
  
  User.findByIdAndUpdate(user_id, body, function(err, user) {
    if (err) return next(err);
    if (!user) return next(new HttpError(404, "Користувач з таким id не зареєстрований"));
    
    console.log("Дані користувача " + user.name.full + " успішно оновлені");
    res.status(200).send(user);
  });
}

exports.deleteUser = function(req, res, next) {
  var user_id = req.params.user_id;
  
  async.waterfall([
    function(callback) {
      User.findByIdAndRemove(user_id, callback);
    },
    function(user, callback) {
      if (!user) return callback(new HttpError(404, "Користувач з таким id не зареєстрований"));
      
      callback(null, user);
    },
    function(user, callback) {
      Post.remove({_creator: user}, callback);
    }
  ], function(err) {
    if (err) return next(err);
    if (req.session.user === user_id) req.session.destroy();
    
    console.log("Користувача видалено");
    res.status(200).send({});
  });
}

exports.getAllPosts = function(req, res, next) {
  var user_id = req.params.user_id;
  
  User
    .findById(user_id)
    .populate('posts', 'body date')
    .lean()
    .exec(function(err, user) {
      if (err) return next(err);
      if (!user) return next();
      res.status(200).send(user.posts);
    });
}

exports.postPost = function(req, res, next) {
  var body = req.body.body;
  var creator = req.params.user_id;
 
  async.waterfall([
    // Verify user existence
    function(callback) {
      User.findById(creator, callback);
    },
    function(user, callback) {
      if (!user) {
        callback(new HttpError(404, "Користувач з таким id не зареєстрований"));
      } else {
        callback(null, user);
      }
    },
    // Create post
    function(user, callback) {
      Post.create({ body: body, _creator: user._id}, function(err, post) {
        if (err) return callback(err);
        
        user.posts.push(post);
        user.save(callback);
      });
    }
  ], function(err, user) {
    if (err) return next(err);
    
    res.send(user);
  });
}

exports.getPost = function(req, res, next) {
  var user_id = req.params.user_id;
  var post_id = req.params.post_id;
  
  Post.findById(post_id)
    .where('_creator').equals(user_id)
    .select('body date')
    .lean()
    .exec(function(err, post) {
      if (err) return next(err);
      if (!post) return next(new HttpError(404, "Пост не знайдено"));
      
      res.status(200).send(post);
    });
}

exports.putPost = function(req, res, next) {
  var user_id = req.params.user_id;
  var post_id = req.params.post_id;
  var body = req.body.body;
  
  Post.findByIdAndUpdate(post_id, {body: body})
    .where('_creator').equals(user_id)
    .exec(function(err, post) {
      if (err) return next(err);
      if (!post) return next(new HttpError(404, "Пост не знайдено"));
      
      console.log("Пост оновлено");
      res.status(200).send(post);
    });
}

exports.deletePost = function(req, res, next) {
  var user_id = req.params.user_id;
  var post_id = req.params.post_id;

  Post.findOneAndRemove({ _id: post_id, _creator: user_id }, function(err, post) {
    if (err) return next(err);
    if (!post) return next(new HttpError(404, "Пост не знайдено"));
    
    console.log("Пост видалено");
    res.status(200).send(post);
  });
}

