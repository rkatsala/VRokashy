var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');

userRouter.get('/', userHandlers.getAllUsers);

userRouter.route('/:user_id')
  .get(userHandlers.getUser);

userRouter.route('/:user_id/posts')
  .get(userHandlers.getAllPosts)
  .post(userHandlers.postPost);

userRouter.get('/:user_id/posts/:post_id', userHandlers.getPost);

module.exports = userRouter;
