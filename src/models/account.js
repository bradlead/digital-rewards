const mongoose = require('mongoose');

const { Schema } = mongoose;

const AccountSchema = new Schema({
  id: { type: String, require: true },
  description: { type: String, require: true },
  created: { type: String, require: true },
  User: { type: Schema.Types.ObjectId, ref: 'Users' },
});

AccountSchema.statics.updateOrCreate = function updateOrCreate(key, data) {
  return this.findOneAndUpdate(key, data, { new: true, upsert: true });
};

const Account = mongoose.model('Accounts', AccountSchema);

module.exports = Account;
