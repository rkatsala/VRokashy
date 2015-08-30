var express = require('express');
var router = express.Router();

var User = require('../models/user');
//var db = User.db;


/* GET users listing. */
router.get('/', function(req, res, next) {
  //console.log(db);
  res.send(User.db);
});

router.get('/:id', function(req, res, next) {
  var userId = req.params.id;
  res.send(User.db[userId]);
});


module.exports = router;
