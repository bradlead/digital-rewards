const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  access_token: { type: String, require: true },
  client_id: { type: String, require: true },
  expires_in: { type: Number, require: true },
  token_type: { type: String, require: true },
  user_id: { type: String, require: true },
});

UserSchema.statics.findOneOrCreate = function findOneOrCreate(key, data) {
  return this.findOne(key).then((user) => {
    if (user) {
      return user;
    }
    return this.create(data).then((newUser) => {
      return newUser;
    });
  });
}

const UserModel = mongoose.model('UserListing', UserSchema);

module.exports = UserModel;
