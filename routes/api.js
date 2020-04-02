const express = require('express');

const apiController = require('../controlers/api-controller');

const router = express.Router();

router.get('/getusers', apiController.getUsers);
router.get('/getstats', apiController.getStats);

module.exports = router;