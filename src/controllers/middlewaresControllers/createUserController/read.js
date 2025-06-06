const { sendResponse, notification } = require('@/helpers');
const { formatUserDataForResponse } = require('@/helpers/unitConversions');
const mongoose = require('mongoose');

const read = async (userModel, req, res) => {

  const User = mongoose.model(userModel);
  const Favourite = mongoose.model('Favourite');
  const ViewProfile = mongoose.model('ViewProfile');
  // const UserPassword = mongoose.model(userModel + 'Password');
  let isFavourite = false;

  if (req.params.id) {
    const favouriteRecord = await Favourite.findOne({
      user: req.user._id,
      favouriteUser: req.params.id,
      removed: false,
    }).exec();

    isFavourite = !!favouriteRecord; // Convert to boolean

    let client = await ViewProfile.findOne({
      user: req.params.id,
      viewBy: req.user._id,
      removed: false,
    });

    if (!client) {
      await new ViewProfile({
        user: req.params.id,
        viewBy: req.user._id
      }).save();
      // Add Notification
      await notification("view", req.user._id, req.params.id);
    }
  }

  // Find document by id
  const tmpResult = await User.findOne({
    _id: req.params.id ? req.params.id : req.user._id,
    removed: false,
  }).exec();
  // If no results found, return document not found
  if (!tmpResult) {
    return sendResponse(res, 404, false, null, "No document found");
  } else {
    // Get the viewer's (logged-in user's) preferred units
    const viewer = await User.findById(req.user._id).select('preferredUnits').exec();
    const viewerPreferredUnits = viewer?.preferredUnits || 'metric';
    
    // Format the response data using viewer's preferred units
    const userData = tmpResult.toObject();
    const formattedData = formatUserDataForResponse(userData, viewerPreferredUnits);
    
    return sendResponse(res, 200, true, { ...formattedData, isFavourite }, "We found this document");
  }
};

module.exports = read;
