const { sendResponse } = require("@/helpers");

const read = async (Model, req, res) => {
  // Find document by id
  const result = await Model.findOne({
    _id: req.params.id,
    removed: false,
  }).exec();
  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    // Return success resposne
    return sendResponse(res, 200, true, result, 'we found this document');
  }
};

module.exports = read;
