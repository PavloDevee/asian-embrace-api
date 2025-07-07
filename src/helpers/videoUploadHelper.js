const { supabase } = require("../setup/supabase");
const { v4: uuidv4 } = require("uuid");

const VIDEO_BUCKET_NAME =
  process.env.SUPABASE_VIDEO_BUCKET_NAME || "video-files";

if (!VIDEO_BUCKET_NAME) {
  console.error(
    'Warning: SUPABASE_VIDEO_BUCKET_NAME environment variable is not set. Using default "video-files".'
  );
}

async function uploadVideoToSupabase(file) {
  if (!supabase) {
    console.error(
      "Supabase client is not initialized. Check environment variables SUPABASE_URL and SUPABASE_ANON_KEY."
    );
    throw new Error("Supabase client not initialized");
  }

  if (!file) {
    throw new Error("No video file provided for upload");
  }

  // Generate unique filename with proper extension
  const fileExtension = getVideoExtension(file.mimetype || file.type);
  const uniqueFileName = `${uuidv4()}.${fileExtension}`;

  try {
    const { data, error: uploadError } = await supabase.storage
      .from(VIDEO_BUCKET_NAME)
      .upload(uniqueFileName, file.buffer, {
        contentType: file.mimetype || file.type || "video/mp4",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase video upload error:", uploadError);
      const message = uploadError.message || "Unknown Supabase upload error";
      if (message.includes("Bucket not found")) {
        throw new Error(
          `Upload failed: Video bucket named "${VIDEO_BUCKET_NAME}" not found. Please ensure it exists and permissions are correct.`
        );
      }
      throw new Error(`Video upload failed: ${message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(VIDEO_BUCKET_NAME)
      .getPublicUrl(uniqueFileName);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.warn(
        `Video file ${uniqueFileName} uploaded but failed to get public URL. Manual check/cleanup might be needed.`
      );
      throw new Error("Failed to retrieve public URL for the uploaded video.");
    }

    return {
      publicUrl: publicUrlData.publicUrl,
      fileName: uniqueFileName,
      bucket: VIDEO_BUCKET_NAME,
    };
  } catch (error) {
    console.error("Error during video upload process:", error);
    throw error;
  }
}

function getVideoExtension(mimeType) {
  const mimeToExt = {
    "video/mp4": "mp4",
    "video/webm": "webm",
    "video/ogg": "ogv",
    "video/quicktime": "mov",
    "video/x-matroska": "mkv",
    "video/x-msvideo": "avi",
  };
  return mimeToExt[mimeType] || "mp4";
}

module.exports = { uploadVideoToSupabase };
