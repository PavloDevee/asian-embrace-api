const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidateUpdate');

/**
 * Updates a document in the database using the provided model and validates the input.
 * 
 * @param {Object} Model - Mongoose model for the document to be updated.
 * @param {Object} req - Express request object, containing the document ID and updated data.
 * @param {Object} res - Express response object to send back the result.
 * @returns {Object} JSON response indicating success or failure of the update operation.
 */
const update = async (Model, req, res) => {
  // Attach the ID of the user performing the update to the request body
  req.body.updatedBy = req.user._id;
  
  // Attach the document ID from the request parameters to the request body
  req.body.id = req.params.id;

  // Validate the request body using the schema
  const { error, value } = schema.validate(req.body);

  if (error) {
    // If validation fails, return a 400 error with the validation message
    const { details } = error;
    return sendResponse(res, 400, false, null, details[0]?.message);
  }

    // Attempt to find and update the document using the provided ID and validated data
    const result = await Model.findOneAndUpdate(
      { _id: req.params.id },  // Match the document by ID
      value,                    // Update the document with validated values
      {
        new: true,              // Return the newly updated document, not the old one
        runValidators: true,    // Ensure that the document passes the schema validation on update
      }
    ).exec();

    if (!result) {
      // If no document is found, return a 404 error with a relevant message
      return sendResponse(res, 404, false, null, 'No document found with the provided ID');
    }

    // Return a success response with the updated document
    return sendResponse(res, 200, true, result, 'Document updated successfully');
};

module.exports = update;
