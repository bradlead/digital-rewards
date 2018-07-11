const express = require('express');
const AccountController = require('../controllers/account');

const router = express.Router();

router.get('/', AccountController.getAccount);

module.exports = router;
