const { sendResponse } = require("@/helpers");
const mongoose = require("mongoose");

const uploadImages = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  console.log("req.body", req.body);

  const updates = {};

  if (Array.isArray(req.body.images) && req.body.images.length > 0) {
    updates.$push = { images: { $each: req.body.images } }; // Push multiple images
  }

  if (req.body.video) {
    updates.$set = { video: req.body.video }; // Replace existing video
  }

  const tmpResult = await User.findOneAndUpdate(
    { _id: req.user._id, removed: false },
    updates,
    { new: true, runValidators: true }
  );

  // If no results found, return document not found
  if (!tmpResult) {
    return sendResponse(res, 404, false, null, "No document found");
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
    return sendResponse(
      res,
      200,
      true,
      result,
      "we update this document photo"
    );
  }
};

module.exports = uploadImages;
