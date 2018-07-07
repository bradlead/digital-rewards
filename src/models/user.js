const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  access_token: { type: String, require: true },
  client_id: { type: String, require: true },
  expires_in: { type: Number, require: true },
  token_type: { type: String, require: true },
  user_id: { type: String, require: true },
  account: {
    id: { type: String, require: true },
    description: { type: String, require: true },
    created: { type: String, require: true },
  },
});

UserSchema.statics.updateOrCreate = function updateOrCreate(key, data) {
  return this.findOneAndUpdate(key, data, { new: true, upsert: true });
};

const UserModel = mongoose.model('Users', UserSchema);

module.exports = UserModel;
