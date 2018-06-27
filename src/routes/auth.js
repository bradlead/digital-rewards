const express = require('express');
const AuthController = require('../controllers/auth');

const router = express.Router();

router.post('/monzo', AuthController.monzo);

module.exports = router;
