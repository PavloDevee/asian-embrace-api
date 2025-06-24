const { sendResponse } = require("@/helpers");

/**
 * Handles the removal/unblocking of a blocked user.
 * @param {Object} Model - Mongoose model to interact with the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const remove = async (Model, req, res) => {
  const currentUserId = req.user._id;
  const { blockedUserId } = req.params;

  try {
    // Find the block record where current user blocked the target user
    const existingBlock = await Model.findOne({
      user: currentUserId,
      blockedUser: blockedUserId,
      removed: false,
    });

    if (!existingBlock) {
      return sendResponse(res, 404, false, null, "Block record not found");
    }

    // Mark the block as removed (unblock)
    await Model.findByIdAndUpdate(
      existingBlock._id,
      { removed: true },
      { new: true, runValidators: true }
    );

    return sendResponse(res, 200, true, null, "User unblocked successfully");
  } catch (error) {
    console.error("Error unblocking user:", error);
    return sendResponse(res, 500, false, null, "Internal server error");
  }
};

module.exports = remove;
