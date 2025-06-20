const express = require("express");
const { catchErrors } = require("@/handlers/errorHandlers");
const router = express.Router();
const multer = require("multer");
const adminController = require("@/controllers/coreControllers/adminController");
const contactUsController = require("@/controllers/appControllers/contactUsController");
const pageContentController = require("@/controllers/appControllers/pageContentController");
const blogController = require("@/controllers/appControllers/blogController");
const favouriteController = require("@/controllers/appControllers/favouriteController");
const webController = require("@/controllers/appControllers/webController");
const {
  singleStorageUpload,
  doubleStorageUpload,
  ProfileImages,
} = require("@/middlewares/uploadMiddleware");
const adminAuth = require("@/controllers/coreControllers/adminAuth");
const blockController = require("@/controllers/appControllers/blockController");
const reportController = require("@/controllers/appControllers/reportController");
const roseController = require("@/controllers/appControllers/roseController");
const notificationController = require("@/controllers/appControllers/notificationController");
const interestController = require("@/controllers/appControllers/interestController");
const userSubscriptionController = require("@/controllers/appControllers/userSubscriptionController");
const planController = require("@/controllers/appControllers/planController");
const chatController = require("@/controllers/chatController");
const { handleImageUpload } = require("@/controllers/imageStorageController");
const { handleAudioUpload } = require("@/controllers/audioStorageController");

// Image Storage Configuration
const storage = multer.memoryStorage();
const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images."), false);
  }
};

// Media File Filter for chat attachments (images, videos, audio)
const mediaFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/avif",
    "video/mp4",
    "video/webm",
    "video/quicktime",
    "video/x-msvideo",
    "audio/webm",
    "audio/mp3",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    "audio/aac",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type for chat attachment."), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit for uploads
  },
});

const uploadMedia = multer({
  storage: storage,
  fileFilter: mediaFileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50 MB limit for media files
  },
});

// Audio Storage Configuration
const audioFileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "audio/webm",
    "audio/mp3",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
    "audio/m4a",
    "audio/aac",
  ];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Not an audio file! Please upload only audio files."), false);
  }
};
const audioUpload = multer({
  storage: storage,
  fileFilter: audioFileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB limit for audio uploads
  },
});

// //_______________________________ User management_______________________________

router.route("/user").post(catchErrors(adminController.create));
router
  .route("/admin/profile/update")
  .patch(
    adminAuth.isValidAuthToken,
    catchErrors(adminController.updateAdminProfile)
  );
router.route("/user/delete/:id").delete(catchErrors(adminController.delete));
router
  .route("/user/read/:id")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.read));
router
  .route("/user/match-password/:password")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.passwordMatch));
router.route("/user/resend-otp").post(catchErrors(adminController.resendOtp));
router
  .route("/user/resend-otp-email")
  .post(catchErrors(adminController.resendEmailOtp));
router
  .route("/user/email-verify")
  .post(catchErrors(adminController.emailVerified));
router
  .route("/user")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.read));
router
  .route("/user/listAll")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.listAll));
router.route("/user/upload-verify-image").patch(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "verify-image",
    fieldName: "file",
    fileType: "image",
  }),
  catchErrors(adminController.addVerifyImage)
);

router
  .route("/user/discover-list")
  .get(adminAuth.isValidAuthToken, catchErrors(webController.discoverList));
router
  .route("/user/complete-profile")
  .patch(
    adminAuth.isValidAuthToken,
    catchErrors(adminController.completeProfile)
  );
router
  .route("/user")
  .patch(adminAuth.isValidAuthToken, catchErrors(adminController.update));
router
  .route("/user/profile-verified/:id")
  .get(
    adminAuth.isValidAuthToken,
    catchErrors(adminController.profileVerified)
  );
router.route("/user/upload-photo").patch(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "user-image",
    fieldName: "file",
    fileType: "image",
  }),
  catchErrors(adminController.uploadPhoto)
);

