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
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String
  },
  bannerImage: {
    type: String,
  },
  type: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId
  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

module.exports = mongoose.model('Blog', schema);
