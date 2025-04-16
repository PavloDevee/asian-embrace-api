const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  actionBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  actionOn: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Report', schema);
