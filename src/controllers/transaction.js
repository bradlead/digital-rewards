const request = require('request-promise');
const User = require('../models/user');
const Transaction = require('../models/transaction');
// const groupMerchant = require('../helper/groupMerchant');

const getTransaction = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      const accountID = user.account.id;
      request.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountID}`, {
        headers: { Authorization: `Bearer ${user.access_token}` },
        // returns transaction details owned by the currently authorised user
      })
        .then((data) => {
          const response = JSON.parse(data);
          /* eslint-disable-next-line max-len */
          const monzoTransactions = response.transactions.map(transaction => Transaction.updateOrCreate({ id: transaction.id }, {
            id: transaction.id,
            description: transaction.description,
            merchant: transaction.merchant,
            user_id: user.user_id,
          }));
          // response.transactions.merchant.map(transaction => groupMerchant(transaction.id));
          Promise.all(monzoTransactions).then((transactions) => {
            res.json(transactions);
          });
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
