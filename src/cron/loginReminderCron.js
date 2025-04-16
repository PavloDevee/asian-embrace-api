// cron/verifyReminderCron.js
const cron = require('node-cron');
const mongoose = require('mongoose');
const sendMail = require('@/sendMail'); // Adjust this path if needed

const User = mongoose.model('User');
const UserPassword = mongoose.model('UserPassword');

const loginStartCronJob = () => {
  cron.schedule('0 9 * * *', async () => {
    console.log('⏰ Running verification reminder check login...');

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    try {
      const users = await UserPassword.find({
        removed: false,
        isSendLoginReminder: false,
        loginAt: { $lte: sevenDaysAgo },
      });

      for (const user of users) {
        const userData = await User.findOne({
          _id: user.user,
          removed: false,
        });
        console.log("userData", userData);
        
        if (userData) {
          await sendMail({
            email: userData.email,
            name: userData.name,
            subject: 'Don’t Miss Out on Asian Embrace!',
            type: 'loginReminder',
          });

          await UserPassword.updateOne({ user: userData._id }, { $set: { isSendLoginReminder: true } });
          console.log(`📧 Reminder sent to: ${userData.email}`);
        }
      }
    } catch (err) {
      console.error('❌ Cron job error:', err);
    }
  });
};

module.exports = loginStartCronJob;
