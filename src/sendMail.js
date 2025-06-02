const { emailVerfication, passwordVerfication, mailSendEmailTemplate, joinWaitlistTemplate, welcomeTemplate, profileUnverifiedTemplate, profileVerifiedTemplate, emailAddressChangeTemplate, passwordChangeTemplate, welcomeTemplateFemale, verificationRequiredTemplate, loginReminderTemplate, accountDeactivateTemplate } = require('@/emailTemplate/emailVerfication');

const brevo = require('@sendinblue/client');
// const { createTransport } = require("nodemailer");
// Create an instance of the Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key for authorization
// TEMPORARILY DISABLED BREVO API KEY SETUP
// apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendMail = async ({ email, name, otp, subject, type, address, title, body, userEmail }) => {
  // TEMPORARILY DISABLED EMAIL SENDING (pending Brevo IP fix)
  console.log('Email sending is currently bypassed. Intended recipient:', email, 'Type:', type);
  
  // Log OTP if available for debugging/manual verification
  if (otp) {
    console.log(`>>>>>>>>>>>> OTP for ${email} (${type}): ${otp} <<<<<<<<<<<<`);
  }

  // The check for process.env.DISABLE_EMAIL_SENDING was previously commented out by the user.
  // Assuming unconditional bypass for now based on current file state.
  return {
    success: true,
    message: 'Email sending is bypassed. Simulated success.', // Updated message
    simulated: true
  };
  
  /* Original logic start (currently bypassed by the return above)
  // if (process.env.DISABLE_EMAIL_SENDING === 'true') {
  //   return {
  //     success: true,
  //     message: 'Email sending is disabled. Simulated success.',
  //     simulated: true
  //   };
  // }
  // End of temporary disable block. Original logic below.

  try {
    let typeUI;
    console.log("forgotVerification", type);
    
    if (type === 'forgotVerification') {
      typeUI = passwordVerfication({ name, otp });
    }  else if (type === 'mailSend') {
      typeUI = mailSendEmailTemplate({ title, name, description: body })
    } else if (type === 'joinWaitlist') {
      typeUI = joinWaitlistTemplate({ title, name, email: userEmail })
    } else if (type === 'welcomeEmail') {
      typeUI = welcomeTemplate({ name, email })
    } else if (type === 'welcomeEmailFemale') {
      typeUI = welcomeTemplateFemale({ name, email })
    } else if (type === 'profileUnverified') {
      typeUI = profileUnverifiedTemplate({ name, email })
    } else if (type === 'profileVerified') {
      typeUI = profileVerifiedTemplate({ name, email })
    } else if (type === 'emailAddressChange') {
      typeUI = emailAddressChangeTemplate({ name, email, userEmail })
    } else if (type === 'passwordChange') {
      typeUI = passwordChangeTemplate({ name, email })
    } else if (type === 'verificationRequired') {
      typeUI = verificationRequiredTemplate({ name, email })
    } else if (type === 'emailVerification') {
      typeUI = emailVerfication({ name, otp });
    } else if (type === 'loginReminder') {
      typeUI = loginReminderTemplate({ name, email });
    } else if (type === 'accountDeactivate') {
      typeUI = accountDeactivateTemplate({ name, email });
    }

    const mailOptions = {
      sender: { email: process.env.EMAIL_USER }, // Sender's email
      to: [{ email: email }], // Recipient's email
      subject: subject, // Email subject
      htmlContent: typeUI // The email content in HTML
    };

    if (!process.env.BREVO_API_KEY) {
        console.error('Brevo API key is not set, but email sending is not explicitly disabled.');
        throw new Error('Brevo API key missing.');
    }
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    const response = await apiInstance.sendTransacEmail(mailOptions);
    console.log("Brevo API response:", response);
    return response;

  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
  */ // End of original logic block
};

module.exports = sendMail;
