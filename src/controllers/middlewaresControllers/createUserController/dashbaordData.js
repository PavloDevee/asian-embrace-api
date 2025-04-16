const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const dashbaordData = async (userModel, req, res) => {

  const User = mongoose.model(userModel);
  const Contactus = mongoose.model('Contactus');

  // Counting the total documents
  const countUserPromise = User.countDocuments({
    removed: false,
    role: 'user'
  });

  // Counting the total documents
  const countContactPromise = Contactus.countDocuments({
    removed: false
  });
  // Resolving both promises
  const [contactCount, userCount] = await Promise.all([countContactPromise, countUserPromise]);

  const result = {
    userCount,
    contactCount
  }

  return sendResponse(res, 200, true, result, "Successfully found all documents");

};

module.exports = dashbaordData;
