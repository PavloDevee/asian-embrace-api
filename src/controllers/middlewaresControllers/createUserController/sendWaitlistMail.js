const sendMail = require('../../../sendMail');
const { sendResponse } = require('@/helpers');

const sendWaitlistMail = async (userModel, req, res) => {

	await sendMail({
		email: 'hello@asianembrace.com',
		name: req.body.name,
		subject: 'Join Wait list',
		type: 'joinWaitlist',
		userEmail: req.body.email
	});

	const result = {}

	return sendResponse(res, 200, true, result, "Mail send successfully");

};
module.exports = sendWaitlistMail;
