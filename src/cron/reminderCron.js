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
};

module.exports = startCronJob;
