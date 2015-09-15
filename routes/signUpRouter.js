var express = require('express');
var signUpRouter = express.Router();
var User = require('../models/userMongo').User;
var signUpHandlers = require('../handlers/signUpHandlers');

signUpRouter.route('/')
  .get(signUpHandlers.get)
  .post(signUpHandlers.post);
  
module.exports = signUpRouter;