var express = require('express');
var router = express.Router();
var User = require('../models/userMongo').User;

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'ВРокаши' });
  res.sendFile('index.html', {root: './'})
});

// test routes
router.get('/ip', function(req, res, next){
  res.status(200).send(req.ip);
});

router.all('/method', function(req, res, next){
  res.status(200).send(req.method);
});

router.get('/views', function(req, res, next) {
  res.send("Число переглядів: " + req.session.views);
});

// authorization routes
router.use('/signUp', require('./signUpRouter'));

router.use('/login', require('./loginRouter'));

router.use('/logout', require('./logoutRouter'));

// user routes
router.use('/users', require('./userRouter'));

module.exports = router;