router.route("/user/upload-images").patch(
  adminAuth.isValidAuthToken,
  ProfileImages({
    entity: "user-image",
    fieldName1: "images",
    fieldName2: "video",
  }),
  catchErrors(adminController.uploadImages)
);
router
  .route("/user/change-image")
  .patch(adminAuth.isValidAuthToken, catchErrors(adminController.changeImage));
router
  .route("/user/get/:conversation_id")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.getUser));
router
  .route("/user/delete-image")
  .patch(adminAuth.isValidAuthToken, catchErrors(adminController.deleteImage));

router
  .route("/user/change-password")
  .patch(
    adminAuth.isValidAuthToken,
    catchErrors(adminController.updatePassword)
  );
router
  .route("/user/change-email")
  .patch(adminAuth.isValidAuthToken, catchErrors(adminController.updateEmail));

// //_______________________________ Contact management_______________________________

router.route("/contact-us").post(catchErrors(contactUsController.create));
router.route("/contact-us").get(catchErrors(contactUsController.list));
router
  .route("/contact-us")
  .patch(adminAuth.isValidAuthToken, catchErrors(contactUsController.update));

// //_______________________________ Plan purchase management_______________________________

router
  .route("/user/plan-purchase")
  .post(
    adminAuth.isValidAuthToken,
    catchErrors(userSubscriptionController.create)
  );
router
  .route("/user/plan-purchase/:userId")
  .get(
    adminAuth.isValidAuthToken,
    catchErrors(userSubscriptionController.read)
  );
router
  .route("/user/plan-purchase")
  .delete(
    adminAuth.isValidAuthToken,
    catchErrors(userSubscriptionController.remove)
  );

// //_______________________________ Favourite management_______________________________

router
  .route("/user/favourite")
  .post(adminAuth.isValidAuthToken, catchErrors(favouriteController.create));
router
  .route("/user/favourite")
  .get(adminAuth.isValidAuthToken, catchErrors(favouriteController.list));

// //_______________________________ Notification management_______________________________

router
  .route("/user/notification")
  .get(adminAuth.isValidAuthToken, catchErrors(notificationController.list));
router
  .route("/user/notification-count")
  .get(
    adminAuth.isValidAuthToken,
    catchErrors(notificationController.notificationCount)
  );
router
  .route("/user/notification-read")
  .get(adminAuth.isValidAuthToken, catchErrors(notificationController.readAll));
router
  .route("/user/notification-read/:id")
  .get(adminAuth.isValidAuthToken, catchErrors(notificationController.readAll));

// //_______________________________ Interest management_______________________________

router.route("/interest").get(catchErrors(interestController.list));

// //_______________________________ Block management_______________________________

router
  .route("/user/block")
  .post(adminAuth.isValidAuthToken, catchErrors(blockController.create));
router
  .route("/user/block")
  .get(adminAuth.isValidAuthToken, catchErrors(blockController.list));
router
  .route("/user/block-list")
  .get(
    adminAuth.isValidAuthToken,
    catchErrors(blockController.blockedUserList)
  );

// //_______________________________ Report management_______________________________

router
  .route("/user/report")
  .post(adminAuth.isValidAuthToken, catchErrors(reportController.create));
router
  .route("/user/report")
  .get(adminAuth.isValidAuthToken, catchErrors(reportController.list));
router
  .route("/user/report")
  .patch(adminAuth.isValidAuthToken, catchErrors(reportController.update));

// //_______________________________ Rose management_______________________________

router
  .route("/user/rose")
  .post(adminAuth.isValidAuthToken, catchErrors(roseController.create));
// router.route('/user/favourite/list').get(adminAuth.isValidAuthToken, catchErrors(favouriteController.list));

//___________________________________ Admin management _______________________________

// router.route('/admin/update/:id').patch(
//   singleStorageUpload({ entity: 'admin', fieldName: 'file', fileType: 'image' }),
//   catchErrors(adminController.update)
// );
router
  .route("/admin/list")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.list));
