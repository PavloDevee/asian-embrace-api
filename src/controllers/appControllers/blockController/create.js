const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidate');

/**
 * Handles the creation and removal of blocks.
 * @param {Object} Model - Mongoose model to interact with the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const create = async (Model, req, res) => {
  // Attach the admin ID to the request body
  req.body.user = req.user._id;

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message);
  }

  const { user, blockedUser } = value;

  // Check if the block already exists and is not removed
  const existingBlock = await Model.findOne({
    user,
    blockedUser,
    removed: false,
  });

  if (existingBlock) {
    // Mark the existing block as removed
    await Model.findByIdAndUpdate(
      existingBlock._id,
      { removed: true },
      { new: true, runValidators: true }
    );

    return sendResponse(res, 200, true, null, 'Unblock successfully');
  }

  // Create a new block
  await new Model(value).save();
  return sendResponse(res, 200, true, null, 'Blocked successfully');
};

module.exports = create;