const { sendResponse } = require("@/helpers");

const paginatedList = async (Model, req, res) => {
    // Default values for pagination and query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = (page - 1) * limit;  // Calculate skip based on page and limit
    const userId = req.user._id;

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

    // Construct the base query for fetching results and counting documents
    const query = {
      removed: false,
      receivedBy: userId,
      ...(filter && equal && { [filter]: equal }),  // Conditionally add filter if provided
      ...fieldsFilter,  // Add search fields filter if applicable
    };

    // Promise to fetch results with pagination and sorting
    const resultsPromise = Model.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortValue })
      .populate('sendBy')
      .exec();

    // Promise to count the total documents matching the query
    const countPromise = Model.countDocuments(query);

    const queryUnRead = {
      removed: false,
      receivedBy: userId,
      isRead: false
    };

    // Promise to count the total documents matching the query
    const countPromiseUnRead = Model.countDocuments(queryUnRead);

    // Resolve both promises concurrently
    const [results, count, unReadCount] = await Promise.all([resultsPromise, countPromise, countPromiseUnRead]);

    // Calculate total pages
    const totalPages = Math.ceil(count / limit);

    // Prepare pagination info
    const pagination = { page, totalPages, count, unReadCount };

    // Return success response with data
    return sendResponse(res, 200, true, results, count > 0 ? 'Successfully found all documents' : 'Collection is empty', pagination);
};

module.exports = paginatedList;
