const User = require('../models/user');

const index = (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

const create = (req, res) => {
  const user = new User({
    access_token: req.body.access_token,
    client_id: req.body.client_id,
    expires_in: req.body.expires_in,
    token_type: req.body.token_type,
    user_id: req.body.user_id,
  });
  user.save()
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
};

module.exports = {
  index,
  create,
};
