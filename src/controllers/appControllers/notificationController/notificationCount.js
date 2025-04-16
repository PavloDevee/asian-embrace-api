const { sendResponse } = require("@/helpers");

const notificationCount = async (Model, req, res) => {
  // Default values for pagination and query parameters
  const userId = req.user._id;

  const queryUnRead = {
    removed: false,
    receivedBy: userId,
    isRead: false
  };

  // Promise to count the total documents matching the query
  const countPromiseUnRead = Model.countDocuments(queryUnRead);

  // Resolve both promises concurrently
  const [unReadCount] = await Promise.all([countPromiseUnRead]);

  const results = {
    unReadCount
  }

  // Return success response with data
  return sendResponse(res, 200, true, results, unReadCount > 0 ? 'Successfully found all documents' : 'Collection is empty');
};

module.exports = notificationCount;
