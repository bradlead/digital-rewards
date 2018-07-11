const express = require('express');
const RewardController = require('../controllers/reward');

const router = express.Router();

router.get('/', RewardController.getRewards);

module.exports = router;
