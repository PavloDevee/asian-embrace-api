const { sendResponse } = require("@/helpers");
const mongoose = require("mongoose");

const getUser = async (userModel, req, res) => {
  try {
    const User = mongoose.model(userModel);

    const { conversation_id } = req.params;

    if (!conversation_id) {
      return sendResponse(res, 400, false, null, "conversation_id is required");
    }

    const foundUser = await User.findById(conversation_id);

    if (!foundUser) {
      return sendResponse(res, 404, false, null, "User not found");
    }

    return sendResponse(res, 200, true, foundUser, "User exists");
  } catch (error) {
    console.log("get user error", error);
    return sendResponse(res, 500, false, null, "Internal server error");
  }
};
module.exports = getUser;
