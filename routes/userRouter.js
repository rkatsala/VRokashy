var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');
var checkUser = userHandlers.checkUser;
var signUpHandlers = require('../handlers/signUpHandlers');
var HttpError = require('../handlers/errorHandlers').HttpError;

userRouter.route('/') 
  .get(userHandlers.getAllUsers)
  .post(signUpHandlers.post);

userRouter
  .route('/:user_id')
  .get(userHandlers.getUser)
  .put(checkUser, userHandlers.putUser)
  .delete(checkUser, userHandlers.deleteUser);

userRouter
  .route('/:user_id/posts')
  .get(userHandlers.getAllPosts)
  .post(checkUser, userHandlers.postPost);

userRouter
  .route('/:user_id/posts/:post_id')
  .get(userHandlers.getPost)
  .put(checkUser, userHandlers.putPost)
  .delete(checkUser, userHandlers.deletePost);

module.exports = userRouter;
