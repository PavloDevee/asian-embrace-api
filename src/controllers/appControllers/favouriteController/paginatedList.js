const { sendResponse } = require("@/helpers");
var mongoose = require("mongoose");
const UserModel = mongoose.model('User');

const paginatedList = async (Model, req, res) => {
  try {
    const { ObjectId } = mongoose.Types;
    const Block = mongoose.model('Block');
    const Report = mongoose.model('Report');
    // Default pagination values
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.items) || 10;
    const skip = (page - 1) * limit;
    const userId = req.user._id;

    // Extract query parameters
    const { sortBy = '_id', sortValue = -1, filter, equal } = req.query;
    const searchQuery = req.query.q || '';
    const searchCountry = req.query.country ? req.query.country.split(',') : [];
    const searchCity = req.query.city ? req.query.city.split(',') : [];
    const startAge = req.query.startAge ? parseInt(req.query.startAge) : null;
    const endAge = req.query.endAge ? parseInt(req.query.endAge) : null;
    const name = req.query.searchName || '';
    const fieldsArray = req.query.fields ? req.query.fields.split(',') : [];

    // Prepare field search filters
    let fieldsFilter = {};
    if (fieldsArray.length > 0) {
      fieldsFilter = {
        $or: fieldsArray.map(field => ({
          [field]: { $regex: new RegExp(searchQuery, 'i') }
        }))
      };
    }

    const currentYear = new Date().getFullYear();

    // Calculate date range based on provided age range
    const minDOB = endAge ? new Date(currentYear - parseInt(endAge), 0, 1) : null;  // Oldest person
    const maxDOB = startAge ? new Date(currentYear - parseInt(startAge), 11, 31) : null; // Youngest person

    const blockUsers = await Block.find({ user: req.user._id, removed: false });
    const blockedUserIds = blockUsers.map(b => b.blockedUser.toString()); // Convert to strings for consistency


    const reportUsers = await Report.find({ actionBy: req.user._id, removed: false });
    const reportedUserIds = reportUsers.map(r => r.actionOn.toString()); // or r.user depending on schema

    const excludedUserIds = [...new Set([
      ...blockedUserIds,
      ...reportedUserIds
    ])];

    // Construct base query
    const query = {
      removed: false,
      user: userId,
      favouriteUser: { $nin: excludedUserIds.map(id => new mongoose.Types.ObjectId(id)) },
      ...(filter && equal && { [filter]: equal }),
      ...fieldsFilter
    };

    // Construct `favouriteUser` filter
    const favouriteUserFilter = {
      ...(searchCountry.length ? { country: { $in: searchCountry } } : {}),
      ...(searchCity.length ? { city: { $in: searchCity } } : {}),
      ...(name ? { name: { $regex: new RegExp(name, 'i') } } : {}),
      ...(minDOB && maxDOB && { dob: { $gte: minDOB, $lte: maxDOB } }), // Filter by DOB range
    };

    const queryForCountry = {
      role: 'user',
      removed: false,
      enabled: true,
      isProfileComplete: true
    };

    // Fetch results with filtering inside `favouriteUser`
    const resultsPromise = Model.find({
      ...query
    })
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortValue })
      .populate({
        path: 'favouriteUser',
        match: favouriteUserFilter, // Apply filtering inside favouriteUser
      })
      .exec()
      .then(results => results.filter(result => result.favouriteUser !== null)); // Filter out null favouriteUser

    // Count query
    const countPromise = Model.aggregate([
      {
        $match: {
          removed: false,
          user: new ObjectId(userId),
          favouriteUser: { $nin: excludedUserIds.map(id => new mongoose.Types.ObjectId(id)) }
        },
      },
      {
        $lookup: {
          from: 'users', // Assuming the `favouriteUser` collection is 'users'
          localField: 'favouriteUser',
          foreignField: '_id',
          as: 'favouriteUser', // Populate `favouriteUser`
          pipeline: [
            { $match: favouriteUserFilter }, // Apply the filter on the favouriteUser collection
          ]
        },
      },
      {
        $unwind: {
          path: '$favouriteUser',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $match: { 'favouriteUser': { $ne: null } }, // Ensure favouriteUser is not null
      },
      {
        $count: 'count', // Get the count of the matched documents
      },
    ]);

    // Resolve both promises
    const [results, countResult] = await Promise.all([resultsPromise, countPromise]);


    const count = countResult.length > 0 ? countResult[0].count : 0;
    const totalPages = Math.ceil(count / limit); // Calculate total pages

    const userCountry = await UserModel.aggregate([
      { $match: queryForCountry }, // Apply filtering
      {
        $group: {
          _id: null,
          country: { $addToSet: "$country" },
          city: { $addToSet: "$city" }
        }
      },
      {
        $project: {
          _id: 0,
          country: 1,
          city: 1
        }
      }
    ]);

    const pagination = { page, totalPages, count, userCountry: userCountry[0] }; // Prepare pagination info

    // Return success response with data
    return sendResponse(res, 200, true, results, count > 0 ? 'Successfully found all documents' : 'Collection is empty', pagination);
  } catch (error) {
    return sendResponse(res, 500, false, null, error.message);
  }
};


module.exports = paginatedList;
