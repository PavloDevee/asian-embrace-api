const { sendResponse } = require('@/helpers');
const mongoose = require('mongoose');

const adminSidebarData = async (userModel, req, res) => {

  const Contactus = mongoose.model('Contactus');
  const Report = mongoose.model('Report');

  // Counting the total documents
  const countContactPromise = Contactus.countDocuments({
    removed: false,
    isRead: false
  });

  const countReportPromise = Report.countDocuments({
    removed: false,
    isRead: false
  });
  // Resolving both promises
  const [contactCount, reportCount] = await Promise.all([countContactPromise, countReportPromise]);

  const result = {
    reportCount,
    contactCount
  }

  return sendResponse(res, 200, true, result, "Successfully found all documents");

};

module.exports = adminSidebarData;
