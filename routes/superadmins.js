var express = require('express');
var router = express.Router();

var superAdminHandlers = require('../handlers/superadmin');
 
 
router.get('/', superAdminHandlers.showSuperAdmins);


module.exports = router;