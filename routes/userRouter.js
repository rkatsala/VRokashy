var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');

userRouter.get('/', userHandlers.getAllUsers);

userRouter.route('/:user_id')
  .get(userHandlers.getUser)
  .put(userHandlers.putUser)
  .delete(userHandlers.deleteUser);

userRouter.route('/:user_id/posts')
  .get(userHandlers.getAllPosts)
  .post(userHandlers.postPost);

userRouter.route('/:user_id/posts/:post_id')
  .get(userHandlers.getPost)
  .put(userHandlers.putPost)
  .delete(userHandlers.deletePost);

module.exports = userRouter;
