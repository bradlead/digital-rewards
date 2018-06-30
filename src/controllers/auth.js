const jwt = require('jsonwebtoken');
const request = require('request-promise');

const createJWT = (user, callback) => {
  const payload = {
    access_token: user.access_token,
    client_id: user.client_id,
    expires_in: user.expires_in,
    token_type: user.token_type,
    user_id: user.user_id,
  };
  console.log(payload)
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, callback);
};

const monzo = (req, res) => {
  // exchange authorization code for access token
  request.post('https://api.monzo.com/oauth2/token', {
    form: {
      grant_type: 'authorization_code',
      client_id: process.env.MONZO_CLIENT_ID,
      client_secret: process.env.MONZO_CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URL,
      code: req.body.code,
    },
    json: true,
  })
  // add access token to User collection here
  .then(response => request.post('http://localhost:3000/api/v1/UserListing', {  
  body: {
    access_token: response.access_token,
    client_id: response.client_id,
    expires_in: response.expires_in,
    token_type: response.token_type,
    user_id: response.user_id,
     },
     json: true,
  }))

  // .then((response) => {
  //   console.log(response);
  //   return request.post('http://localhost:3000/api/v1/User', {
  //    body: {
  //         _id: 'testingtesting123',
  //         access_token: response.access_token,
  //      },
  //      json: true,
  //    });
  // })

  // return a JWT to the user (we don't want to reveal the access_token to the client)
  .then((user) => {
    createJWT(user, (err, token) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json({ token }); 
      }
    });
  })
  .catch((error) => {
    console.log(error.message);
    res.sendStatus(200);
  })
}

module.exports = {
  monzo,
};
