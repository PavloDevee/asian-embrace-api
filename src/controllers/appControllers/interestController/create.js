const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidate');

/**
 * Handles the creation and removal of reports.
 * @param {Object} Model - Mongoose model to interact with the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const create = async (Model, req, res) => {
  // Attach the admin ID to the request body
  req.body.actionBy = req.user._id;

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message);
  }

  const { actionBy, actionOn, message } = value;

  // Check if the report already exists and is not removed
  const existingReport = await Model.findOne({
    actionBy,
    actionOn
  });

  if (existingReport) {
    return sendResponse(res, 200, true, null, 'Already reported');
  }

  // Create a new report
  await new Model(value).save();
  return sendResponse(res, 200, true, null, 'Report successfully');
};

module.exports = create;