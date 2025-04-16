const mongoose = require('mongoose');
const { sendResponse } = require('@/helpers');
const sendMail = require('@/sendMail');

const updateEmail = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  let { currentEmail, email } = req.body;

  // Validate new email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return sendResponse(res, 400, false, null, "Invalid email format");
  }

  // Fetch existing user data
  const existingUser = await User.findOne({ _id: req.user._id, removed: false }).exec();

  if (!existingUser) {
    return sendResponse(res, 404, false, null, "User not found");
  }

  // Verify current email matches the one in the database
  if (existingUser.email !== currentEmail) {
    return sendResponse(res, 403, false, null, "Current email is incorrect");
  }

  // Check if the new email is already in use
  const emailExists = await User.findOne({ email }).exec();
  if (emailExists) {
    return sendResponse(res, 409, false, null, "Email is already in use");
  }

  // Update email in the database
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: { email } },
    { new: true }
  ).exec();

  if (!updatedUser) {
    return sendResponse(res, 500, false, null, "Email update failed");
  }

  await sendMail({
    email: existingUser.email,
    name: existingUser.name,
    subject: 'Your Email Address Has Been Updated',
    type: 'emailAddressChange',
    userEmail: email
    
  });

  return sendResponse(res, 200, true, null, "Email updated successfully");
};

module.exports = updateEmail;