router.route("/admin/profile").get(catchErrors(adminController.profile));
router
  .route("/admin/status/:id")
  .patch(adminAuth.isValidAuthToken, catchErrors(adminController.status));

router
  .route("/admin/profile/password")
  .patch(catchErrors(adminController.updateProfilePassword));

// //_______________________________ Page content management_______________________________

router.route("/page-content").post(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "content-image",
    fieldName: "bannerImage",
    fileType: "image",
  }),
  catchErrors(pageContentController.create)
);
router.route("/page-content").patch(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "content-image",
    fieldName: "bannerImage",
    fileType: "image",
  }),
  catchErrors(pageContentController.update)
);
router
  .route("/page-content")
  .get(adminAuth.isValidAuthToken, catchErrors(pageContentController.list));
router.route("/page-content/:id").get(catchErrors(pageContentController.read));
router
  .route("/page-content/read/:slug")
  .get(catchErrors(pageContentController.read));

// //_______________________________ Blog management_______________________________

router.route("/blog").post(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "blog-images",
    fieldName: "bannerImage",
    fileType: "image",
  }),
  catchErrors(blogController.create)
);
router.route("/blog").patch(
  adminAuth.isValidAuthToken,
  singleStorageUpload({
    entity: "blog-images",
    fieldName: "bannerImage",
    fileType: "image",
  }),
  catchErrors(blogController.update)
);
router.route("/blog").get(catchErrors(blogController.list));
router.route("/blog/:id").get(catchErrors(blogController.read));
router
  .route("/blog/:id")
  .delete(adminAuth.isValidAuthToken, catchErrors(blogController.delete));
router.route("/blog/read/:slug").get(catchErrors(blogController.read));

router.route("/get-token").post(catchErrors(chatController.getToken));

// //_______________________________ Chat attachment_________________________________________

router.route("/chat/attachment").post(
  adminAuth.isValidAuthToken,
  uploadMedia.single("file"), // Use media multer configuration for Supabase uploads
  catchErrors(chatController.upload)
);
router
  .route("/chat/attachment/:recipientId")
  .get(adminAuth.isValidAuthToken, catchErrors(chatController.getAttachment));
router
  .route("/chat/attachment")
  .delete(adminAuth.isValidAuthToken, catchErrors(chatController.delete));

router
  .route("/user/send-waitlist-mail")
  .post(catchErrors(adminController.sendWaitlistMail));

// //_______________________________ Plan management_______________________________

router.route("/plan-details").get(catchErrors(planController.getPlan));

// //_________________________________ Admin Dashboard ________________________________

router
  .route("/admin/dashboard")
  .get(adminAuth.isValidAuthToken, catchErrors(adminController.dashbaordData));
router
  .route("/admin/sidebar")
  .get(
    adminAuth.isValidAuthToken,
    catchErrors(adminController.adminSidebarData)
  );

// //_______________________________ Image Storage Routes _______________________________

router.post(
  "/storage/upload",
  upload.single("imageFile"),
  catchErrors(handleImageUpload)
);

// //_______________________________ Audio Storage Routes _______________________________

router.post(
  "/storage/audio-upload",
  audioUpload.single("audioFile"),
  catchErrors(handleAudioUpload)
);

// Middleware to handle multer errors specifically
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "File is too large. Maximum size is 10MB.",
      });
    }
    return res
      .status(400)
      .json({ success: false, message: `File upload error: ${error.message}` });
  } else if (error) {
    if (error.message === "Not an image! Please upload only images.") {
      return res.status(400).json({ success: false, message: error.message });
    }
    if (
      error.message === "Not an audio file! Please upload only audio files."
    ) {
      return res.status(400).json({ success: false, message: error.message });
    }
    console.error("Unhandled error in storage route:", error);
    return res
      .status(500)
      .json({ success: false, message: "An unexpected error occurred." });
  }
  next();
});

module.exports = router;
