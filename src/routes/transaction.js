const express = require('express');
const TransactionController = require('../controllers/transaction');

const router = express.Router();

router.get('/', TransactionController.getTransaction);

module.exports = router;
