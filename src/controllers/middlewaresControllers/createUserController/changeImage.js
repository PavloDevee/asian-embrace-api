const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const changeImage = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  
  if (req.body.imagePath) {
    let updates = {
      photo: req.body.imagePath,
    };
    // Find the document by id and delete it
    const result = await User.findOneAndUpdate(
      { _id: req.user._id, removed: false },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();
    // If no results found, return document not found
    if (!result) {
      return sendResponse(res, 404, false, null, "No document found");
    } else {
      return sendResponse(res, 200, true, result, "Image change successfully");
    }
  } else {
    return sendResponse(res, 400, false, null, "Image path is required");
  }
};
module.exports = changeImage;
