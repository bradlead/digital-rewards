const express = require('express');
const RewardController = require('../controllers/rewards');

const router = express.Router();

router.get('/', RewardController.getRewards);

module.exports = router;
