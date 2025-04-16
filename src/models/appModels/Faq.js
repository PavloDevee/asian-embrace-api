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
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
}
);

module.exports = mongoose.model('Faq', schema);
