const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, },
  viewBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

schema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('ViewProfile', schema);
