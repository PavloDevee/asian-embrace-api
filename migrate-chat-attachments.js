const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

// Set environment variables for Supabase if not already set
if (!process.env.SUPABASE_URL) {
  process.env.SUPABASE_URL = "https://rcfdcfozgsxlktbcmhod.supabase.co";
}
if (!process.env.SUPABASE_ANON_KEY) {
  process.env.SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJjZmRjZm96Z3N4bGt0YmNtaG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1OTg1MTYsImV4cCI6MjA0OTE3NDUxNn0.Q7Ff1l20oaVhN1tOhHKYPRkSKj8pLtmHMnGfpQYTNMY";
}
if (!process.env.SUPABASE_BUCKET_NAME) {
  process.env.SUPABASE_BUCKET_NAME = "images";
}
if (!process.env.SUPABASE_AUDIO_BUCKET_NAME) {
  process.env.SUPABASE_AUDIO_BUCKET_NAME = "audio";
}

const { uploadImageToSupabase } = require("./src/helpers/imageUploadHelper");
const { uploadAudioToSupabase } = require("./src/helpers/audioUploadHelper");
const ChatAttachment = require("./src/models/appModels/ChatAttachment");
require("dotenv").config({ path: ".env" });

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:Appexoft12@cluster0.4ng9b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1);
  }
};

// Helper function to determine file type
const getFileType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  const imageExts = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".avif", ".svg"];
  const videoExts = [".mp4", ".webm", ".avi", ".mov", ".mkv", ".flv", ".wmv"];
  const audioExts = [".mp3", ".wav", ".ogg", ".webm", ".m4a", ".aac"];

  if (imageExts.includes(ext)) return "image";
  if (videoExts.includes(ext)) return "video";
  if (audioExts.includes(ext)) return "audio";

  return "unknown";
};

// Helper function to get mimetype
const getMimeType = (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    // Images
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".gif": "image/gif",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".svg": "image/svg+xml",

    // Videos
    ".mp4": "video/mp4",
    ".webm": "video/webm",
    ".avi": "video/x-msvideo",
    ".mov": "video/quicktime",
    ".mkv": "video/x-matroska",
    ".flv": "video/x-flv",
    ".wmv": "video/x-ms-wmv",

    // Audio
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".m4a": "audio/m4a",
    ".aac": "audio/aac",
  };

  return mimeTypes[ext] || "application/octet-stream";
};

