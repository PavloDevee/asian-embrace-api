const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const profile = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  //  Query the database for a list of all results
  if (!req.user) {
    return sendResponse(res, 404, false, null, "couldn't found  admin Profile");
  }
  let result = {
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    photo: req.user.photo,
    role: req.user.role,
  };
  return sendResponse(res, 200, true, result, "Successfully found Profile");
};
module.exports = profile;
