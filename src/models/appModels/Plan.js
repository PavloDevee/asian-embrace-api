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
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: Number,
  stripePlanId: String,
  stripeProductId: String,
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
},
  {
    timestamps: { createdAt: 'created', updatedAt: 'updated' },
  }
);

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Plan', schema);