// Main migration function
const migrateAttachments = async (testMode = false) => {
  try {
    console.log("🚀 Starting chat attachments migration...\n");

    // Find all attachments with local file paths
    let query = { attechment: { $regex: "^uploads/" } };

    const attachments = await ChatAttachment.find(query);

    const totalFound = attachments.length;
    const attachmentsToProcess = testMode
      ? attachments.slice(0, 5)
      : attachments;

    console.log(`📄 Found ${totalFound} attachments total`);
    if (testMode) {
      console.log(
        `🧪 Test mode: processing first ${attachmentsToProcess.length} attachments\n`
      );
    } else {
      console.log(
        `📄 Processing all ${attachmentsToProcess.length} attachments\n`
      );
    }

    if (attachmentsToProcess.length === 0) {
      console.log("✅ No attachments to migrate. All done!");
      return;
    }

    let successCount = 0;
    let failedCount = 0;
    const failedItems = [];

    for (let i = 0; i < attachmentsToProcess.length; i++) {
      const attachment = attachmentsToProcess[i];
      const progress = `[${i + 1}/${attachmentsToProcess.length}]`;

      try {
        console.log(`${progress} Processing: ${attachment.attechment}`);

        // Construct full file path
        const filePath = path.join(
          __dirname,
          "src",
          "public",
          attachment.attechment
        );

        // Check if file exists
        if (!fs.existsSync(filePath)) {
          console.log(`   ⚠️  File not found: ${filePath}`);
          failedCount++;
          failedItems.push({
            id: attachment._id,
            path: attachment.attechment,
            error: "File not found",
          });
          continue;
        }

        // Read file
        const fileBuffer = fs.readFileSync(filePath);
        const fileStats = fs.statSync(filePath);
        const fileType = getFileType(filePath);
        const mimetype = getMimeType(filePath);

        console.log(
          `   📁 File size: ${(fileStats.size / 1024 / 1024).toFixed(2)} MB`
        );
        console.log(`   🎯 File type: ${fileType} (${mimetype})`);

        // Create file object for upload
        const fileObj = {
          buffer: fileBuffer,
          mimetype: mimetype,
          originalname: path.basename(filePath),
          size: fileStats.size,
        };

        // Upload to Supabase
        let uploadResult;
        if (fileType === "audio") {
          uploadResult = await uploadAudioToSupabase(fileObj);
        } else {
          uploadResult = await uploadImageToSupabase(fileObj);
        }

        if (!uploadResult || !uploadResult.publicUrl) {
          throw new Error("Failed to get public URL from upload");
        }

        console.log(`   ☁️  Uploaded to: ${uploadResult.publicUrl}`);

        // Update database record
        const oldPath = attachment.attechment;
        attachment.attechment = uploadResult.publicUrl;

        // Update attachment type if not set or incorrect
        if (
          !attachment.attechment_type ||
          attachment.attechment_type !== fileType
        ) {
          attachment.attechment_type = fileType;
          console.log(`   🏷️  Updated type: ${fileType}`);
        }

        await attachment.save();

        console.log(`   ✅ Successfully migrated: ${attachment._id}`);
        console.log(`   📤 Old: ${oldPath}`);
        console.log(`   📥 New: ${uploadResult.publicUrl}\n`);

        successCount++;

        // Optional: Delete local file after successful migration
        // Uncomment the lines below if you want to remove local files
        // try {
        //     fs.unlinkSync(filePath);
        //     console.log(`   🗑️  Deleted local file: ${filePath}`);
        // } catch (deleteError) {
        //     console.log(`   ⚠️  Could not delete local file: ${deleteError.message}`);
        // }
      } catch (error) {
        console.error(
          `   ❌ Failed to migrate ${attachment._id}: ${error.message}`
        );
        failedCount++;
        failedItems.push({
          id: attachment._id,
          path: attachment.attechment,
          error: error.message,
        });
      }
    }

    // Summary
    console.log("\n" + "=".repeat(50));
    console.log("📊 MIGRATION SUMMARY");
    console.log("=".repeat(50));
    console.log(`✅ Successfully migrated: ${successCount}`);
    console.log(`❌ Failed: ${failedCount}`);
    console.log(`📄 Total processed: ${attachments.length}`);

    if (failedItems.length > 0) {
      console.log("\n❌ FAILED ITEMS:");
      failedItems.forEach((item, index) => {
        console.log(`${index + 1}. ID: ${item.id}`);
        console.log(`   Path: ${item.path}`);
        console.log(`   Error: ${item.error}\n`);
      });
    }

    console.log("\n🎉 Migration completed!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    throw error;
  }
};

// Rollback function (optional)
const rollbackMigration = async () => {
  try {
    console.log("🔄 Starting rollback...\n");

    // Find all attachments with Supabase URLs
    const attachments = await ChatAttachment.find({
      attechment: { $regex: "^https://" },
    });

    console.log(`📄 Found ${attachments.length} Supabase attachments\n`);

    // Note: This is a simplified rollback that just reports what would be rolled back
    // In a real scenario, you'd need to have backup data or a mapping table
    console.log("⚠️  ROLLBACK WARNING:");
    console.log("This rollback function is for reference only.");
    console.log("To properly rollback, you would need:");
    console.log("1. Backup of original file paths");
    console.log("2. Original files still present in uploads/ directory");
    console.log("3. Mapping between old and new URLs");

    console.log(
      "\n🛑 Rollback not executed. Please implement based on your backup strategy."
    );
  } catch (error) {
    console.error("❌ Rollback failed:", error);
    throw error;
  }
};

// CLI interface
const runMigration = async () => {
  const command = process.argv[2];

  if (!command) {
    console.log("📖 Usage:");
    console.log("  node migrate-chat-attachments.js migrate   - Run migration");
    console.log(
      "  node migrate-chat-attachments.js test      - Test migration (first 5 files only)"
    );
    console.log(
      "  node migrate-chat-attachments.js rollback  - Rollback migration (info only)"
    );
    console.log(
      "  node migrate-chat-attachments.js status    - Check migration status"
    );
    return;
  }

  await connectDB();

  try {
    switch (command) {
      case "migrate":
        await migrateAttachments();
        break;

      case "test":
        await migrateAttachments(true); // Test mode - only 5 files
        break;

      case "rollback":
        await rollbackMigration();
        break;

      case "status":
        await checkMigrationStatus();
        break;

      default:
        console.log("❌ Unknown command:", command);
        console.log("Available commands: migrate, rollback, status");
    }
  } catch (error) {
    console.error("❌ Script failed:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("📔 Database connection closed");
  }
};

// Status check function
const checkMigrationStatus = async () => {
  try {
    console.log("📊 Checking migration status...\n");

    const totalAttachments = await ChatAttachment.countDocuments();
    const localAttachments = await ChatAttachment.countDocuments({
      attechment: { $regex: "^uploads/" },
    });
    const supabaseAttachments = await ChatAttachment.countDocuments({
      attechment: { $regex: "^https://" },
    });

    console.log(`📄 Total attachments: ${totalAttachments}`);
    console.log(`📁 Local attachments (uploads/): ${localAttachments}`);
    console.log(`☁️  Supabase attachments (https://): ${supabaseAttachments}`);

    if (localAttachments === 0) {
      console.log("\n✅ All attachments have been migrated to Supabase!");
    } else {
      console.log(
        `\n⏳ ${localAttachments} attachments still need to be migrated.`
      );
    }

    // Show attachment types
    const pipeline = [
      { $group: { _id: "$attechment_type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ];

    const typeStats = await ChatAttachment.aggregate(pipeline);

    if (typeStats.length > 0) {
      console.log("\n📊 Attachment types:");
      typeStats.forEach((stat) => {
        console.log(`   ${stat._id || "Unknown"}: ${stat.count}`);
      });
    }
  } catch (error) {
    console.error("❌ Status check failed:", error);
    throw error;
  }
};

// Run the script
if (require.main === module) {
  runMigration().catch(console.error);
}

module.exports = {
  migrateAttachments,
  rollbackMigration,
  checkMigrationStatus,
};
