const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  id: { type: String, require: true },
  description: { type: String, require: true },
  created: { type: String, require: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
});

const Account = mongoose.model('Accounts', AccountSchema);

module.exports = Account;
