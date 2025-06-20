const { supabase } = require("../setup/supabase");
const { v4: uuidv4 } = require("uuid");

const AUDIO_BUCKET_NAME =
  process.env.SUPABASE_AUDIO_BUCKET_NAME || "audio-files";

if (!AUDIO_BUCKET_NAME) {
  console.error(
    'Warning: SUPABASE_AUDIO_BUCKET_NAME environment variable is not set. Using default "audio-files".'
  );
}

async function uploadAudioToSupabase(file) {
  if (!supabase) {
    console.error(
      "Supabase client is not initialized. Check environment variables SUPABASE_URL and SUPABASE_ANON_KEY."
    );
    throw new Error("Supabase client not initialized");
  }

  if (!file) {
    throw new Error("No audio file provided for upload");
  }

  // Generate unique filename with proper extension
  const fileExtension = getAudioExtension(file.mimetype || file.type);
  const uniqueFileName = `${uuidv4()}.${fileExtension}`;

  try {
    const { data, error: uploadError } = await supabase.storage
      .from(AUDIO_BUCKET_NAME)
      .upload(uniqueFileName, file.buffer, {
        contentType: file.mimetype || file.type || "audio/webm",
        upsert: false,
      });

    if (uploadError) {
      console.error("Supabase audio upload error:", uploadError);
      const message = uploadError.message || "Unknown Supabase upload error";
      if (message.includes("Bucket not found")) {
        throw new Error(
          `Upload failed: Audio bucket named "${AUDIO_BUCKET_NAME}" not found. Please ensure it exists and permissions are correct.`
        );
      }
      throw new Error(`Audio upload failed: ${message}`);
    }

    const { data: publicUrlData } = supabase.storage
      .from(AUDIO_BUCKET_NAME)
      .getPublicUrl(uniqueFileName);

    if (!publicUrlData || !publicUrlData.publicUrl) {
      console.warn(
        `Audio file ${uniqueFileName} uploaded but failed to get public URL. Manual check/cleanup might be needed.`
      );
      throw new Error("Failed to retrieve public URL for the uploaded audio.");
    }

    return {
      publicUrl: publicUrlData.publicUrl,
      fileName: uniqueFileName,
      bucket: AUDIO_BUCKET_NAME,
    };
  } catch (error) {
    console.error("Error during audio upload process:", error);
    throw error;
  }
}

function getAudioExtension(mimeType) {
  const mimeToExt = {
    "audio/webm": "webm",
    "audio/mp3": "mp3",
    "audio/mpeg": "mp3",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/m4a": "m4a",
    "audio/aac": "aac",
  };

  return mimeToExt[mimeType] || "webm";
}

module.exports = { uploadAudioToSupabase };
