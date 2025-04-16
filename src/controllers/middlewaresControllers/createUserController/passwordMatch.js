const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const { sendResponse } = require('@/helpers');

const passwordMatch = async (userModel, req, res) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const userId = req.user._id;
  const password = req.params.password;
  
  const databasePassword = await UserPassword.findOne({ user: userId, removed: false });
  
  const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

  if (isMatch){
    return sendResponse(res, 200, true, true, 'Password match successfully');
  }

  if (!isMatch) {
    return sendResponse(res, 400, false, false, 'Password not match');
  }
};

module.exports = passwordMatch;