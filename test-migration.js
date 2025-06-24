const mongoose = require("mongoose");
const ChatAttachment = require("./src/models/appModels/ChatAttachment");
require("dotenv").config();

// Test migration setup
const testMigration = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Check current state
    const totalAttachments = await ChatAttachment.countDocuments();
    const localAttachments = await ChatAttachment.countDocuments({
      attechment: { $regex: "^uploads/" },
    });
    const supabaseAttachments = await ChatAttachment.countDocuments({
      attechment: { $regex: "^https://" },
    });

    console.log("\n📊 CURRENT STATE:");
    console.log(`📄 Total attachments: ${totalAttachments}`);
    console.log(`📁 Local attachments (uploads/): ${localAttachments}`);
    console.log(`☁️  Supabase attachments (https://): ${supabaseAttachments}`);

    if (totalAttachments === 0) {
      console.log("\n💡 No attachments found. Creating test data...");
      await createTestData();
    }

    // Show sample data
    console.log("\n📋 SAMPLE ATTACHMENTS:");
    const sampleAttachments = await ChatAttachment.find().limit(5);
    sampleAttachments.forEach((attachment, index) => {
      console.log(`${index + 1}. ID: ${attachment._id}`);
      console.log(`   Path: ${attachment.attechment}`);
      console.log(`   Type: ${attachment.attechment_type || "Not set"}`);
      console.log(`   Created: ${attachment.createdAt}`);
      console.log("");
    });

    // Check required environment variables
    console.log("🔧 ENVIRONMENT CHECK:");
    const requiredEnvVars = [
      "DATABASE_URL",
      "SUPABASE_URL",
      "SUPABASE_ANON_KEY",
      "SUPABASE_BUCKET_NAME",
    ];

    let allEnvVarsPresent = true;
    requiredEnvVars.forEach((envVar) => {
      const isPresent = !!process.env[envVar];
      console.log(
        `   ${isPresent ? "✅" : "❌"} ${envVar}: ${
          isPresent ? "Set" : "Missing"
        }`
      );
      if (!isPresent) allEnvVarsPresent = false;
    });

    if (allEnvVarsPresent) {
      console.log("\n🎉 All environment variables are set! Ready to migrate.");
    } else {
      console.log(
        "\n⚠️  Some environment variables are missing. Please check your .env file."
      );
    }

    console.log("\n📖 NEXT STEPS:");
    console.log("1. Run: npm run migrate:status");
    console.log("2. Run: npm run migrate:attachments");
  } catch (error) {
    console.error("❌ Test failed:", error);
  } finally {
    await mongoose.connection.close();
    console.log("\n📔 Database connection closed");
  }
};

// Create test data if none exists
const createTestData = async () => {
  const testAttachments = [
    {
      sender_id: new mongoose.Types.ObjectId(),
      receiver_id: new mongoose.Types.ObjectId(),
      attechment: "uploads/chatAttachment/test-image-1.jpg",
      attechment_type: "image",
    },
    {
      sender_id: new mongoose.Types.ObjectId(),
      receiver_id: new mongoose.Types.ObjectId(),
      attechment: "uploads/chatAttachment/test-audio-1.mp3",
      attechment_type: "audio",
    },
    {
      sender_id: new mongoose.Types.ObjectId(),
      receiver_id: new mongoose.Types.ObjectId(),
      attechment:
        "https://supabase.co/storage/v1/object/public/test-migrated.jpg",
      attechment_type: "image",
    },
  ];

  await ChatAttachment.insertMany(testAttachments);
  console.log("   ✅ Created 3 test attachments");
};

// Run the test
testMigration().catch(console.error);
