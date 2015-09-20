var express = require('express');
var logoutRouter = express.Router();

logoutRouter.post('/', function(req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = logoutRouter;