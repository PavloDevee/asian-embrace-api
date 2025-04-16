const { sendResponse } = require("@/helpers");

const remove = async (Model, req, res) => {

  // Find the document by id and delete it
  let updates = {
    removed: true,
  };
  // Find the document by id and delete it
  const result = await Model.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();
  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    return sendResponse(res, 200, false, result, 'Successfully Deleted the document');
  }
};
module.exports = remove;
