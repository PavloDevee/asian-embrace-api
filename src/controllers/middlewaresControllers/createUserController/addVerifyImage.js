const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const addVerifyImage = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  let body = req.body;
  
  if (!body.file) {
    return sendResponse(res, 400, false, null, 'Image is required');
  }

  let updates = {
    verifiedImage: body.file,
    isVerified: 'pending'
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
    return sendResponse(res, 404, false, null, 'No document found');
  }

  const resultData = {
    _id: result._id,
    enabled: result.enabled,
    name: result.name,
  }
  return sendResponse(res, 200, true, resultData, 'we update this document');
};

module.exports = addVerifyImage;
