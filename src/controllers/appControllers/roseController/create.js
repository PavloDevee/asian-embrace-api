const { sendResponse, notification } = require('@/helpers');
const schema = require('./schemaValidate');

/**
 * Handles the creation and removal of roses.
 * @param {Object} Model - Mongoose model to interact with the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const create = async (Model, req, res) => {
  // Attach the admin ID to the request body
  req.body.sentBy = req.user._id;

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message || 'Validation error');
  }

  const { sentBy, receivedBy } = value;

  // Check if the rose already exists and is not removed
  const existingRose = await Model.findOne({
    sentBy,
    receivedBy,
    removed: false,
  });

  if (existingRose) {
    return sendResponse(res, 200, true, null, 'Rose already sent.');
  }

  // Add Notification
  await notification("rose", sentBy, receivedBy);
  // Create a new rose
  await new Model(value).save();

  return sendResponse(res, 200, true, null, 'Rose sent successfully');
};

module.exports = create;