const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { generate: uniqueId } = require('shortid');
const { sendResponse } = require('@/helpers');

const updateProfile = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  const UserPassword = mongoose.model(userModel + 'Password');
  let body = req.body;
  let { email, password } = body;
  let updates = {
    email
  }
  // Find document by id and updates with the required fields
  const result = await User.findOneAndUpdate(
    { _id: req.user._id, removed: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  if (!result) {
    return sendResponse(res, 404, false, null, "No profile found");
  }
  const salt = uniqueId();

  const passwordHash = bcrypt.hashSync(salt + password);

  const UserPasswordData = {
    password: passwordHash,
    salt: salt,
  };

  await UserPassword.findOneAndUpdate(
    { user: req.user._id, removed: false },
    { $set: UserPasswordData },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  const resultData = {
    _id: result?._id,
    enabled: result?.enabled,
    email: result?.email,
    name: result?.name,
    photo: result?.photo,
    role: result?.role,
  }

  return sendResponse(res, 200, true, resultData, "we update this profile");
};

module.exports = updateProfile;
