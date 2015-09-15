var express = require('express');
var signUpRouter = express.Router();
var User = require('../models/userMongo');
var signUpHandler = require('../handlers/signUpHandler');

signUpRouter.route('/')
  .get(signUpHandler.get)
  .post(signUpHandler.post);
  
module.exports = signUpRouter;