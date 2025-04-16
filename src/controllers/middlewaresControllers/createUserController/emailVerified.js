const mongoose = require('mongoose');
const sendMail = require('../../../sendMail');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

const emailVerified = async (userModel, req, res) => {
    // console.log("qqqqqqqqqqqqqqqqqq", req.body);
    // const UserPassword = mongoose.model(userModel + 'Password');
    const User = mongoose.model(userModel);
    const { userId, otp } = req.body;

    // const databasePassword = await UserPassword.findOne({ user: userId, removed: false });
    const user = await User.findOne({ _id: userId, removed: false }).exec();

    if (!user.enabled)
        return res.status(409).json({
            success: false,
            result: null,
            message: 'Your account is disabled, contact your account adminstrator',
        });

    if (!user)
        return res.status(404).json({
            success: false,
            result: null,
            message: 'No account with this email has been registered.',
        });


    const isMatch = otp === user.emailToken;
    if (!isMatch || user.emailToken === undefined || user.emailToken === null)
        return res.status(403).json({
            success: false,
            result: null,
            message: 'Invalid Code. Please try again',
        });


    // validate
    const objectSchema = Joi.object({
        userId: Joi.string().required(),
        otp: Joi.string().required(),
    });

    const { error, value } = objectSchema.validate({ userId, otp });
    if (error) {
        return res.status(409).json({
            success: false,
            result: null,
            error: error,
            message: 'Invalid email valid object',
            errorMessage: error.message,
        });
    }

    const UserPasswordData = {
        emailToken: '',
        emailVerified: true,
    };

    await User.findOneAndUpdate({ _id: user._id }, UserPasswordData, { new: true, upsert: true });

    if (user.gender == 'female') {
        await sendMail({
            email: user.email,
            name: user.name,
            otp: otp,
            subject: 'Welcome to Asian Embrace!',
            type: 'welcomeEmailFemale',
        });
    } else {
        await sendMail({
            email: user.email,
            name: user.name,
            otp: otp,
            subject: 'Welcome to Asian Embrace!',
            type: 'welcomeEmail',
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: req.body.remember ? '8760h' : '8760h' }
    );

    // await UserPasswordModel.findOneAndUpdate(
    //     { user: user._id },
    //     { $push: { loggedSessions: token } },
    //     {
    //         new: true,
    //     }
    // ).exec();

    const result = {
        _id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
        photo: user.photo,
        gender: user.gender,
        token: token
    }

    return res
        .status(200).json({
            success: true,
            result,
            message: 'Successfully verifed user',
        });
};
module.exports = emailVerified;

