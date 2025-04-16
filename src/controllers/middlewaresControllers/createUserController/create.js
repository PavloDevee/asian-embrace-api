const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generate: uniqueId } = require('shortid');
const schema = require('./schemaValidate');
const sendMail = require('../../../sendMail');
const jwt = require('jsonwebtoken');
const { sendResponse } = require('@/helpers');

const create = async (userModel, req, res) => {
	const User = mongoose.model(userModel);
	const UserPassword = mongoose.model(userModel + 'Password');

	let body = req.body;
	const { error, value } = schema.validate(body);
	if (error) {
		const { details } = error;
		return sendResponse(res, 400, false, null, details[0]?.message);
	}
	let { email, password, name, gender, dob, referralCode, type } = value;


	const existingUser = await User.findOne({
		email: email,
		removed: false
	});

	if (existingUser) {
		if (existingUser.emailVerified) {
			return sendResponse(res, 400, false, null, 'An account with this email already exists');
		} else {
			await User.deleteOne({ _id: existingUser._id }).exec();
			await UserPassword.deleteOne({ user: existingUser._id }).exec();
		}
	}

	// Generate a random 6-digit number
	const generateRandomOTP = () => {
		const min = 10000;
		const max = 99999;
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// Usage
	const otp = generateRandomOTP();

	let insertData;

	if (type && type == 'google') {
		insertData = {
			email,
			name,
			role: 'user',
			gender,
			dob,
			referralCode,
			emailVerified: true
		};
	} else {
		insertData = {
			email,
			name,
			role: 'user',
			gender,
			dob,
			referralCode,
			emailToken: otp,
			emailVerified: false,
		};
	}

	const result = await new User(insertData).save();

	if (!result) {
		return sendResponse(res, 500, false, null, "document couldn't save correctly");
	}

	if (type && type == 'google') {

		let token = jwt.sign(
			{
				id: result._id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: '8760h' }
		);

		const UserPasswordData = {
			password: '',
			salt: '',
			user: result._id,
			loginAt: new Date(),
			isSendLoginReminder: false
		};
		const resultPassword = await new UserPassword(UserPasswordData).save();

		if (!resultPassword) {
			await User.deleteOne({ _id: result._id }).exec();

			return res.status(200).json({
				success: false,
				result: null,
				message: "document couldn't save correctly",
			});
		}

		const resultData = {
			_id: result._id,
			enabled: result.enabled,
			email: result.email,
			name: result.name,
			gender: result.gender,
			token: token
		}

		return sendResponse(res, 200, true, resultData, "Register successfully");

	} else {

		const salt = uniqueId();
		const passwordHash = bcrypt.hashSync(salt + password);
		const UserPasswordData = {
			password: passwordHash,
			salt: salt,
			user: result._id
		};
		const resultPassword = await new UserPassword(UserPasswordData).save();

		if (!resultPassword) {
			await User.deleteOne({ _id: result._id }).exec();
			return sendResponse(res, 500, false, null, "document couldn't save correctly");
		}

		await sendMail({
			email,
			name: result.name,
			otp: otp,
			subject: 'Confirm Your Email',
			type: 'emailVerification',
		});

		const resultData = {
			_id: result._id
		}

		return sendResponse(res, 200, true, resultData, "Register successfully");

	}
};
module.exports = create;
