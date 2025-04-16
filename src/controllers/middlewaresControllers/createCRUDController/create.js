const { sendResponse } = require("@/helpers");

const create = async (Model, req, res) => {
  // Creating a new document in the collection
  const result = await new Model({
    ...req.body,
  }).save();

  // Returning successfull response
  return sendResponse(res, 200, true, result, 'Successfully Created the document in Model');
};

module.exports = create;
