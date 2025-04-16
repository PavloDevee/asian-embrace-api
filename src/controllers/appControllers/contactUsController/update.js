const { sendResponse } = require("@/helpers");

const update = async (Model, req, res) => {

  let updates = {
    isRead: true,
  };
  // Find the document by id and delete it
  const result = await Model.findOneAndUpdate(
    { isRead: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  return sendResponse(res, 200, false, result, 'Successfully read the document');
};

module.exports = update;
