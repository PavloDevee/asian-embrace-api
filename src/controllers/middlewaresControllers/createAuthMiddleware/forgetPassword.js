const Joi = require('joi');
const mongoose = require('mongoose');
const sendMail = require('../../../sendMail');
const shortid = require('shortid');
const { sendResponse } = require('@/helpers');

const forgetPassword = async (req, res, { userModel }) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);
  const { email } = req.body;

  // validate
  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } })
      .required(),
  });

  const { error, value } = objectSchema.validate({ email });
  if (error) {
    const { details } = error;
    return sendResponse(res, 400, false, null, details[0]?.message);
  }
  const user = await User.findOne({ email: email, removed: false });

  if (!user)
    return sendResponse(res, 404, false, null, 'No account with this email has been registered.');

  if (!user.enabled)
    return sendResponse(res, 403, false, null, 'Your account is disabled, contact your account adminstrator.');


  // Check if the reset token was sent in the last 5 minutes
  const userPassword = await UserPassword.findOne({ user: user._id });

  if (userPassword && userPassword.resetTokenSendBy) {
    const timeDifference = new Date() - new Date(userPassword.resetTokenSendBy);
    const oneMinutes = 1 * 60 * 1000;

    if (timeDifference < oneMinutes) {
      return sendResponse(res, 400, false, null, 'A OTP already sent. Please try again after 1 minutes.');
    }
  }

  // Generate a random 6-digit number
  const generateRandomOTP = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Usage
  const otp = generateRandomOTP();

  const resetToken = shortid.generate();

  await UserPassword.findOneAndUpdate(
    { user: user._id },
    { resetToken, otp, resetTokenSendBy: new Date() },
    {
      new: true,
    }
  ).exec();

  await sendMail({
    email,
    name: user.name,
    otp: otp,
    subject: 'Forgot password verification',
    type: 'forgotVerification',
  });
  const result = { userId: user._id };

  return sendResponse(res, 200, true, result, 'Check your email inbox , to reset your password.');
};

module.exports = forgetPassword;
