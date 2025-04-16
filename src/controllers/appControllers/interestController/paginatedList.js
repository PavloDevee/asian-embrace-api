const { sendResponse } = require("@/helpers");

const paginatedList = async (Model, req, res) => {
  // Construct the base query for fetching results and counting documents
  const query = {
    removed: false,
    "enabled": true
  };

  // Promise to fetch results with pagination and sorting
  const resultsPromise = Model.find(query).exec();

  // Resolve both promises concurrently
  const [results] = await Promise.all([resultsPromise]);

  // Return success response with data
  return sendResponse(res, 200, true, results, 'Successfully found all documents');
};

module.exports = paginatedList;
