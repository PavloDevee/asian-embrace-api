const { sendResponse } = require('@/helpers');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authUser = async (req, res, { user, databasePassword, password, UserModel, UserPasswordModel, type }) => {
  if (type && type == 'google') {
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: req.body.remember ? '8760h' : '8760h' }
    );

    await UserPasswordModel.findOneAndUpdate(
      { user: user._id },
      { $push: { loggedSessions: token } },
      {
        new: true,
      }
    ).exec();

    // if (deviceToken) {
    //   await UserModel.findOneAndUpdate(
    //     { _id: user._id },
    //     { deviceToken },
    //     {
    //       new: true,
    //     }
    //   ).exec();
    // }

    const result = {
      _id: user._id,
      name: user.name,
      role: user.role,
      email: user.email,
      photo: user.photo,
      gender: user.gender,
      token: token
    }

    return sendResponse(res, 200, true, result, 'Successfully login user');

  } else {
    const isMatch = await bcrypt.compare(databasePassword.salt + password, databasePassword.password);

    if (!isMatch)
      return sendResponse(res, 400, false, null, 'Invalid credentials.');

    if (isMatch === true) {
      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: req.body.remember ? '8760h' : '8760h' }
      );

      let updates = {
        loginAt: new Date(),
        isSendLoginReminder: false
      };

      await UserPasswordModel.findOneAndUpdate(
        { user: user._id },
        { $set: updates },
        {
          new: true,
        }
      ).exec();

      const result = {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        photo: user.photo,
        gender: user.gender,
        token: token
      }

      return sendResponse(res, 200, true, result, 'Successfully login user');

    } else {
      return sendResponse(res, 400, false, null, 'Invalid credentials.');
    }
  }
};

module.exports = authUser;
