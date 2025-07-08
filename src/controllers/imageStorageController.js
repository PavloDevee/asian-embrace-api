const { uploadImageToSupabase } = require("../helpers/imageUploadHelper");
const { uploadVideoToSupabase } = require("../helpers/videoUploadHelper");

async function handleImageUpload(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No image file provided." });
    }

    const uploadedImageData = await uploadImageToSupabase(req.file);

    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      data: {
        imageUrl: uploadedImageData.publicUrl,
        fileName: uploadedImageData.fileName,
      },
    });
  } catch (error) {
    console.error("Image upload controller error:", error.message);
    if (
      error.message.includes("Supabase client not initialized") ||
      error.message.includes("Supabase bucket name not configured")
    ) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Server configuration error for image uploads.",
        });
    }
    if (error.message.startsWith("Upload failed: Bucket named")) {
      return res.status(500).json({ success: false, message: error.message });
    }
    if (
      error.message === "Failed to retrieve public URL for the uploaded image."
    ) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Image uploaded but could not retrieve URL.",
        });
    }
    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message || "An unexpected error occurred during image upload.",
      });
  }
}

async function handleVideoUpload(req, res) {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No video file provided." });
    }
    // Validate file type
    if (!req.file.mimetype.startsWith("video/")) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Not a video! Please upload only video files.",
        });
    }
    // Validate file size (max 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Video file too large. Maximum size is 50MB.",
        });
    }
    const uploadedVideoData = await uploadVideoToSupabase(req.file);
    return res.status(200).json({
      success: true,
      message: "Video uploaded successfully.",
      data: {
        videoUrl: uploadedVideoData.publicUrl,
        fileName: uploadedVideoData.fileName,
        bucket: uploadedVideoData.bucket,
      },
    });
  } catch (error) {
    console.error("Video upload controller error:", error.message);
    return res
      .status(500)
      .json({
        success: false,
        message:
          error.message || "An unexpected error occurred during video upload.",
      });
  }
}

module.exports = { handleImageUpload, handleVideoUpload };
