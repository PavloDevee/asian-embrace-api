const mongoose = require('mongoose');
const sendMail = require('../../../sendMail');
const { sendResponse } = require('@/helpers');

const resendEmailOtp = async (userModel, req, res) => {
	const User = mongoose.model(userModel);
	// const UserPassword = mongoose.model(userModel + 'Password');

	const existingUser = await User.findOne({
		_id: req.body.userId,
	});

	if (existingUser) {
		// Generate a random 6-digit number
		const generateRandomOTP = () => {
			const min = 10000;
			const max = 99999;
			return Math.floor(Math.random() * (max - min + 1)) + min;
		};

		// Usage
		const otp = generateRandomOTP();

		const UserPasswordData = {
			emailToken: otp
		};

		await User.findOneAndUpdate({ _id: req.body.userId }, UserPasswordData, { new: true, upsert: true });

		await sendMail({
			email: existingUser.email,
			name: existingUser.name,
			otp: otp,
			subject: 'Email verification',
			type: 'emailVerification',
		});

		const result = {
			_id: existingUser._id,
			enabled: existingUser.enabled,
			email: existingUser.email,
			name: existingUser.name
		}

		return sendResponse(res, 200, true, result, "Email verification sent");
	} else {
		return sendResponse(res, 404, false, null, "An account with this email not found.");
	}

};
module.exports = resendEmailOtp;
