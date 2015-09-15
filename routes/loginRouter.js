var express = require('express');
var loginRouter = express.Router();
var User = require('../models/userMongo');
var loginHandler = require('../handlers/loginHandler');

loginRouter.route('/')
  .get(loginHandler.get)
  .post(loginHandler.post);
  
module.exports = loginRouter;