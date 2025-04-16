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
  image: {
    type: String
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

module.exports = mongoose.model('Interest', schema);
