require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const { generate: uniqueId } = require('shortid');

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE);

async function setupApp() {
  try {

    const Admin = require('../models/coreModels/User');
    const AdminPassword = require('../models/coreModels/UserPassword');
    const newAdminPassword = new AdminPassword();

    const salt = uniqueId();

    const passwordHash = newAdminPassword.generateHash(salt, 'admin123');

    const demoAdmin = {
      email: 'admin@gmail.com',
      name: 'Asian Admin',
      enabled: true,
      role: 'admin',
    };
    const result = await new Admin(demoAdmin).save();

    const AdminPasswordData = {
      password: passwordHash,
      emailVerified: true,
      salt: salt,
      user: result._id,
    };
    await new AdminPassword(AdminPasswordData).save();

    console.log('👍 Admin created : Done!');
    process.exit();
  } catch (e) {
    console.log('Error! The Error info is below');
    console.log(e);
    process.exit();
  }
}

setupApp();
