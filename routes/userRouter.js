var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');
// var postRouter = require('./postRouter');

userRouter.get('/', userHandlers.showUsers);

userRouter.route('/:id')
  .get(userHandlers.showProfile);
  
userRouter.get('/:id/posts', userHandlers.showAllPosts);

userRouter.use('/:id/posts/:postid', userHandlers.showPost);

module.exports = userRouter;