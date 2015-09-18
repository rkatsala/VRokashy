var express = require('express');
var logoutRouter = express.Router();

logoutRouter.post('/', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
  // res.send(req.session);
});

module.exports = logoutRouter;