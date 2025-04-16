const { sendResponse } = require('@/helpers');
const sendMail = require('@/sendMail');
const mongoose = require('mongoose');

const profileVerified = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  const status = req.query.verified;

  let updates = {
    isVerified: status
  };
  // Find the document by id and delete it
  const result = await User.findOneAndUpdate(
    { _id: req.params.id },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();
  console.log("result", result);

  // If no results found, return document not found
  if (!result) {
    return sendResponse(res, 200, true, null, "No document found");
  } else {
    if (status == 'unverified') {
      await sendMail({
        email: result.email,
        name: result.name,
        subject: 'Verification Unsuccessful!',
        type: 'profileUnverified',
      });
    } else {
      await sendMail({
        email: result.email,
        name: result.name,
        subject: 'Verification Successful on Asian Embrace',
        type: 'profileVerified',
      });
    }
    return sendResponse(res, 200, true, result, `Profile ${status} successfully`);
  }
};

module.exports = profileVerified;
