const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generate: uniqueId } = require('shortid');
const { sendResponse } = require('@/helpers');
const sendMail = require('@/sendMail');

const updatePassword = async (userModel, req, res) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);

  let { currentPassword, password } = req.body;

  // Validate new password length and complexity
  if (!password || password.length < 8) {
    return sendResponse(res, 400, false, null, "Password must be at least 8 characters long");
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return sendResponse(res, 400, false, null, "Password must include at least one special character");
  }

  // Fetch existing user password
  const existingUserDetail = await User.findOne({ _id: req.user._id, removed: false }).exec();

  if (!existingUserDetail) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  const existingUser = await UserPassword.findOne({ user: req.user._id, removed: false }).exec();

  if (!existingUser) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  // Verify current password
  const isCurrentPasswordValid = bcrypt.compareSync(existingUser.salt + currentPassword, existingUser.password);
  if (!isCurrentPasswordValid) {
    return sendResponse(res, 403, false, null, "Current password is incorrect");
  }

  // Prevent users from using the same password
  const isSamePassword = bcrypt.compareSync(existingUser.salt + password, existingUser.password);
  if (isSamePassword) {
    return sendResponse(res, 400, false, null, "New password cannot be the same as the current password");
  }

  // Generate new salt and hash the new password
  const salt = uniqueId();
  const passwordHash = bcrypt.hashSync(salt + password);

  const UserPasswordData = {
    password: passwordHash,
    salt: salt,
  };

  // Update password in database
  const resultPassword = await UserPassword.findOneAndUpdate(
    { user: req.user._id, removed: false },
    { $set: UserPasswordData },
    { new: true }
  ).exec();

  if (!resultPassword) {
    return sendResponse(res, 403, false, null, "User Password couldn't be updated");
  }

  await sendMail({
      email: existingUserDetail.email,
      name: existingUserDetail.name,
      subject: 'Your Password Has Been Changed',
      type: 'passwordChange',
    });

  return sendResponse(res, 200, true, null, "Password updated successfully");
};

module.exports = updatePassword;
