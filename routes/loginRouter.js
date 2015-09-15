var express = require('express');
var loginRouter = express.Router();
var User = require('../models/userMongo').User;
var loginHandlers = require('../handlers/loginHandlers');

loginRouter.route('/')
  .get(loginHandlers.get)
  .post(loginHandlers.post);
  
module.exports = loginRouter;