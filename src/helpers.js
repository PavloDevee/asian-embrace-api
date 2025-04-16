// FS is a built in module to node that let's us read files from the system we're running on
const fs = require('fs');
const mongoose = require('mongoose');
// moment.js is a handy library for displaying dates. We need this in our templates to display things like "Posted 5 minutes ago"
exports.moment = require('moment');
// Making a static map is really long - this is a handy helper function to make one

// inserting an SVG
exports.icon = (name) => {
	try {
		return fs.readFileSync(`./public/images/icons/${name}.svg`);
	} catch (error) {
		return null;
	}
};

exports.image = (name) => fs.readFileSync(`./public/images/photos/${name}.jpg`);

// Some details about the site
exports.siteName = `Express.js / MongoBD / Rest Api`;

exports.timeRange = (start, end, format, interval) => {
	if (format == undefined) {
		format = 'HH:mm';
	}

	if (interval == undefined) {
		interval = 60;
	}
	interval = interval > 0 ? interval : 60;

	const range = [];
	while (moment(start).isBefore(moment(end))) {
		range.push(moment(start).format(format));
		start = moment(start).add(interval, 'minutes');
	}
	return range;
};

exports.sendResponse = (res, statusCode, success, result = null, message = '', pagination = null) => {
	if (pagination) {
		return res.status(statusCode).json({ success, result, message, pagination });
	} else {
		return res.status(statusCode).json({ success, result, message });
	}
};

exports.notification = async (type, sendBy = "", receivedBy = "") => {
	try {
	  const Notification = mongoose.model("Notification");
	  const User = mongoose.model('User');
	  const actionData = await User.findOne({
		_id: sendBy
	}).exec();
	
	  let message = '';
		switch (type) {
			case 'rose':
				message = `${actionData.name} sent you a Rose 🌹.`;
				break;
			case 'view':
				message = `${actionData.name} has been viewed your profile 👀.`;
				break;
			case 'rejected':
				message = `${actionData.name} reject your request.`;
				break;
			case 'like':
				message = `${actionData.name} liked your post.`;
				break;
			case 'createUser':
				message = `Hi ${actionData.name}! We're excited to have you here. Start matching and find your perfect connection today! 😊💌`
				break;
			case 'chat':
				message = actionData.message
				break;
			case 'commentLike':
				message = `${actionData.name} liked your comment '${commentMessage}'.`;
				break;
			case 'dislike':
				message = `${actionData.name} liked your post.`;
				break;
			case 'comment':
				message = `${actionData.name} commented on your post.`;
				break;
			case 'eventInterest':
				message = `${actionData.name} show interest on your event.`;
				break;
			default:
				message = 'Notification received.';
		}

	  const newNotification = new Notification({
		type,
		sendBy,
		receivedBy,
		message,
	  });
  
	  await newNotification.save();
	  console.log("Notification saved successfully.");
	  return newNotification;
	} catch (err) {
	  console.error("Error saving notification:", err);
	}
  };
