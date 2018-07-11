const request = require('request-promise');
const User = require('../models/user');

const getAccount = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      request.get('https://api.monzo.com/accounts', {
        headers: { Authorization: `Bearer ${user.access_token}` },
        // returns account details owned by the currently authorised user
      })
        // .then((data) => {
        //   const response = JSON.parse(data);
        //   return User.updateOrCreate({ user_id: user.user_id }, {
        //     account: {
        //       id: response.accounts[0].id,
        //       description: response.accounts[0].description,
        //       created: response.accounts[0].created,
        //     },
        //     account_id: response.accounts[0].id,
        //   });
        // })
        // .then((passData) => {
        //   res.json(passData);
        // });
        .then((data) => {
          const response = JSON.parse(data);
          /* eslint-disable-next-line max-len */
          const monzoAccounts = response.accounts.map(account => User.updateOrCreate({ user_id: user.user_id }, {
            account: {
              id: account.id,
              description: account.description,
              created: account.created,
            },
            account_id: account.id,
          }));
          Promise.all(monzoAccounts).then((accounts) => {
            res.json(accounts);
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
  getAccount,
};
