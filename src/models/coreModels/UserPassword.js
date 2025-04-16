const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const UserPasswordSchema = new Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  isSendLoginReminder: {
    type: Boolean,
    default: false,
  },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true, unique: true },
  password: {
    type: String
  },
  salt: {
    type: String
  },
  emailToken: String,
  resetToken: String,
  otp: String,
  resetTokenSendBy: Date,
  loginAt: Date,
  // emailVerified: {
  //   type: Boolean,
  //   default: false,
  // },
  authType: {
    type: String,
    default: 'email',
  },
  loggedSessions: {
    type: [String],
    default: [],
  },
});

// UserPasswordSchema.index({ user: 1 });
// generating a hash
UserPasswordSchema.methods.generateHash = function (salt, password) {
  return bcrypt.hashSync(salt + password);
};

// checking if password is valid
UserPasswordSchema.methods.validPassword = function (salt, userpassword) {
  return bcrypt.compareSync(salt + userpassword, this.password);
};

module.exports = mongoose.model('UserPassword', UserPasswordSchema);
