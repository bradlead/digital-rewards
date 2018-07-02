const mongoose = require('mongoose');

const { Schema } = mongoose;

const accountSchema = new Schema({
  id: { type: String, require: true },
  description: { type: String, require: true },
  created: { type: String, require: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'UserListing' },
});

const Account =  mongoose.model('UserListing', accountSchema);

module.exports = Account;
