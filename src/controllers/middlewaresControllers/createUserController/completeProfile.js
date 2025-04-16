const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generate: uniqueId } = require('shortid');
const { sendResponse } = require('@/helpers');
// const schema = require('./schemaValidateUpdate');

const completeProfile = async (userModel, req, res) => {
  const User = mongoose.model(userModel);
  let body = req.body;
  console.log("body", body);
  
  if(!body.step){
    return sendResponse(res, 404, false, null, 'Step is required');
  }

  let updates;

  if (body.step === 1) {
    updates = {
      country: body.country,
      city: body.city
    }
  } else if (body.step === 2) {
    updates = {
      headLine: body.headLine
    }
  } else if (body.step === 3) {
    updates = {
      describesAnimalType: body.describesAnimalType
    }
  } else if (body.step === 4) {
    updates = {
      weight: body.weight,
      height: body.height,
      isProfileComplete: true
    }
  }

  // let { email, password, name, countryCode, gender, dob, phoneNumber, address, lat, long, photo, otherGender } = value;
  // if (photo) {
  //   updates = {
  //     email,
  //     name,
  //     countryCode,
  //     gender,
  //     otherGender,
  //     dob,
  //     phoneNumber,
  //     photo
  //   }
  // } else {
  //   updates = {
  //     email,
  //     name,
  //     countryCode,
  //     gender,
  //     otherGender,
  //     dob,
  //     phoneNumber
  //   }
  // }
  // if (address) updates.address = address;
  // if (lat && long) updates.location = { type: 'Point', coordinates: [long, lat] };
  // Find document by id and updates with the required fields

  console.log("updates", updates);

  const result = await User.findOneAndUpdate(
    { _id: req.user._id, removed: false },
    { $set: updates },
    {
      new: true, // return the new result instead of the old one
    }
  ).exec();

  if (!result) {
    return sendResponse(res, 404, false, null, 'No profile found by this id: ' + req.user._id);
  }

  const resultData = {
    _id: result?._id,
    enabled: result?.enabled,
    email: result?.email,
    name: result?.name,
    photo: result?.photo
  }

  return sendResponse(res, 200, true, resultData, 'we update this profile');
};

module.exports = completeProfile;
