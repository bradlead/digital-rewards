const request = require('request-promise');
const User = require('../models/user');
const Transaction = require('../models/transaction');

const transaction = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      request.get(`https://api.monzo.com/transactions?account_id=${process.env.ACCOUNT_ID}`, {
      // returns transaction details owned by the currently authorised user
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
        .then((data) => {
          const response = JSON.parse(data);
          return Transaction.updateOrCreate({ id: response.transactions[0].id }, {
            // need to add array to grab all transaction
            id: response.transactions[0].id,
            description: response.transactions[0].description,
            // user_id: response.users[0].user_id,
          });
        })
        .then(() => {
          res.sendStatus(200);
        });
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error.message);
      res.sendStatus(400);
    });
};

module.exports = {
  transaction,
};
