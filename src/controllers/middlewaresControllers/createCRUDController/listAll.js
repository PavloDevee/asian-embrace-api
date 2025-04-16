const { sendResponse } = require("@/helpers");

const listAll = async (Model, req, res) => {
  const sort = req.query.sort || 'desc';
  const enabled = req.query.enabled || undefined;
  //  Query the database for a list of all results

  let result;
  if (enabled === undefined) {
    result = await Model.find({
      removed: false,
    })
      .sort({ created: sort })
      .populate()
      .exec();
  } else {
    result = await Model.find({
      removed: false,
      enabled: enabled,
    })
      .sort({ created: sort })
      .populate()
      .exec();
  }

  if (result.length > 0) {
    return sendResponse(res, 200, true, result, 'Successfully found all documents');
  } else {
    return sendResponse(res, 200, true, [], 'Collection is Empty');
  }
};

module.exports = listAll;
