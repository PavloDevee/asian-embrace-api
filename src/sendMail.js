const { emailVerfication, passwordVerfication, mailSendEmailTemplate, joinWaitlistTemplate, welcomeTemplate, profileUnverifiedTemplate, profileVerifiedTemplate, emailAddressChangeTemplate, passwordChangeTemplate, welcomeTemplateFemale, verificationRequiredTemplate, loginReminderTemplate, accountDeactivateTemplate, accountFreeTrialExpiring, accountFreeTrialExpired, planPurchaseSuccessfully, planPurchaseCancel } = require('@/emailTemplate/emailVerfication');

const brevo = require('@sendinblue/client');
// const { createTransport } = require("nodemailer");
// Create an instance of the Brevo API client
const apiInstance = new brevo.TransactionalEmailsApi();

// Set API key for authorization
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const sendMail = async ({ email, name, otp, subject, type, address, title, body, userEmail }) => {
  try {
    let typeUI;
    console.log("forgotVerification", type);
    
    // Choose the appropriate template based on the type of email
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
    } else if (type === 'accountFreeTrialExpiring') {
      typeUI = accountFreeTrialExpiring({ name, email });
    } else if (type === 'accountFreeTrialExpired') {
      typeUI = accountFreeTrialExpired({ name, email });
    } else if (type === 'planPurchaseSuccessfully') {
      typeUI = planPurchaseSuccessfully({ name, email });
    } else if (type === 'planPurchaseCancel') {
      typeUI = planPurchaseCancel({ name, email });
    }

    // const transporter = createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: '465',
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
    // console.log("transporter", transporter);
    
    const mailOptions = {
      sender: { email: process.env.EMAIL_USER }, // Sender's email (e.g., your GoDaddy email)
      // to: [{ email: 'manish.testjploft@gmail.com' }], // Recipient's email
      to: [{ email: email }], // Recipient's email
      subject: subject, // Email subject
      htmlContent: typeUI // The email content in HTML
    };

    // Send the email using the Brevo API
    const response = await apiInstance.sendTransacEmail(mailOptions);
    console.log("response", response);
    
    // const mailOptions = {
    //   from: process.env.SMTP_FROM,
    //   to: email,
    //   subject: subject,
    //   html: `${typeUI}`,
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
      
      // if (error) {
      //   return res
      //     .status(401)
      //     .send({ status: "error", message: "something went wrong" });
      // } else {
      //   return res
      //     .status(200)
      //     .send({ status: "success", message: "Sent successfully" });
        // res.status(200).send('OTP sent successfully');
      // }
    // });


    
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

module.exports = sendMail;
