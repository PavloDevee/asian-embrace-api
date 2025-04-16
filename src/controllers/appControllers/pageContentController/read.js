const { sendResponse } = require("@/helpers");

const read = async (Model, req, res) => {
  // Find document by id
  let result;
  if (req.params.id) {
    result = await Model.findOne({
      _id: req.params.id,
      removed: false,
    }).exec();
  } else {
    if (req.params.slug == 'guidelines') {
      result = await Model.find({
        page: req.params.slug,
        removed: false,
      }).exec();
    } else {
      result = await Model.findOne({
        page: req.params.slug,
        removed: false,
      }).exec();
    }
  }

  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    // Return success resposne
    return sendResponse(res, 200, true, result, 'we found this document');
  }
};

module.exports = read;
