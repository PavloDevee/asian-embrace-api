const express = require('express');

const router = express.Router();

const { catchErrors } = require('@/handlers/errorHandlers');
const adminAuth = require('@/controllers/coreControllers/adminAuth');

router.route('/login').post(catchErrors(adminAuth.login));

router.route('/forgetpassword').post(catchErrors(adminAuth.forgetPassword));
router.route('/resetpassword').post(catchErrors(adminAuth.resetPassword));
router.route('/check-otp').post(catchErrors(adminAuth.checkOtp));

router.route('/logout').get(adminAuth.isValidAuthToken, catchErrors(adminAuth.logout));

module.exports = router;
