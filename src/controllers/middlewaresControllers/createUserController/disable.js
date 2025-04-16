const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const remove = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  let updates = {
    enabled: false,
  };

  // Find the document by id and delete it
  const user = await User.findOne({
    _id: req.params.id,
    removed: false,
  }).exec();

  if (user.role === 'admin' || user.role === 'owner') {
    return sendResponse(res, 403, false, null, "can't remove a user with role 'admin'");
  }
  // Find the document by id and delete it
  const result = await User.findOneAndUpdate(
    { _id: req.params.id, removed: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();
  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 404, false, null, "No document found");
  } else {
    return sendResponse(res, 200, true, result, "Successfully Deleted the document");
  }
};

module.exports = remove;
