const { sendResponse } = require("@/helpers");

const paginatedList = async (Model, req, res) => {
  // Extract pagination parameters with defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.items) || 25;
  const skip = (page - 1) * limit; // Correct offset calculation

  // Extract sorting and filtering parameters
  const { sortBy = '_id', sortValue = 1, filter, equal, q } = req.query;

  // Construct search fields if provided
  const fieldsArray = req.query.fields ? req.query.fields.split(',') : [];
  const searchQuery = fieldsArray.length
    ? { $or: fieldsArray.map((field) => ({ [field]: { $regex: new RegExp(q, 'i') } })) }
    : {};

  // Build the query object
  const query = {
    removed: false,
    ...(filter && equal ? { [filter]: equal } : {}), // Apply filter only if both are present
    ...searchQuery,
  };

  // Execute database queries concurrently
  const [result, count] = await Promise.all([
    Model.find(query).skip(skip).limit(limit).sort({ [sortBy]: sortValue }).exec(),
    Model.countDocuments(query),
  ]);

  // Calculate total pages
  const totalPages = Math.ceil(count / limit);

  // Prepare pagination metadata
  const pagination = { page, totalPages, count };

  // Return response based on the results
  return sendResponse(res, 200, true, result, count > 0 ? 'Successfully found all documents' : 'Collection is empty', pagination);
};

module.exports = paginatedList;
