const Joi = require('joi');
const mongoose = require('mongoose');
const { sendResponse } = require('@/helpers');

const checkOtp = async (req, res, { userModel }) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);
  const { email, otp } = req.body;

  // validate
  const objectSchema = Joi.object({
    email: Joi.string().required(),
    otp: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ email, otp });
  if (error) {
    return sendResponse(res, 409, false, null, error.message || 'Invalid otp object');
  }

  const user = await User.findOne({ email: email, removed: false }).exec();

  if (!user)
    return sendResponse(res, 403, false, null, 'Something went wrong');

  const databasePassword = await UserPassword.findOne({ user: user._id, otp: otp });
  if (!databasePassword) {
    return sendResponse(res, 400, false, null, 'Invalid Code. Please try again');
  }
  return sendResponse(res, 200, true, null, 'Otp verfied successfully');
};

module.exports = checkOtp;
