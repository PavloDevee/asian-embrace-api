const { sendResponse } = require("@/helpers");
const sendMail = require("@/sendMail");
const mongoose = require('mongoose');
const User = mongoose.model('User');

const remove = async (Model, req, res) => {

  // Find the document by id and delete it
  const result = await Model.findOneAndDelete({
    userId: req.user._id,
  }).exec();

  const user = await User.findByIdAndUpdate(req.user._id, { isPlanPurchase: false });

  await sendMail({
    email: user.email,
    name: user.name,
    subject: 'Your Subscription Has Been Cancelled',
    type: 'planPurchaseCancel',
  });

  return sendResponse(res, 200, true, result, 'Successfully Deleted the document');
};
module.exports = remove;
