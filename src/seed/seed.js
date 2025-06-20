const mongoose = require("mongoose");
const User = require("../models/coreModels/User");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

dotenv.config();

function createRandomUser(gender = "female") {
  // Generate the main portrait photo first
  const portraitPhoto = faker.image.personPortrait({ sex: gender });
  
  // Generate additional picsum images (random count between 1-5)
  const additionalImagesCount = faker.number.int({ min: 1, max: 5 });
  const additionalImages = Array.from({ length: additionalImagesCount }, () => 
    faker.image.urlPicsumPhotos()
  );

  return {
    removed: false,
    enabled: true,
    isSendVerifyMail: true,
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName({ sex: gender }),
    photo: portraitPhoto,
    country: faker.location.country(),
    city: faker.location.city(),
    role: "user",
    dob: faker.date.birthdate({ min: 18, max: 50, mode: "age" }),
    gender: gender,
    phoneNumber: faker.phone.number(),
    headLine: faker.person.jobTitle(),
    describesAnimalType: faker.animal.type(),
    height: { value: faker.number.int({ min: 150, max: 200 }), unit: "cm" },
    weight: { value: faker.number.int({ min: 50, max: 100 }), unit: "kg" },
    preferredUnits: "metric",
    introduction: faker.lorem.sentences(2),
    interests: faker.helpers.arrayElements(
      [
        "sports",
        "music",
        "reading",
        "traveling",
        "cooking",
        "movies",
        "fitness",
      ],
      3
    ),
    relationshipStatus: faker.helpers.arrayElement([
      "single",
      "in a relationship",
      "married",
    ]),
    religion: faker.helpers.arrayElement([
      "none",
      "christianity",
      "islam",
      "hinduism",
      "buddhism",
    ]),
    children: faker.helpers.arrayElement(["none", "yes", "prefer not to say"]),
    lookingFor: faker.helpers.arrayElement([
      "friendship",
      "dating",
      "marriage",
    ]),
    languages: faker.helpers.arrayElements(
      ["English", "Spanish", "French", "German"],
      2
    ),
    images: [portraitPhoto, ...additionalImages],
    socket_id: null,
    is_online: 0,
    last_seen: faker.date.recent(),
    isVerified: "verified",
    isProfileVerified: true,
    isProfileComplete: true,
    isPlanPurchase: false,
    emailToken: faker.string.alphanumeric(16),
    emailVerified: faker.datatype.boolean(),
    isDowngradeMailSent: faker.datatype.boolean(),
    isTrialReminderSent: faker.datatype.boolean(),
    verifiedImage: faker.image.avatar(),
    created: new Date(),
    updated: new Date(),
  };
}

async function seed(maleCount = 5, femaleCount = 5) {
  try {
    await mongoose.connect(process.env.DATABASE);

    // Create male users
    console.log(`Creating ${maleCount} male users...`);
    for (let i = 0; i < maleCount; i++) {
      const user = createRandomUser("male");
      console.log(`Creating male user ${i + 1}:`, user.name);
      await User.create(user);
    }

    // Create female users
    console.log(`Creating ${femaleCount} female users...`);
    for (let i = 0; i < femaleCount; i++) {
      const user = createRandomUser("female");
      console.log(`Creating female user ${i + 1}:`, user.name);
      await User.create(user);
    }

    console.log(`Seed executed successfully! Created ${maleCount} male and ${femaleCount} female users.`);
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
}

// Default: Create 5 male and 5 female users
// You can customize by calling: seed(maleCount, femaleCount)
seed(15,0);
