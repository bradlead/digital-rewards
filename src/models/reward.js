const mongoose = require('mongoose');

const { Schema } = mongoose;

const RewardSchema = new Schema({
  // description: { type: String, require: true },
  // merchant_id: { type: String, require: true },
  // merchant_name: { type: String, require: true },
  // merchant_logo: { type: String, require: true },
  // latitude: { type: Number, require: true },
  // longitude: { type: Number, require: true },
  // redeemed: { type: Boolean, require: true },
  description: { type: String, require: true },
  merchant: {
    id: { type: String, require: true },
    name: { type: String, require: true },
    logo: { type: String, require: true },
    address: {
      latitude: { type: Number, require: true },
      longitude: { type: Number, require: true },
    },
  },
  redeemed: { type: Boolean, require: true },
  user_id: { type: String },
});

RewardSchema.statics.updateOrCreate = function updateOrCreate(key, data) {
  return this.findOneAndUpdate(key, data, { new: true, upsert: true });
};

const Reward = mongoose.model('Reward', RewardSchema);

module.exports = Reward;
