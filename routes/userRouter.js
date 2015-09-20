var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');
var HttpError = require('../handlers/errorHandlers').HttpError;

userRouter.get('/', userHandlers.getAllUsers);

userRouter
  .route('/:user_id')
  .get(userHandlers.getUser)
  .put(userHandlers.checkUser, userHandlers.putUser)
  .delete(userHandlers.checkUser, userHandlers.deleteUser);

userRouter
  .route('/:user_id/posts')
  .get(userHandlers.getAllPosts)
  .post(userHandlers.checkUser, userHandlers.postPost);

userRouter
  .route('/:user_id/posts/:post_id')
  .get(userHandlers.getPost)
  .put(userHandlers.checkUser, userHandlers.putPost)
  .delete(userHandlers.checkUser, userHandlers.deletePost);

module.exports = userRouter;
