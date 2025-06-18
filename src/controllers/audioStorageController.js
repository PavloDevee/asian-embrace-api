const { uploadAudioToSupabase } = require("../helpers/audioUploadHelper");

async function handleAudioUpload(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No audio file provided.",
      });
    }

    // Validate file type
    const allowedMimeTypes = [
      "audio/webm",
      "audio/mp3",
      "audio/mpeg",
      "audio/wav",
      "audio/ogg",
      "audio/m4a",
      "audio/aac",
    ];

    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid audio file type. Supported formats: webm, mp3, wav, ogg, m4a, aac",
      });
    }

    // Validate file size (max 10MB for audio)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (req.file.size > maxSize) {
      return res.status(400).json({
        success: false,
        message: "Audio file too large. Maximum size is 10MB.",
      });
    }

    const uploadedAudioData = await uploadAudioToSupabase(req.file);

    return res.status(200).json({
      success: true,
      message: "Audio uploaded successfully.",
      data: {
        audioUrl: uploadedAudioData.publicUrl,
        fileName: uploadedAudioData.fileName,
        bucket: uploadedAudioData.bucket,
      },
    });
  } catch (error) {
    console.error("Audio upload controller error:", error.message);

    if (
      error.message.includes("Supabase client not initialized") ||
      error.message.includes("Supabase bucket name not configured")
    ) {
      return res.status(500).json({
        success: false,
        message: "Server configuration error for audio uploads.",
      });
    }

    if (error.message.startsWith("Upload failed: Audio bucket named")) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error.message === "Failed to retrieve public URL for the uploaded audio."
    ) {
      return res.status(500).json({
        success: false,
        message: "Audio uploaded but could not retrieve URL.",
      });
    }

    return res.status(500).json({
      success: false,
      message:
        error.message || "An unexpected error occurred during audio upload.",
    });
  }
}

module.exports = {
  handleAudioUpload,
};
