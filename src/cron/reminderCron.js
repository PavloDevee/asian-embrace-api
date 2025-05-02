// cron/verifyReminderCron.js
const cron = require('node-cron');
const mongoose = require('mongoose');
const sendMail = require('@/sendMail'); // Adjust this path if needed

const User = mongoose.model('User');

const startCronJob = () => {
  cron.schedule('* * * * *', async () => {
    console.log('⏰ Running verification reminder check...');

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    try {
      const users = await User.find({
        gender: 'female',
        isVerified: 'pending',
        isSendVerifyMail: false,
        created: { $lte: tenMinutesAgo },
      });

      for (const user of users) {
        await sendMail({
          email: user.email,
          name: user.name,
          subject: 'Verify Your Account!',
          type: 'verificationRequired',
        });

        await User.updateOne({ _id: user._id }, { $set: { isSendVerifyMail: true } });
        console.log(`📧 Reminder sent to: ${user.email}`);
      }
    } catch (err) {
      console.error('❌ Cron job error:', err);
    }
  });

  // ✅ 48-hour Trial Reminder for Male Users
  cron.schedule('*/10 * * * *', async () => {
    console.log('⏰ Checking for 24-hour trial reminders (male users)...');

    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago

    try {
      const users = await User.find({
        gender: 'male',
        isPlanPurchase: false,
        isTrialReminderSent: false,
        created: { $lte: twentyFourHoursAgo }, // created more than 24 hours ago
      });

      for (const user of users) {
        console.log("user", user);

        await sendMail({
          email: user.email,
          name: user.name,
          subject: 'Your Free Trial is Expiring Soon!',
          type: 'accountFreeTrialExpiring',
        });

        await User.updateOne({ _id: user._id }, { $set: { isTrialReminderSent: true } });
        console.log(`📧 24-hour trial reminder sent to: ${user.email}`);
      }
    } catch (err) {
      console.error('❌ Cron job error (24-hour reminder):', err);
    }
  });

  // ✅ Downgrade Notification After Trial Ends
  cron.schedule('*/15 * * * *', async () => {
    console.log('⏰ Checking for post-trial downgrade notifications...');
  
    const now = new Date();
    const seventyTwoHoursAgo = new Date(now.getTime() - 72 * 60 * 60 * 1000); // 72 hours ago
  
    try {
      const users = await User.find({
        gender: 'male',
        isPlanPurchase: false,
        isDowngradeMailSent: false,
        created: { $lte: seventyTwoHoursAgo },
      });
  
      console.log(`Found ${users.length} users to downgrade`);
  
      for (const user of users) {
        await sendMail({
          email: user.email,
          name: user.name,
          subject: 'Your Free Trial Has Ended',
          type: 'accountFreeTrialExpired',
        });
  
        await User.updateOne(
          { _id: user._id },
          { $set: { isDowngradeMailSent: true } }
        );
  
        console.log(`📧 Downgrade mail sent to: ${user.email}`);
      }
  
    } catch (err) {
      console.error('❌ Cron job error (trial end downgrade):', err);
    }
  });
  
};

module.exports = startCronJob;
