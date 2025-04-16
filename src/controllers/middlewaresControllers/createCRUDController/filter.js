const { sendResponse } = require("@/helpers");

const filter = async (Model, req, res) => {
  if (req.query.filter === undefined || req.query.equal === undefined) {
    return sendResponse(res, 403, false, null, 'filter not provided correctly');
  }
  const result = await Model.find({
    removed: false,
  })
    .where(req.query.filter)
    .equals(req.query.equal)
    .exec();
  if (!result) {
    return sendResponse(res, 404, false, null, 'No document found');
  } else {
    // Return success resposne
    return sendResponse(res, 200, true, result, 'Successfully found all documents');
  }
};

module.exports = filter;
