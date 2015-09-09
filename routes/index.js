var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ВРокаши' });
});

router.get('/ip', function(req, res, next){
  res.status(200).send(req.ip);
});

// user routes
router.use('/users', require('./userRouter'));

module.exports = router;
