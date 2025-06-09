const { emailVerfication, passwordVerfication, mailSendEmailTemplate, joinWaitlistTemplate, welcomeTemplate, profileUnverifiedTemplate, profileVerifiedTemplate, emailAddressChangeTemplate, passwordChangeTemplate, welcomeTemplateFemale, verificationRequiredTemplate, loginReminderTemplate, accountDeactivateTemplate, accountFreeTrialExpiring, accountFreeTrialExpired, planPurchaseSuccessfully, planPurchaseCancel } = require('@/emailTemplate/emailVerfication');

const brevo = require('@sendinblue/client');

const sendMail = async ({ email, name, otp, subject, type, address, title, body, userEmail }) => {
  console.log('Starting email send process for:', email, 'Type:', type);
  
  // Log OTP if available for debugging/manual verification
  if (otp) {
    console.log(`>>>>>>>>>>>> OTP for ${email} (${type}): ${otp} <<<<<<<<<<<<`);
  }

  // Check if email sending is disabled
  if (process.env.DISABLE_EMAIL_SENDING === 'true') {
    console.log('📧 Email sending is disabled - returning simulated success');
    return {
      success: true,
      message: 'Email sending is disabled. Simulated success.',
      simulated: true
    };
  }

  try {
    // Validate required environment variables
    if (!process.env.BREVO_API_KEY) {
      console.error('❌ BREVO_API_KEY is not set.');
      throw new Error('Brevo API key missing. Please check your environment configuration.');
    }

    if (!process.env.EMAIL_USER) {
      console.error('❌ EMAIL_USER is not set.');
      throw new Error('EMAIL_USER missing. Please check your environment configuration.');
    }

    // Create and configure Brevo API client
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);
    
    let typeUI;
    console.log("Email type:", type);
    
    if (type === 'forgotVerification') {
      typeUI = passwordVerfication({ name, otp });
    } else if (type === 'mailSend') {
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
    } else {
      throw new Error(`Unknown email type: ${type}`);
    }

    if (!typeUI) {
      throw new Error('Failed to generate email template');
    }

    const mailOptions = {
      sender: { 
        email: process.env.EMAIL_USER,
        name: 'Asian Embrace'
      },
      to: [{ email: email }],
      subject: subject,
      htmlContent: typeUI
    };

    console.log("Sending email with options:", {
      to: mailOptions.to,
      subject: mailOptions.subject,
      sender: mailOptions.sender
    });

    const response = await apiInstance.sendTransacEmail(mailOptions);
    console.log("✅ Brevo API response:", response.response?.statusCode, response.body?.messageId);
    
    return {
      success: true,
      message: 'Email sent successfully',
      messageId: response.body?.messageId
    };

  } catch (error) {
    console.error("❌ Error sending email:", error.message);
    
    // Handle specific Brevo errors
    if (error.response?.body) {
      console.error("Brevo API error details:", error.response.body);
      
      // Handle specific error cases
      if (error.response.body.code === 'unauthorized' || error.response.body.message === 'Key not found') {
        console.error('🔑 Invalid or expired Brevo API key. Please update BREVO_API_KEY in environment variables.');
        return {
          success: false,
          message: 'Email service authentication failed. Please contact support.',
          error: 'INVALID_API_KEY'
        };
      }
    }
    
    // Return error but don't throw to prevent application crash
    return {
      success: false,
      message: 'Failed to send email. Please try again later.',
      error: error.message
    };
  }
};

module.exports = sendMail;
