const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidateUpdate');

const update = async (Model, req, res) => {

  // Attach the ID of the user performing the update to the request body
  req.body.updatedBy = req.user._id;

  // Validate the request body using the schema
  const { error, value } = schema.validate(req.body);

  if (error) {
    // If validation fails, return a 400 error with the validation message
    const { details } = error;
    return sendResponse(res, 400, false, null, details[0]?.message);
  }
  
  const checkAlready = await Model.findOne({
    _id: { $ne: value.id }, // Exclude the current document being updated
    removed: false,
    slug: value.slug,
  }).exec();

  if (checkAlready) {
    return sendResponse(res, 409, false, null, 'Slug already exists.');
  }

  // Attempt to find and update the document using the provided ID and validated data
  const result = await Model.findOneAndUpdate(
    { _id: value.id },  // Match the document by ID
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
