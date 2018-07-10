const express = require('express');
const TransactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/', TransactionController.gettransaction);

module.exports = router;
