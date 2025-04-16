const { sendResponse } = require('@/helpers');
const schema = require('./schemaValidate');

const create = async (Model, req, res) => {

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, null, error.details[0]?.message);
  }

  // Create and save the document
  const result = await new Model(value).save();

  // Returning successfull response
  return sendResponse(res, 200, true, result, 'Successfully Created the document in Model');
};

module.exports = create;
