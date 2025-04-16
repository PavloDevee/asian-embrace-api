const { sendResponse } = require('@/helpers');
// const schema = require('./schemaValidate');
const mongoose = require('mongoose');
const User = mongoose.model('User');

/**
 * Handles the creation and removal of reports.
 * @param {Object} Model - Mongoose model to interact with the database.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */

const create = async (Model, req, res) => {
  // Attach the admin ID to the request body
  req.body.userId = req.user._id;

  // Validate the request body against the schema
  // const { error, value } = schema.validate(req.body);
  // if (error) {
  //   return sendResponse(res, 400, false, null, error.details[0]?.message);
  // }

  // const { actionBy, actionOn, message } = value;

  // Check if the report already exists and is not removed
  const existingReport = await Model.findOne({
    userId: req.body.userId
  });

  if (existingReport) {
    return sendResponse(res, 200, true, null, 'Already plan purchase');
  }

  // Create a new report
  await new Model({userId: req.body.userId}).save();
  // Update the user collection to set isPlanPurchase: true
  await User.findByIdAndUpdate(req.body.userId, { isPlanPurchase: true });
  return sendResponse(res, 200, true, null, 'Plan purchase successfully');
};

module.exports = create;