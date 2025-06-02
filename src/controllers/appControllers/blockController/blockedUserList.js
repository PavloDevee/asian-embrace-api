const { sendResponse } = require("@/helpers");

const blockedUserList = async (Model, req, res) => {
  
  const userId = req.user._id;

  const blockedUsers = await Model.find({
    removed: false,
    $or: [
      { user: userId },         // You blocked others
      { blockedUser: userId }   // Others blocked you
    ]
  }).exec();

  return sendResponse(res, 200, true, blockedUsers, 'Blocked users fetched successfully');
};

module.exports = blockedUserList;
