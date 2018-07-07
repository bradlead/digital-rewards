const request = require('request-promise');
const User = require('../models/user');
const Account = require('../models/account');

const account = (req, res) => {
  const accountDB = new Account({
    id: req.body.id,
    description: req.body.description,
    created: req.body.created,
    user_id: req.body.user_id,
  });
  // User.findOne({ user_id: req.authorizer.user_id })
  User.findOne({ user_id: process.env.USER_ID })
    .then((user) => {
      request.get('https://api.monzo.com/accounts', {
      // returns account details owned by the currently authorised user
        headers: { Authorization: `Bearer ${user.access_token}` },
      })
      // .then((response) => {
      //   console.log('***', response);
      //   // account details posted to user database
      //   user.update()
      // })
        .then((data) => {
          const response = JSON.parse(data);
          accountDB.id = response.accounts[0].id;
          accountDB.description = response.accounts[0].description;
          accountDB.created = response.accounts[0].created;
          accountDB.user_id = response.accounts[0].owners[0].user_id;
          /* eslint-disable-next-line no-console */
          console.log(accountDB);
          // console.log(accountDB.user_id);
          request.post('http://localhost:3000/api/v1/Users', {
            body: {
              account: {
                id: accountDB.id,
                description: accountDB.description,
                created: accountDB.created,
                user_id: accountDB.user_id,
              },
            },
            json: true,
          });
        })
        // .then(accountDB => Account.updateOrCreate({ user_id: process.env.USER_ID }, {
        //   id: accountDB.id,
        //   description: accountDB.description,
        //   created: accountDB.created,
        //   user_id: accountDB.user_id,
        // }))
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
  account,
};
