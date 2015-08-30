var express = require('express');
var router = express.Router();

//var User = require('../models/user');

var userHandlers = require('../handlers/user');
 
 
router.get('/', userHandlers.showUsers);

router.get('/ids', userHandlers.showUsersById);

router.get('/:id', userHandlers.showProfile);

router.get('/:id/content', userHandlers.showContent);

router.get('/:id/content/:type', userHandlers.showContentType);

module.exports = router;
