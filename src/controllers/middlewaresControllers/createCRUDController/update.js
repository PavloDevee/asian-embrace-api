const { sendResponse } = require("@/helpers");

const update = async (Model, req, res) => {
  // Find document by id and updates with the required fields
  req.body.removed = false;
  const result = await Model.findOneAndUpdate({ _id: req.params.id, removed: false }, req.body, {
    new: true, // return the new result instead of the old one
    runValidators: true,
  }).exec();
  if (!result) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    return sendResponse(res, 200, true, result, 'we update this document');
  }
};

module.exports = update;
