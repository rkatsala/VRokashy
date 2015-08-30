var express = require('express');
var router = express.Router();

var userHandlers = require('../handlers/user');
 
 
router.get('/', userHandlers.showUsers);

router.get('/ids', userHandlers.showUsersById);

router.route('/:id')
  .get(userHandlers.showProfile)
  .post(userHandlers.postProfile)
  .put(userHandlers.putProfile)
  .delete(userHandlers.deleteProfile);

router.get('/:id/content', userHandlers.showContent);

router.get('/:id/content/:type', userHandlers.showContentType);

module.exports = router;
