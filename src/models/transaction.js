const mongoose = require('mongoose');

const { Schema } = mongoose;

const TransactionsSchema = new Schema({
  id: { type: String, require: true },
  description: { type: String, require: true },
  user_id: { type: Schema.Types.ObjectId, ref: 'Users' },
});

TransactionsSchema.statics.updateOrCreate = function updateOrCreate(key, data) {
  return this.findOneAndUpdate(key, data, { new: true, upsert: true });
};

const TransactionsModel = mongoose.model('Transactions', TransactionsSchema);

module.exports = TransactionsModel;
