const create = require("./create");
const read = require("./read");
const update = require("./update");
const updateAdminProfile = require("./updateAdminProfile");
const remove = require("./remove");
const updatePassword = require("./updatePassword");
const updateProfilePassword = require("./updateProfilePassword");
const profile = require("./profile");
const status = require("./status");
const filter = require("./filter");
const listAll = require("./listAll");
const paginatedList = require("./paginatedList");
const resendOtp = require("./resendOtp");
const completeProfile = require("./completeProfile");
const addVerifyImage = require("./addVerifyImage");
const profileVerified = require("./profileVerified");
const photo = require("./photo");
const uploadImages = require("./uploadImages");
const changeImage = require("./changeImage");
const deleteImage = require("./deleteImage");
const updateEmail = require("./updateEmail");
const emailVerified = require("./emailVerified");
const resendEmailOtp = require("./resendEmailOtp");
const sendWaitlistMail = require("./sendWaitlistMail");
const dashbaordData = require("./dashbaordData");
const adminSidebarData = require("./adminSidebarData");
const passwordMatch = require("./passwordMatch");
const getUser = require("./getUser");

const createUserController = (userModel) => {
  let userController = {};

  userController.create = (req, res) => create(userModel, req, res);
  userController.updateAdminProfile = (req, res) =>
    updateAdminProfile(userModel, req, res);
  userController.updatePassword = (req, res) =>
    updatePassword(userModel, req, res);
  userController.updateEmail = (req, res) => updateEmail(userModel, req, res);
  userController.updateProfilePassword = (req, res) =>
    updateProfilePassword(userModel, req, res);
  userController.profile = (req, res) => profile(userModel, req, res);
  userController.read = (req, res) => read(userModel, req, res);
  userController.update = (req, res) => update(userModel, req, res);
  userController.delete = (req, res) => remove(userModel, req, res);
  userController.list = (req, res) => paginatedList(userModel, req, res);
  userController.listAll = (req, res) => listAll(userModel, req, res);
  userController.status = (req, res) => status(userModel, req, res);
  userController.filter = (req, res) => filter(userModel, req, res);
  userController.resendOtp = (req, res) => resendOtp(userModel, req, res);
  userController.resendEmailOtp = (req, res) =>
    resendEmailOtp(userModel, req, res);
  userController.completeProfile = (req, res) =>
    completeProfile(userModel, req, res);
  userController.addVerifyImage = (req, res) =>
    addVerifyImage(userModel, req, res);
  userController.profileVerified = (req, res) =>
    profileVerified(userModel, req, res);
  userController.uploadPhoto = (req, res) => photo(userModel, req, res);
  userController.uploadImages = (req, res) => uploadImages(userModel, req, res);
  userController.changeImage = (req, res) => changeImage(userModel, req, res);
  userController.deleteImage = (req, res) => deleteImage(userModel, req, res);
  userController.emailVerified = (req, res) =>
    emailVerified(userModel, req, res);
  userController.sendWaitlistMail = (req, res) =>
    sendWaitlistMail(userModel, req, res);
  userController.dashbaordData = (req, res) =>
    dashbaordData(userModel, req, res);
  userController.adminSidebarData = (req, res) =>
    adminSidebarData(userModel, req, res);
  userController.passwordMatch = (req, res) =>
    passwordMatch(userModel, req, res);
  userController.getUser = (req, res) => getUser(userModel, req, res);
  return userController;
};

module.exports = createUserController;
