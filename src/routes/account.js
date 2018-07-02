const express = require('express');
const AccountController = require('../controllers/account');

const router = express.Router();

router.route('/')
  .post(AccountController.account)

module.exports = router;