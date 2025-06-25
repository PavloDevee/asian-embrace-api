const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const mongoose = require('mongoose');

const authUser = require('./authUser');
const { sendResponse } = require('@/helpers');

const login = async (req, res, { userModel }) => {
  const UserPasswordModel = mongoose.model(userModel + 'Password');
  const UserModel = mongoose.model(userModel);
  const { email, password, type, isRole, name } = req.body;

  // await UserModel.updateMany({ removed: false }, { $set: { emailVerified: true } });

  if (type && type == 'google') {
    // validate
    const objectSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: true } })
        .required(),
      name: Joi.string().required()
    });

    const { error, value } = objectSchema.validate({ email, name });
    if (error) {
      return sendResponse(res, 400, false, null, 'Invalid/Missing credentials.');
    }
  } else {
    // validate
    const objectSchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: true } })
        .required(),
      password: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ email, password });
    if (error) {
      return sendResponse(res, 400, false, null, 'Invalid/Missing credentials.');
    }

  }

  const user = await UserModel.findOne({ email: email, removed: false });

  if (!user) {
    if (type == 'google') {
      return sendResponse(res, 200, false, {
        needsRegistration: true,
        email: email,
        name: name
      }, 'New user. Please complete registration.');
    } else {
      return sendResponse(res, 404, false, null, 'No account with this email has been registered.');
    }
  }

  if(!user.emailVerified){
    return sendResponse(res, 404, false, {emailVerified: false}, 'No account with this email has been registered.');
  }

  if (isRole) {
    if (user.role != 'admin') {
      return sendResponse(res, 404, false, null, 'No account with this email has been registered.');
    }
  } else {
    if (user.role != 'user') {
      return sendResponse(res, 404, false, null, 'No account with this email has been registered.');
    }
  }

  const databasePassword = await UserPasswordModel.findOne({ user: user._id, removed: false });

  // if (!databasePassword.emailVerified)
  //   return res.status(200).json({
  //     success: false,
  //     result: null,
  //     message: 'No account with this email has been registered.',
  //   });

  if (!user.enabled)
    return sendResponse(res, 403, false, null, 'Account deactivated. Contact support for help.');

  //  authUser if your has correct password
  authUser(req, res, { user, databasePassword, password, UserModel, UserPasswordModel, type });
};

module.exports = login;
