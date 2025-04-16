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
  isRead: {
    type: Boolean,
    default: false,
  },
  sendBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assuming the sender is a User
    required: true,
  },
  receivedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User", // Assuming the receiver is a User
    required: true,
  },
  type: { type: String, enum: ['favourite', 'rose', 'view', 'like', 'dislike', 'chat'], required: true },
  message: String,
  status: {
    type: String,
    enum: ['pending', 'done'],
    default: 'pending'
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Notification', schema);
