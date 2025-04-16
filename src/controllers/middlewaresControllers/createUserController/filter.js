const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const filter = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  if (req.query.filter === undefined || req.query.equal === undefined) {
    return sendResponse(res, 403, false, null, "filter not provided correctly");
  }
  const result = await User.find({ removed: false })
    .where(req.query.filter)
    .equals(req.query.equal);

  return sendResponse(res, 200, true, result, "Successfully found all documents");
};

module.exports = filter;
