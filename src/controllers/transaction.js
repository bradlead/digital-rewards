const request = require('request-promise');
const User = require('../models/user');
const Transaction = require('../models/transaction');

const gettransaction = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      request.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${process.env.ACCOUNT_ID}`, {
      // request.get(`https://api.monzo.com/transactions?account_id=${process.env.ACCOUNT_ID}`, {
      // returns transaction details owned by the currently authorised user
        headers: {
          Authorization: `Bearer ${user.access_token}`,
        },
      })
        .then((data) => {
          // console.log(data);
          const response = JSON.parse(data);
          const monzoTransactions = response.transactions.map(transaction => Transaction.updateOrCreate({ id: transaction.id }, {
            // need to add array loop to grab all transaction
            id: transaction.id,
            description: transaction.description,
            merchant: transaction.merchant,
            user_id: user.user_id,
          }));
          Promise.all(monzoTransactions).then((transactions) => {
            // console.log(transactions);
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
  gettransaction,
};
