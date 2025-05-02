const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	removed: {
		type: Boolean,
		default: false,
	},
	enabled: {
		type: Boolean,
		default: true,
	},
	isSendVerifyMail: {
		type: Boolean,
		default: false,
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		required: true,
	},
	name: {
		type: String,
		required: true
	},
	photo: {
		type: String
	},
	country: String,
	city: String,
	role: {
		type: String,
		default: 'user',
		enum: ['admin', 'user'],
	},
	dob: Date,
	gender: {
		type: String,
		enum: ['male', 'female']
	},
	phoneNumber: {
		type: String
	},
	headLine: String,
	describesAnimalType: String,
	height: String,
	weight: String,
	introduction: String,
	interests: [String],
	relationshipStatus: String,
	religion: String,
	children: String,
	lookingFor: String,
	languages: [String],
	images: [String],
	video: String,
	socket_id: {
		type: String,
	},
	is_online: {
		type: Number,
		default: 0,
	},
	last_seen: {
		type: Date,
	},
	isVerified: { type: String, enum: ['pending', 'verified', 'unverified'], default: 'pending' },
	isProfileVerified: { type: Boolean, default: false },
	isProfileComplete: { type: Boolean, default: false },
	isPlanPurchase: { type: Boolean, default: false },
	emailToken: String,
	emailVerified: {
		type: Boolean,
		default: false,
	},
	isDowngradeMailSent: {
		type: Boolean,
		default: false,
	},
	isTrialReminderSent: {
		type: Boolean,
		default: false,
	},
	verifiedImage: String,
	socket_id: {
		type: String,
	},
	is_online: {
		type: Number,
		default: 0,
	},
	last_seen: {
		type: Date,
	},
	created: {
		type: Date,
		default: Date.now,
	},
	updated: {
		type: Date,
		default: Date.now,
	},
});

userSchema.index({ location: "2dsphere" })

module.exports = mongoose.model('User', userSchema);
