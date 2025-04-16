const bcrypt = require('bcryptjs');
const Joi = require('joi');
const mongoose = require('mongoose');

const shortid = require('shortid');
const { sendResponse } = require('@/helpers');
const sendMail = require('@/sendMail');

const resetPassword = async (req, res, { userModel }) => {
  const UserPassword = mongoose.model(userModel + 'Password');
  const User = mongoose.model(userModel);
  const { password, email } = req.body;

  // validate
  const objectSchema = Joi.object({
    password: Joi.string()
      .min(8)
      .pattern(new RegExp('^(?=.*[!@#$%^&*()_+\\-\\[\\]{};:"\'<>,.?/~`]).*$'))
      .messages({
        'string.pattern.base': 'Password must include at least 1 special character.',
      }).required(),
    email: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ password, email });
  if (error) {
    return sendResponse(res, 409, false, null, error.message || 'Invalid reset password object');
  }

  const user = await User.findOne({ email: email, removed: false }).exec();

  if (!user)
    return sendResponse(res, 403, false, null, 'Something went wrong');


  const databasePassword = await UserPassword.findOne({ user: user._id, removed: false });

  const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

  if (isMatch)
    return sendResponse(res, 400, false, null, 'The previous password cannot be used again.');

  if (!databasePassword) {
    return sendResponse(res, 400, false, null, 'Reset token not found please send again');
  }

  if (!databasePassword || !user)
    return sendResponse(res, 404, false, null, 'No account with this email has been registered.');

  const salt = shortid.generate();
  const hashedPassword = bcrypt.hashSync(salt + password);

  const result = await UserPassword.findOneAndUpdate(
    { user: user._id },
    {
      password: hashedPassword,
      salt: salt,
      otp: ""
    },
    {
      new: true,
    }
  ).exec();

  if (result) {
    await sendMail({
      email: user.email,
      name: user.name,
      subject: 'Your Password Has Been Changed',
      type: 'passwordChange',
    });
    return sendResponse(res, 200, true, result, 'Password reset successfully');
  }
};

module.exports = resetPassword;
