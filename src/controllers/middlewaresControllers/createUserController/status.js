const { sendResponse } = require('@/helpers');
const sendMail = require('@/sendMail');
const mongoose = require('mongoose');

const status = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  if (req.query.enabled === 'true' || req.query.enabled === 'false') {
    let updates = {
      enabled: req.query.enabled === 'true' ? true : false,
    };
    // Find the document by id and delete it
    const result = await User.findOneAndUpdate(
      { _id: req.params.id, removed: false },
      { $set: updates },
      {
        new: true, // return the new result instead of the old one
      }
    ).exec();
    // If no results found, return document not found
    if (!result) {
      return sendResponse(res, 404, false, null, "No document found");
    } else {
      if (req.query.enabled == 'false') {
        await sendMail({
          email: result.email,
          name: result.name,
          subject: 'Your Account Has Been Deactivated on Asian Embrace',
          type: 'accountDeactivate',
        });
      }
      return sendResponse(res, 200, true, result, "Status change successfully");
    }
  } else {
    return sendResponse(res, 202, false, null, "couldn't change admin status by this request");
  }
};
module.exports = status;
