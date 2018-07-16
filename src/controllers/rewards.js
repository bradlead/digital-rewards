const Rewards = require('../models/reward');

const findAllRewards = (req, res) => {
  // return all rewards from db
  Rewards.find()
    .then((rewards) => {
      res.send(rewards);
    }).catch((err) => {
      /* eslint-disable-next-line no-console */
      console.log(err.message);
      res.sendStatus(400);
    });
};


const getRewardbyMerchant = (merchants) => {
  const merchantIds = merchants.map(merchant => merchant[0]);
  return Rewards.find({
    merchant_id: { $in: merchantIds },
  }).then((rewards) => {
    const activeRewards = rewards.map(
      reward => reward.toObject(),
    ).map((reward) => {
      // find merchant in merchants array where merchant[0] === reward.merchant_id
      const merchant = merchants.find(
        m => m[0] === reward.merchant_id,
      );
      // set count property on reward to merchant[1]
      reward.count = merchant[1]; // eslint-disable-line
      // return updated reward
      return reward;
    });
    return activeRewards;
  });
};


module.exports = {
  findAllRewards,
  getRewardbyMerchant,
};
