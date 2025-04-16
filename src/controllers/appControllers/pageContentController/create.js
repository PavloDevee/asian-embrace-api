const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidate');

const create = async (Model, req, res) => {

  // Assign the logged-in user as the creator
  req.body.createdBy = req.user._id;

  // Validate request body using predefined schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message);
  }

  // const { content, page, shortContent, createdBy, bannerImage } = value;

  const checkAlready = await Model.findOne({
    page: { $ne: "guidelines" }, // Allow multiple "guidelines"
    removed: false,
    page: value.page,
  }).exec();

  if (checkAlready) {
    return sendResponse(res, 409, false, null, 'Page already exists.');
  }

  // Save the document in the database
  const result = await new Model(value).save();

  // Return success response
  return sendResponse(res, 200, true, result, 'Document created successfully.');
};

module.exports = create;
