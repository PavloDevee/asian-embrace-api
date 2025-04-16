const { emailVerfication } = require('@/emailTemplate/emailVerfication');

const { Resend } = require('resend');

const sendMail = async ({ email, name, otp }) => {
  const resend = new Resend(process.env.RESEND_API);

  const { data } = await resend.emails.send({
    from: 'hello@yourmail.com',
    to: email,
    subject: 'Verify your email',
    html: emailVerfication({ name, otp }),
  });

  return data;
};

module.exports = sendMail;
