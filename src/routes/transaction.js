const express = require('express');
const TransactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/', TransactionController.transaction);

module.exports = router;
