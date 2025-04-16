const { sendResponse } = require("@/helpers");
const { default: mongoose } = require("mongoose");

const paginatedList = async (User, req, res) => {
  const Block = mongoose.model('Block');
  const userData = await User.findOne({ _id: req.user._id, removed: false });
  if (!userData) {
    return sendResponse(res, 400, false, null, 'User not found.');
  }

  // Default values for pagination and query parameters
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.items) || 12;
  const skip = (page - 1) * limit;  // Calculate skip based on page and limit
  const userGender = userData.gender;

  // Extract sorting and filtering parameters from query
  const { sortBy = '_id', sortValue = -1, filter, equal } = req.query;
  const searchQuery = req.query.q || '';
  const searchCountry = req.query.country ? req.query.country.split(',') : [];
  const searchCity = req.query.city ? req.query.city.split(',') : [];
  const startAge = req.query.startAge || '';
  const endAge = req.query.endAge || '';
  const name = req.query.searchName || '';
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

  const currentYear = new Date().getFullYear();

  // Calculate date range based on provided age range
  const minDOB = endAge ? new Date(currentYear - parseInt(endAge), 0, 1) : null;  // Oldest person
  const maxDOB = startAge ? new Date(currentYear - parseInt(startAge), 11, 31) : null; // Youngest person

  let searchBanner = false;

  if (name || searchCountry.length > 0 || searchCity.length > 0 || (minDOB && maxDOB)) {
    const queryHaveSearchData = {
      role: 'user',
      removed: false,
      enabled: true,
      isProfileComplete: true,
      gender: userGender == 'male' ? 'female' : 'male',
      ...(filter && equal && { [filter]: equal }),  // Conditionally add filter if provided
      ...(name && { name: { $regex: new RegExp(name, 'i') } }),
      ...fieldsFilter,  // Add search fields filter if applicable
      ...(searchCountry.length > 0 && { country: { $in: searchCountry } }),  // Filter by country
      ...(searchCity.length > 0 && { city: { $in: searchCity } }),  // Filter by city
      ...(minDOB && maxDOB && { dob: { $gte: minDOB, $lte: maxDOB } }), // Filter by DOB range
      ...(userData.gender === 'male' && { isVerified: 'verified' })  // Add isVerified if gender is female
    };

    const haveSearchData = await User.countDocuments(queryHaveSearchData);
    if (haveSearchData == 0) {
      searchBanner = true;
    }
  }

  const blockUsers = await Block.find({ user: req.user._id, removed: false });
  const blockedUserIds = blockUsers.map(b => b.blockedUser.toString()); // Convert to strings for consistency

  const query = {
    role: 'user',
    removed: false,
    enabled: true,
    isProfileComplete: true,
    gender: userGender == 'male' ? 'female' : 'male',
    _id: { $nin: blockedUserIds.map(id => new mongoose.Types.ObjectId(id)) },
    ...(filter && equal && { [filter]: equal }),  // Conditionally add filter if provided
    ...(!searchBanner && name && { name: { $regex: new RegExp(name, 'i') } }),
    ...fieldsFilter,  // Add search fields filter if applicable
    ...(!searchBanner && searchCountry.length > 0 && { country: { $in: searchCountry } }),  // Filter by country
    ...(!searchBanner && searchCity.length > 0 && { city: { $in: searchCity } }),  // Filter by city
    ...(!searchBanner && minDOB && maxDOB && { dob: { $gte: minDOB, $lte: maxDOB } }), // Filter by DOB range
    ...(userData.gender === 'male' && { isVerified: 'verified' })  // Add isVerified if gender is female
  };

  const queryForCountry = {
    role: 'user',
    removed: false,
    enabled: true,
    isProfileComplete: true,
    gender: userGender == 'male' ? 'female' : 'male',
    ...(userData.gender === 'male' && { isVerified: 'verified' })  // Add isVerified if gender is female
  };

  // Modify sorting logic to prioritize `isPlanPurchase: true`
  const sortQueryMale = {
    video: -1,
    is_online: -1,
    last_seen: -1,
    [sortBy]: sortValue // Then apply user-defined sorting
  };

  const sortQueryFemale = {
    ...(page == 1 && { isPlanPurchase: -1 }),
    is_online: -1,
    last_seen: -1,
    [sortBy]: sortValue // Then apply user-defined sorting
  };

  let results;

  if (userGender == 'female') {

    results = await User.aggregate([
      { $match: query }, // Apply filters before joining

      {
        $lookup: {
          from: "favourites",
          let: { userId: "$_id" }, // Define user ID for filtering
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$favouriteUser", "$$userId"] }, // Match favouriteUser with user ID
                    { $eq: ["$removed", false] }, // Match favouriteUser with user ID
                    { $eq: ["$user", new mongoose.Types.ObjectId(req.user._id)] }, // Match user field with logged-in user ID
                  ],
                },
              },
            },
            { $project: { _id: 0, user: 1 } }, // Keep only required fields
          ],
          as: "favouriteData",
        },
      },

      {
        $addFields: {
          favouriteUsers: {
            $map: {
              input: "$favouriteData",
              as: "fav",
              in: "$$fav.user",
            },
          },
        },
      },

      {
        $addFields: {
          isFavourite: {
            $in: [new mongoose.Types.ObjectId(req.user._id), "$favouriteUsers"], // Check if user is in favourites
          },
        },
      },

      { $project: { favouriteData: 0, favouriteUsers: 0 } }, // Remove unnecessary fields

      { $sort: sortQueryFemale },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
    ]);

  } else {

    results = await User.aggregate([
      { $match: query }, // Apply filters before joining

      {
        $lookup: {
          from: "favourites",
          let: { userId: "$_id" }, // Define user ID for filtering
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$favouriteUser", "$$userId"] }, // Match favouriteUser with user ID
                    { $eq: ["$removed", false] },
                    { $eq: ["$user", new mongoose.Types.ObjectId(req.user._id)] }, // Match user field with logged-in user ID
                  ],
                },
              },
            },
            { $project: { _id: 0, user: 1 } }, // Keep only required fields
          ],
          as: "favouriteData",
        },
      },

      {
        $addFields: {
          favouriteUsers: {
            $map: {
              input: "$favouriteData",
              as: "fav",
              in: "$$fav.user",
            },
          },
        },
      },

      {
        $addFields: {
          isFavourite: {
            $in: [new mongoose.Types.ObjectId(req.user._id), "$favouriteUsers"], // Check if user is in favourites
          },
        },
      },

      { $project: { favouriteData: 0, favouriteUsers: 0 } }, // Remove unnecessary fields

      { $sort: sortQueryMale },
      { $skip: parseInt(skip) },
      { $limit: parseInt(limit) },
    ]);

  }


  // Promise to count the total documents matching the query
  const countPromise = User.countDocuments(query);

  // Resolve both promises concurrently
  const [count] = await Promise.all([countPromise]);

  // Calculate total pages
  const totalPages = Math.ceil(count / limit);

  const userCountry = await User.aggregate([
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

  // Prepare pagination info
  const pagination = { page, totalPages, count, userCountry: userCountry[0], searchBanner };


  // Return success response with data
  return sendResponse(res, 200, true, results, count > 0 ? 'Successfully found all documents' : 'Collection is empty', pagination);
};

module.exports = paginatedList;
