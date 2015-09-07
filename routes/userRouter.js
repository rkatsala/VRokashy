var express = require('express');
var userRouter = express.Router();

var userHandlers = require('../handlers/userHandlers');

userRouter.get('/', userHandlers.showUsers);

module.exports = userRouter;