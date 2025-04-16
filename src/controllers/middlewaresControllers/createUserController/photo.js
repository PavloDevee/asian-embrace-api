const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const photo = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  console.log("req.body", req.body);
  
  const updates = {
    photo: req.body.file,
  };

  const tmpResult = await User.findOneAndUpdate(
    { _id: req.user._id, removed: false },

    { $set: updates },
    { new: true, runValidators: true }
  );

  // If no results found, return document not found
  if (!tmpResult) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    // Return success resposne
    let result = {
      _id: tmpResult._id,
      enabled: tmpResult.enabled,
      email: tmpResult.email,
      name: tmpResult.name,
      photo: tmpResult.photo,
      role: tmpResult.role,
    };
    return sendResponse(res, 200, true, result, 'we update this document photo');
  }
};
module.exports = photo;
