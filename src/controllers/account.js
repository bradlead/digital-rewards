const request = require('request-promise');
// const Account = require('../models/account');

const account = (req, res) => {
  // returns account details owned by the currently authorised user
  request.get('https://api.monzo.com/accounts', {
      headers: { 'Authorization': `Bearer ${req.body.getToken.code}` }
  })
  // account details posted to user database
  .then(response => request.post('http://localhost:3000/api/v1/UserListing', {  
    body: {
      id: response.id,
      description: response.description,
      created: response.created,
    },
    json: true,
  }))
  console.log(body)
  .catch((error) => {
    console.log(error.message);
    res.sendStatus(200);
  })
}

module.exports = {
    account,
};
