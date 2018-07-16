const express = require('express');
const RewardController = require('../controllers/rewards');

const router = express.Router();

router.get('/', RewardController.findAllRewards);
router.get('/', RewardController.getRewardbyMerchant);

module.exports = router;
