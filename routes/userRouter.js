var express = require('express');
var userRouter = express.Router();
var userHandlers = require('../handlers/userHandlers');
// var postRouter = require('./postRouter');

userRouter.get('/', userHandlers.getAllUsers);

userRouter.route('/:id')
.get(userHandlers.getUser);

userRouter.get('/:id/posts', userHandlers.getAllPosts);

userRouter.get('/:id/posts/:postid', userHandlers.getPost);

module.exports = userRouter;
