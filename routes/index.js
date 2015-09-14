var express = require('express');
var router = express.Router();
var User = require('../models/userMongo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ВРокаши' });
});

router.get('/ip', function(req, res, next){
  res.status(200).send(req.ip);
});

router.get('/views', function(req, res, next) {
  res.send("Число переглядів: " + req.session.views);
});

router.route('/signUp')
  .get(function(req, res, next) {
    res.status(200).send("Реєстрація")
  })
  .post(function(req, res, next) {
    var body = req.body;
    var userData = {
      name: {
        first: body.firstName,
        last: body.lastName
      },
      email: body.email,
      password: body.password
    };
    
    User.signUp(userData, function(err, user) {
      if (err) return next(err);
      
      req.session.user = user._id;
      res.send("Користувач " + user.name.full + " успішно зареєстрований");
    })
  });

router.route('/login')
  .get(function(req, res, next) {
    res.status(200).send("Вхід у мережу")
  })
  .post(function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    
    User.login(email, password, function(err, user) {
      if (err) return next(err);
      
      req.session.user = user._id;
      res.send("Користувач " + user.name.full + " зайшов в мережу");
    })
  });

// user routes
router.use('/users', require('./userRouter'));

module.exports = router;
