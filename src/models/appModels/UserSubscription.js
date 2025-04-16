const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  planId: { type: mongoose.Schema.ObjectId, ref: 'Plan' },
  orderId: String,
  transactionDate: Date,
  transitionId: String,
  productId: String,
  paymentMethod: String,
  stripePId: String,
  stripeCustomerId: String,
  stripeSubscriptionId: String,
  amount: Number,
  userId: { type: mongoose.Schema.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: ['purchased', 'pending', 'cancelled'],
    default: 'purchased'
  },
  expireDate: {
    type: Date
  },
},
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  });

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('UserSubscription', schema);
