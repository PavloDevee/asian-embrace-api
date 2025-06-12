const mongoose = require("mongoose");
const User = require("../models/coreModels/User");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");

dotenv.config();

function createRandomUser() {
  return {
    removed: false,
    enabled: true,
    isSendVerifyMail: true,
    email: faker.internet.email().toLowerCase(),
    name: faker.person.fullName(),
    photo: faker.image.url(),
    country: faker.location.country(),
    city: faker.location.city(),
    role: "user",
    dob: faker.date.birthdate({ min: 18, max: 50, mode: "age" }),
    gender: "female",
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
    images: faker.image.avatar(),
    video: faker.internet.url(),
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

async function seed() {
  try {
    await mongoose.connect(process.env.DATABASE);

    let i = 0;
    while (i < 10) {
      const user = createRandomUser();
      console.log(user);
      await User.create(user);
      i++;
    }

    console.log("Seed executed successfully");
  } catch (e) {
    console.log(e);
  } finally {
    mongoose.disconnect();
  }
}

seed();
