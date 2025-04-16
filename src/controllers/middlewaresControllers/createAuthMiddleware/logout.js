const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const logout = async (req, res, { userModel }) => {
  const Admin = mongoose.model(userModel);

  await Admin.findOneAndUpdate(
    { _id: req.user._id },
    { deviceToken: "" },
    {
      new: true,
    }
  ).exec();

  return sendResponse(res, 200, true, null, 'Logout successfully');
};

module.exports = logout;
