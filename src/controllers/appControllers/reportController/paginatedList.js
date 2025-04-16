const { sendResponse } = require("@/helpers");
const mongoose = require('mongoose');

const paginatedList = async (Model, req, res) => {
  const User = mongoose.model('User');
  // Default values for pagination and query parameters
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.items) || 10;
  const skip = (page - 1) * limit;  // Calculate skip based on page and limit

  // Extract sorting and filtering parameters from query
  const { sortBy = '_id', sortValue = -1, filter, equal } = req.query;
  const searchQuery = req.query.q || '';
  const fieldsArray = req.query.fields ? req.query.fields.split(',') : [];

  // Prepare the fields filter if any fields are specified
  let fieldsFilter = {};
  if (fieldsArray.length > 0) {
    fieldsFilter = {
      $or: fieldsArray.map(field => ({
        [field]: { $regex: new RegExp(searchQuery, 'i') }
      }))
    };
  }

// Step 1: Find matching users based on search query (for actionOn and actionBy)
let actionOnIds = [];
let actionByIds = [];

if (searchQuery) {
  const userFilter = {
    $or: [
      { name: { $regex: new RegExp(searchQuery, 'i') } },
      { email: { $regex: new RegExp(searchQuery, 'i') } }
    ]
  };

  const users = await User.find(userFilter).select('_id');
  const userIds = users.map(user => user._id);
  
  actionOnIds = userIds;
  actionByIds = userIds;
}

// Step 2: Build main query
let query = { removed: false };

if (filter && equal) {
  query[filter] = equal; // Apply additional filters
}

if (searchQuery) {
  query.$or = [
    { actionOn: { $in: actionOnIds } },
    { actionBy: { $in: actionByIds } }
  ];
}

  // Promise to fetch results with pagination and sorting
  const resultsPromise = Model.find(query)
  .skip(skip)
  .limit(limit)
  .sort({ [sortBy]: sortValue })
  .populate('actionOn', 'name email')
  .populate('actionBy', 'name email') // Include only name and email fields
  .exec();

  // Promise to count the total documents matching the query
  const countPromise = Model.countDocuments(query);

  // Resolve both promises concurrently
  const [results, count] = await Promise.all([resultsPromise, countPromise]);

  // Calculate total pages
  const totalPages = Math.ceil(count / limit);

  // Prepare pagination info
  const pagination = { page, totalPages, count };

  // Return success response with data
  return sendResponse(res, 200, true, results, count > 0 ? 'Successfully found all documents' : 'Collection is empty', pagination);
};

module.exports = paginatedList;
