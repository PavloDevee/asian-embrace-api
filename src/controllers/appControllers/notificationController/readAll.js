const { sendResponse } = require('@/helpers');

const readAll = async (Model, req, res) => {
  // Update all notifications where `receivedBy` matches the logged-in user
  let result;
  if (req.params.id) {
    // Update a single notification by ID
    result = await Model.updateOne(
      { _id: req.params.id, receivedBy: req.user._id }, // Ensure it belongs to the user
      { $set: { isRead: true } }
    );
  } else {
    result = await Model.updateMany(
      { receivedBy: req.user._id, isRead: false },  // Find all unread notifications
      { $set: { isRead: true } }                    // Mark them as read
    );
  }

  if (result.modifiedCount === 0) {
    return sendResponse(res, 404, false, null, 'No unread notifications found');
  }

  return sendResponse(res, 200, true, result, 'All notifications marked as read');
};

module.exports = readAll;
