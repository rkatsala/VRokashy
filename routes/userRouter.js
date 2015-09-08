var express = require('express');
var userRouter = express.Router();

var userHandlers = require('../handlers/userHandlers');

userRouter.get('/', userHandlers.showUsers);

userRouter.route('/:id')
  .get(userHandlers.showProfile);

module.exports = userRouter;