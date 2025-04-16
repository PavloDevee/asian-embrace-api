const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const remove = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  const Post = mongoose.model('Post');
  const Event = mongoose.model('Event');

  // Find the document by id and delete it
  const user = await User.findOne({
    _id: req.params.id,

    removed: false,
  }).exec();

  let updates = {
    removed: true
  };
  // Find the document by id and delete it
  const result = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  const deletePost = await Post.updateMany(
    { userId: req.params.id },
    { $set: updates }
  );

  const deleteEvent = await Event.updateMany(
    { userId: req.params.id },
    { $set: updates }
  );

  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 404, false, null, "No document found");
  } else {
    return sendResponse(res, 200, true, result, "Successfully Deleted permantely the document");
  }
};

module.exports = remove;
