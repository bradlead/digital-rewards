const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  id: { type: String, require: true },
  description: { type: String, require: true },
  merchant: {
    id: { type: String, require: true },
    logo: { type: String, require: true },
    emoji: { type: String, require: true },
    name: { type: String, require: true },
    category: { type: String, require: true },
    address: {
      latitude: { type: Number, require: true },
      longitude: { type: Number, require: true },
    },
  },
  user_id: { type: String },
});

TransactionsSchema.statics.updateOrCreate = function updateOrCreate(key, data) {
  return this.findOneAndUpdate(key, data, { new: true, upsert: true });
};

const TransactionsModel = mongoose.model('Transactions', TransactionsSchema);

module.exports = TransactionsModel;
