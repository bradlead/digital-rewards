const request = require('request-promise');
const User = require('../models/user');
const Account = require('../models/account');

const account = (req, res) => {
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      request.get('https://api.monzo.com/accounts', {
      // returns account details owned by the currently authorised user
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
        .then((data) => {
          const response = JSON.parse(data);
          return Account.updateOrCreate({ id: response.accounts[0].id }, {
            id: response.accounts[0].id,
            description: response.accounts[0].description,
            created: response.accounts[0].created,
            // user_id: user.user_id,
          });
        })
        .then((passData) => {
          // console.log(user);
          /* eslint-disable-next-line no-console */
          res.json(passData);
        });
    })
    .catch((error) => {
      /* eslint-disable-next-line no-console */
      console.log(error.message);
      res.sendStatus(400);
    });
};

module.exports = {
  account,
};
