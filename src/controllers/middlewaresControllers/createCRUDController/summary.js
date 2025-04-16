const { sendResponse } = require("@/helpers");

const summary = async (Model, req, res) => {
  //  Query the database for a list of all results
  const countPromise = Model.countDocuments({
    removed: false,
  });

  const resultsPromise = await Model.countDocuments({
    removed: false,
  })
    .where(req.query.filter)
    .equals(req.query.equal)
    .exec();
  // Resolving both promises
  const [countFilter, countAllDocs] = await Promise.all([resultsPromise, countPromise]);

  if (countAllDocs.length > 0) {
    return sendResponse(res, 200, true, { countFilter, countAllDocs }, 'Successfully count all documents');
  } else {
    return sendResponse(res, 200, true, [], 'Collection is Empty');
  }
};

module.exports = summary;
