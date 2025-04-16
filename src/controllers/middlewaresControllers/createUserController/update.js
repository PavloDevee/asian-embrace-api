const mongoose = require('mongoose');
const schemaSection1 = require('./schemaValidateSection1');
const { sendResponse } = require('@/helpers');

const update = async (userModel, req, res) => {
  const User = mongoose.model(userModel);

  let body = req.body;

  if (!body.section) {
    return sendResponse(res, 400, false, null, "Update section required");
  }

  let updates = {};

  if (body.section == '1') {

    const section1 = {
      name: body.name, headLine: body.headLine, dob: body.dob, country: body.country, city: body.city
    }
    const { error, value } = schemaSection1.validate(section1);
    if (error) {
      const { details } = error;
      return sendResponse(res, 400, false, null, details[0]?.message);
    }
    let { name, headLine, dob, country, city } = value;

    updates = {
      name,
      headLine,
      dob,
      country,
      city
    }

  } else if (body.section == '2') {
    if (!body.describesAnimalType) {
      return sendResponse(res, 400, false, null, "describesAnimalType is required");
    }
    updates = {
      describesAnimalType: body.describesAnimalType
    }
  } else if (body.section == '3') {
    updates = {
      introduction: body.introduction
    }
  } else if (body.section == '4') {
    if (body.interests.length == 0) {
      return sendResponse(res, 400, false, null, "Interests is required");
    }
    updates = {
      interests: body.interests
    }
  } else if (body.section == '5') {
    updates = {
      weight: body.weight,
      height: body.height,
      relationshipStatus: body.relationshipStatus,
      religion: body.religion,
      children: body.children,
      languages: body.languages,
      lookingFor: body.lookingFor
    }
  }

  // Find document by id and updates with the required fields
  const result = await User.findOneAndUpdate(
    { _id: req.user._id, removed: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  if (!result) {
    return sendResponse(res, 404, false, null, "No document found");
  }

  const resultData = {
    _id: result._id,
    enabled: result.enabled,
    email: result.email,
    name: result.name,
    photo: result.photo,
    role: result.role,
  }

  return sendResponse(res, 200, true, resultData, "we update this document");
};

module.exports = update;
