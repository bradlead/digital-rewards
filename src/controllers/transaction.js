const request = require('request-promise');
const User = require('../models/user');

const { groupMerchant } = require('../helper/groupMerchant');
// const { getRewardbyMerchant } = require('../controllers/rewards');

const getTransaction = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      const accountID = user.account.id;
      request.get(`https://api.monzo.com/transactions?account_id=${accountID}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
        // returns transaction details owned by the currently authorised user
      })
        .then((data) => {
          const response = JSON.parse(data);
          // group the merchants and assign to `reduceReward`
          const reduceReward = groupMerchant(response.transactions.map(transaction => transaction.merchant));
          // convert from object to array
          const arrayMerchant = Object.keys(reduceReward).map(key => [String(key), reduceReward[key]]);

          // filter list with `getRewardbyMerchant` function
          // getRewardbyMerchant(req, res, result);

          // currently passing unfiltered grouped merchants to frontend
          res.status(201).json(arrayMerchant);
        });
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error.message);
      res.sendStatus(400);
    });
};

module.exports = {
  getTransaction,
};
