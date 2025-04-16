const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const deleteImage = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  if (!req.body.imagePath) {
    return sendResponse(res, 400, false, null, "Image path is required");
  }

  // Function to determine if file is an image or video based on extension
  const isVideo = (path) => {
    const videoExtensions = [".mp4", ".avi", ".mov", ".wmv", ".flv", ".mkv"];
    return videoExtensions.some((ext) => path.toLowerCase().endsWith(ext));
  };

  try {

    let result;

    if (isVideo(req.body.imagePath)) {
      result = await User.findOneAndUpdate(
        { _id: req.user._id, removed: false },
        { video: null }, // Remove specific image path from the array
        { new: true } // Return updated document
      ).exec();
    } else {
      result = await User.findOneAndUpdate(
        { _id: req.user._id, removed: false },
        { $pull: { images: req.body.imagePath } }, // Remove specific image path from the array
        { new: true } // Return updated document
      ).exec();
    }

    if (!result) {
      return sendResponse(res, 404, false, null, "No document found");
    } else {
      return sendResponse(res, 200, true, result, "Image deleted successfully");
    }
  } catch (error) {
    console.log("error", error);
    
    return sendResponse(res, 500, false, null, "Server error");
  }
};

module.exports = deleteImage;
