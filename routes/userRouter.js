var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');
var HttpError = require('../handlers/errorHandlers').HttpError;

userRouter.get('/', userHandlers.getAllUsers);

userRouter.use('/:user_id', userHandlers.checkUser);

userRouter
  .route('/:user_id')
  .get(userHandlers.getUser)
  .put(userHandlers.putUser)
  .delete(userHandlers.deleteUser);

userRouter
  .route('/:user_id/posts')
  .get(userHandlers.getAllPosts)
  .post(userHandlers.postPost);

userRouter
  .route('/:user_id/posts/:post_id')
  .get(userHandlers.getPost)
  .put(userHandlers.putPost)
  .delete(userHandlers.deletePost);

module.exports = userRouter;
