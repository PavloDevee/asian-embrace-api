const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { generate: uniqueId } = require('shortid');
const { sendResponse } = require('@/helpers');

const updateProfilePassword = async (userModel, req, res) => {
  const UserPassword = mongoose.model(userModel + 'Password');

  const reqUserName = userModel.toLowerCase();
  const userProfile = req[reqUserName];
  let { password, passwordCheck } = req.body;

  if (!password || !passwordCheck)
    return sendResponse(res, 400, false, null, "Not all fields have been entered.");

  if (password.length < 8)
    return sendResponse(res, 400, false, null, "The password needs to be at least 8 characters long.");

  if (password !== passwordCheck)
    return sendResponse(res, 400, false, null, "Enter the same password twice for verification.");

  // Find document by id and updates with the required fields

  const salt = uniqueId();

  const passwordHash = bcrypt.hashSync(salt + password);

  const UserPasswordData = {
    password: passwordHash,
    salt: salt,
  };

  const resultPassword = await UserPassword.findOneAndUpdate(
    { user: userProfile._id, removed: false },
    { $set: UserPasswordData },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  if (!resultPassword) {
    return sendResponse(res, 403, false, null, "User Password couldn't save correctly");
  }

  return sendResponse(res, 200, true, null, "we update the password");
};

module.exports = updateProfilePassword;
