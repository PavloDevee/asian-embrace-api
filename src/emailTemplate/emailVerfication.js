exports.emailVerfication = ({
    title = 'Verify your email',
    name = '',
    link = '',
    time = new Date(),
    otp,
}) => {
    return `
    <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png);background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                                      
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;text-align:left;font-size:24px;line-height:50px;padding:20px 35px 10px;font-weight:500;">Confirm Your Email </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Thank you for signing up for Asian Embrace! To complete your registration please enter the code below.
                        </td>
                     </tr>
                     
                     
                     </tr>
                    
                      <tr>
                        <td style="padding: 8px;"></td>
                     </tr> 

                     <tr>
                                 <td style="font-size: 14px;padding: 20px 0;text-align: center;"><a href="#" style="background-color: #D52D3A;color: #FFFFFF;
                                 padding: 12px 30px;text-decoration: none;border-radius: 50px; font-size: 20px;font-family: Poppins; font-weight: 600; font-size: 20px; line-height: 150%; letter-spacing: 2px; text-align: center;">${otp}</a></td>
                              </tr>

                      <tr>
                        <td style="padding: 13px;"></td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">This step helps us keep our community safe and ensures you receive important updates. It only takes a moment!</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you need any help, feel free to reply to this email. We’re here to support you.</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We can’t wait to see you find genuine connections, love, and friendship on Asian Embrace!</td>
                     </tr>

                     

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                        <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                        <td>
                            <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="width:530px;background-color:#fff;">
        
                                <tr style="width:530px;">
                                    <td
                                        style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                        <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                            src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                    </td>
                                </tr>
                                
        
                                <tr>
                                    <td style="padding: 10px;"></td>
                                </tr>
                                <tr>
                       
                                </tr>
                            </table>
                        </td>
                    </tr>
                 
        <tr style="background-color: #FEF2F3;">
                        <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
                    
                    </tr>
                    <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                        <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
                    
                    </tr>
         
                   
                </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
    `;
};

exports.passwordVerfication = ({
    name = '',
    otp,
}) => {
    return `
    <html>
<head>
   <link
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
      rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
         <td style="padding: 30px 0;">
            <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0"
               style="background: #fff; background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png); background-repeat: no-repeat; border-radius: 20px; overflow: hidden;">
               <thead>
                  <tr>
                     <td style="padding: 30px;">
                        <img alt="Logo" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png"
                           width="266" style="display:block; margin: 0 auto;">
                     </td>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td style="color:#000;font-size:24px;line-height:50px;padding:20px 35px 10px;font-weight:500;">
                        Reset Your Password</td>
                  </tr>
                  <tr>
                     <td style="color:#000;font-size:14px;line-height:24px;padding:0 35px 15px;font-weight:400;">Hi
                        ${name},</td>
                  </tr>
                  <tr>
                     <td style="color:#000;font-size:14px;line-height:24px;padding:0 35px 15px;font-weight:400;">
                        We received a request to reset your password. Use the verification code below to proceed.
                     </td>
                  </tr>
                  <tr>
                     <td style="padding: 8px;"></td>
                  </tr>
                  <tr>
                     <td style="text-align: center;">
                        <a href="#"
                           style="background-color: #D52D3A; color: #fff; padding: 12px 30px; text-decoration: none; border-radius: 50px; font-size: 20px; font-weight: 600; letter-spacing: 2px;">${otp}</a>
                     </td>
                  </tr>
                  <tr>
                     <td style="padding: 13px;"></td>
                  </tr>
                  <tr>
                     <td style="color:#000;font-size:14px;line-height:24px;padding:0 35px 15px;font-weight:400;">
                        This code will expire shortly, so please use it as soon as possible. If you didn’t request this,
                        you can safely ignore this email.
                     </td>
                  </tr>
                  <tr>
                     <td style="color:#000;font-size:14px;line-height:24px;padding:0 35px 15px;font-weight:400;">
                        Need help? Just reply to this email. We're here for you.
                     </td>
                  </tr>
                  <tr>
                     <td style="color:#000;font-size:14px;line-height:24px;padding:0 35px;font-weight:400;">Warm
                        regards,</td>
                  </tr>
                  <tr>
                     <td style="color:#DC323F;font-size:14px;line-height:24px;padding:0 35px 15px;font-weight:500;">The
                        Asian Embrace Team</td>
                  </tr>
               </tbody>
               <tfoot>
                  <tr>
                     <td>
                        <table align="center" width="530" style="width:530px;">
                           <tr>
                              <td style="border-top: 1px solid #F3F3F3; padding: 25px 0 15px; text-align: center;">
                                 <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" />
                                 <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" />
                                 <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" />
                                 <img src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                              </td>
                           </tr>
                           <tr>
                              <td style="padding: 10px;"></td>
                           </tr>
                        </table>
                     </td>
                  </tr>
                  <tr style="background-color: #FEF2F3;">
                     <td style="padding: 16px 40px 0; color: #000; font-size: 13.2px; line-height: 24px;">
                        You're receiving this email because you are a registered user of AsianEmbrace.com
                     </td>
                  </tr>
                  <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                     <td style="padding: 0 40px 16px; color: #000; font-size: 13.2px; line-height: 24px;">
                        If this was a mistake or you no longer wish to receive these emails, <a href="#"
                           style="color: black; font-weight: 600; text-decoration: none;">unsubscribe here</a>.
                     </td>
                  </tr>
               </tfoot>
            </table>
         </td>
      </tr>
   </table>
</body>

</html>
    `;
};

exports.mailSendEmailTemplate = ({
    title = '',
    name = '',
    description = ''
}) => {
    return `
    <div>

        <head data-id="__react-email-head">
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <title>${title}</title>
        </head>
        <div id="__react-email-preview" style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Reset your Password<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
        </div>

        <body data-id="__react-email-body">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 10px;">
          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">Hello ${name},</p>
          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">${description}</p>
          <hr style="border: none; border-top: 1px solid #eaeaea; margin: 20px 0;">
          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">Best regards,</p>
          <p style="font-size: 16px; line-height: 24px; margin: 16px 0;">Team Asian Embrace</p>
        </div>
      </body>
    </div>
  `;
};

exports.joinWaitlistTemplate = ({
    title = 'Join the Waitlist',
    name = '',
    email = '',
}) => {
    return `
    <div style="font-family: Arial, sans-serif;">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>${title}</title>
      </head>
      <body style="background-color: #f9f9f9; padding: 20px;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #333;">${title}</h2>
          <p style="font-size: 16px; line-height: 24px; color: #555;">Hello Admin,</p>
          <p style="font-size: 16px; line-height: 24px; color: #555;">You have a new waitlist request from:</p>
          <div style="background: #f4f4f4; padding: 10px; border-radius: 5px;">
            <p style="font-size: 16px; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="font-size: 16px; margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          <p style="font-size: 16px; line-height: 24px; color: #555; margin-top: 20px;">Best regards,</p>
          <p style="font-size: 16px; font-weight: bold; color: #333;">Team Asian Embrace</p>
        </div>
      </body>
    </div>
  `;
};

exports.welcomeTemplate = ({
    name = '',
    email = '',
}) => {
    return `
    <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(dark_fade.png);background-repeat: no-repeat;border-radius: 20px;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                     <tr>
                        <td style="padding: 0 30px 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/img1.png" width="100%" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr>                    
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:24px;line-height:50px;padding:5px 35px;font-weight:500;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Thank you for joining Asian Embrace! We're thrilled to have you on board as part of our community, where genuine connections with Asian women await.
                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Our platform is designed to be simple, authentic, and supportive—whether you're looking for love, companionship, or just a friendly conversation.
                        </td>
                     </tr> 
                  
                     
                      <tr>
                        <td style="padding: 7px;"></td>
                     </tr> 

                     <tr>
                                 <td style="font-size: 14px;padding: 20px 0;text-align: center;"><a href="https://stage.tasksplan.com:9090/discover" style="background-color: #D52D3A;color: #FFFFFF;padding: 15px 70px;text-decoration: none;border-radius: 50px;">Get Started and Explore </a></td>
                              </tr>

                      <tr>
                        <td style="padding: 13px;"></td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you have any questions or need support, we're here to help. Just reply to this email or visit our support page.
                        </td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Welcome to a world of love, friendship, and meaningful connections!</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                         <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr>
                        <td>
                           <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:530px;background-color:#fff;">

                              <tr>
                                 <td style="border-top: 1px solid #F3F3F3;border-bottom: 1px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                    <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                 </td>
                              </tr>   
                              <tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                              <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:11px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">© 2025 Asian Embrace. All rights reserved.</td>
                     </tr>          
                      <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:12px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">You're receiving this email because you are a subscriber of AsianEmbrace.com If you feel you received it by mistake or wish to unsubscribe, click here</td>
                     </tr>       
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:10px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">
                           <a href="#" style="color: #333;margin-right: 10px;">Privacy policy</a> <a href="#" style="color: #333;margin-right: 10px;">Terms of service</a> <a href="#" style="color: #333;margin-right: 10px;">Help center</a> <a href="#" style="color: #333;">Unsubscribe</a>
                        </td>
                     </tr>   
                     <tr>
                        <td style="padding: 5px 13px;"></td>
                     </tr>                        
                           </table>
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
  `;
};

exports.welcomeTemplateFemale = ({
    name = '',
    email = '',
}) => {
    return `
     <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(dark_fade.png);background-repeat: no-repeat;border-radius: 20px;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                     <tr>
                        <td style="padding: 0 30px 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/img1.png" width="100%" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr>                    
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:24px;line-height:50px;padding:5px 35px;font-weight:500;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We’re so excited to have you join Asian Embrace! Our platform is all about creating genuine connections with kind and respectful Western men who are looking for love, friendship, or companionship.
                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">You can get started right away by completing your profile and exploring potential matches. It’s completely free for you, and our team is here to support you every step of the way.</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">✨ Ready to Meet Someone Special? ✨</td>
                     </tr>
                  
                     
                      <tr>
                        <td style="padding: 7px;"></td>
                     </tr> 

                     <tr>
                                 <td style="font-size: 14px;padding: 20px 0;text-align: center;"><a href="https://stage.tasksplan.com:9090/discover" style="background-color: #D52D3A;color: #FFFFFF;padding: 15px 70px;text-decoration: none;border-radius: 50px;">Complete Your Profile</a></td>
                              </tr>

                      <tr>
                        <td style="padding: 13px;"></td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you ever need help or have any questions, just reply to this email or visit our support page.</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We’re so glad to have you with us and can’t wait to see the wonderful connections you’ll make!</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                         <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr>
                        <td>
                           <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:530px;background-color:#fff;">

                              <tr>
                                 <td style="border-top: 1px solid #F3F3F3;border-bottom: 1px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                    <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                 </td>
                              </tr>   
                              <tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                              <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:11px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">© 2025 Asian Embrace. All rights reserved.</td>
                     </tr>          
                      <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:12px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">You're receiving this email because you are a subscriber of AsianEmbrace.com If you feel you received it by mistake or wish to unsubscribe, click here</td>
                     </tr>       
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:10px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">
                           <a href="#" style="color: #333;margin-right: 10px;">Privacy policy</a> <a href="#" style="color: #333;margin-right: 10px;">Terms of service</a> <a href="#" style="color: #333;margin-right: 10px;">Help center</a> <a href="#" style="color: #333;">Unsubscribe</a>
                        </td>
                     </tr>   
                     <tr>
                        <td style="padding: 5px 13px;"></td>
                     </tr>                        
                           </table>
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
   `;
};

exports.verificationRequiredTemplate = ({
    name = '',
    email = '',
}) => {
    return `
     <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6 ; " border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(dark_fade.png);background-repeat: no-repeat;    border-radius: 20px; overflow: hidden;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                                    
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:24px;line-height:50px;padding:5px 35px;font-weight:500;">Verify Your Account!</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400; padding-top: 10px;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 25px;font-weight:400;">Thank you for joining Asian Embrace! Before you can start connecting with kind and respectful Western men, we need to verify your account.</td>
                     </tr>
                

                     <tr>
                                 <td style="font-size: 14px;padding: 20px 0;text-align: center;"><a href="https://stage.tasksplan.com:9090/discover" style="background-color: #D52D3A;color: #FFFFFF;padding: 15px 70px;text-decoration: none;border-radius: 50px; "> Verify Your Account</a></td>
                              </tr>

                      <tr>
                        <td style="padding: 13px;"></td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Verification helps us keep our community genuine and safe. It only takes a minute!</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you need any help or have questions, just reply to this email. We’re here to support you every step of the way.</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We can’t wait to see you make real connections and start your journey with us!</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                        <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                        <td>
                            <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="width:530px;background-color:#fff;">
        
                                <tr style="width:530px;">
                                    <td
                                        style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                        <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                            src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                    </td>
                                </tr>
                                
        
                                <tr>
                                    <td style="padding: 10px;"></td>
                                </tr>
                                <tr>
                       
                                </tr>
                            </table>
                        </td>
                    </tr>
                 
        <tr style="background-color: #FEF2F3;">
                        <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
                    
                    </tr>
                    <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                        <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
                    
                    </tr>
         
                   
                </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
   `;
};

exports.profileUnverifiedTemplate = ({
    name = '',
    email = '',
}) => {
    return `
     <html>

<head>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
</head>

<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
    <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0"
        role="presentation">
        <tbody>
            <tr>
                <td style="padding: 30px 0;">
                    <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="width:600px;background: #fff ;background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                        <thead>
                            <tr>
                                <td style="padding: 30px;">
                                    <img alt=""
                                        src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png"
                                        width="266" height="auto" border="0" hspace="0" vspace="0"
                                        style="display:block;vertical-align:top;margin: 0 auto;">
                                </td>
                            </tr>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:24px;line-height:50px;padding:5px 35px;font-weight:500;text-align: center;">
                                    Verification Unsuccessful</td>
                            </tr>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                                    Hi ${name},</td>
                            </tr>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                                    Thank you for submitting your photo for verification on Asian Embrace.
                                    Unfortunately, it did not meet our requirements. </td>

                            </tr>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                                    To complete your account verification, we need a clear selfie of you giving a thumbs
                                    up. This helps us ensure every profile is genuine and keeps our community safe.
                                </td>

                            </tr>
                            <tr>
                                <td width="100%" align="center" style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px; font-weight:400;display: flex;     gap: 13px;
                        justify-content: center; 
                         margin: 24px 0;">
                                    <img alt=""
                                        src="https://stage.tasksplan.com:8888/public/email-template/verify_unsucc_vact_1.png"
                                        width="50%" height="auto" border="0"
                                        style="display:block;vertical-align:top; width: 40%;">
                                    <img alt=""
                                        src="https://stage.tasksplan.com:8888/public/email-template/verify_unsucc_vact_2.png"
                                        width="50%" height="auto" border="0"
                                        style="display:block;vertical-align:top; width: 40%;">
                                </td>

                            </tr>

            </tr>
            <tr>
                <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 3px;font-weight:600; display: flex;
                        align-items: center ; gap: 5px; margin-bottom: 12px;"> Verification Photo Guidelines:</td>
            </tr>
            <tr>
                <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 3px;font-weight:400; display: flex;
                        align-items: center ; gap: 5px; margin-bottom: 12px;"><img alt=""
                        src="https://stage.tasksplan.com:8888/public/email-template/tick_2.svg" height="auto" border="0"
                        style="display:block;vertical-align:top; width: 20px;"> Your face and the thumbs-up gesture must
                    be clearly visible.</td>
            </tr>
            <tr>
                <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 3px;font-weight:400; display: flex;
                        align-items: center ; gap: 5px; margin-bottom: 12px;"><img alt=""
                        src="https://stage.tasksplan.com:8888/public/email-template/tick_2.svg" height="auto" border="0"
                        style="display:block;vertical-align:top; width: 20px;"> No filters, heavy edits, or
                    obstructions.</td>
            </tr>
            <tr>
                <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 3px;font-weight:400; display: flex;
                        align-items: center ; gap: 5px; margin-bottom: 12px;"><img alt=""
                        src="https://stage.tasksplan.com:8888/public/email-template/tick_2.svg" height="auto" border="0"
                        style="display:block;vertical-align:top; width: 20px;"> Good lighting and a clear image.</td>
            </tr>
            <tr>
                <td style="padding: 13px;"></td>
            </tr>
            <tr>
                <td style="font-size: 16px;text-align: center;"><a href="https://stage.tasksplan.com:9090/discover"
                        style="background-color: #D52D3A;color: #FFFFFF; text-decoration: none;padding: 12px 24px;border-radius: 50px;display: flex;justify-content: center; width: fit-content; margin: auto; ">Upload
                        Your Photo Again</a></td>
            </tr>
            <tr>
                <td style="padding: 13px;"></td>
            </tr>


            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                    If you have any questions or need support, just reply to this email. We’re here to help! </td>

            </tr>
            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                    Thank you for helping us create a welcoming and authentic community. </td>

            </tr>
            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 0;font-weight:400;">
                    Warm regards,</td>
            </tr>
            <tr>
                <td
                    style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 15px;font-weight:500;">
                    The Asian Embrace Team</td>
            </tr>
            <tr>
                <td style="padding: 13px;"></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="width:530px;background-color:#fff;">

                        <tr style="width:530px;">
                            <td
                                style="border-top: 1px solid #F3F3F3;border-bottom: 1px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img
                                    src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img
                                    src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                    src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                            </td>
                        </tr>


                        <tr>

                        </tr>
                        <tr>

                        </tr>
                    </table>
                </td>
            </tr>

            <tr style="background-color: #FEF2F3;">
                <td
                    style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">
                    You're receiving this email because you are a subscriber of AsianEmbrace.com</td>

            </tr>
            <tr style="background-color: #FEF2F3;">
                <td
                    style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">
                    If you feel you received it by mistake or wish to unsubscribe, <a href=""
                        style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>

            </tr>


        </tfoot>


        </td>
        </tr>
        </tbody>

    </table>
</body>

</html>
   `;
};

exports.profileVerifiedTemplate = ({
    name = '',
    email = '',
}) => {
    return `
     <html>

<head>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
</head>

<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
    <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0"
        role="presentation">
        <tbody>
            <tr>
                <td style="padding: 30px 0;">
                    <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0"
                        role="presentation"
                        style="width:600px;background: #fff; background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                        <thead>
                            <tr>
                                <td style="padding: 30px;">
                                    <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0"
                                        vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 0px;">
                                    <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/succ_correct_vact.png" width="266" height="auto" border="0" hspace="0"
                                        vspace="0" style="display:block;vertical-align:top;margin: 0 auto; width: 100px; height: 100px;">
                                </td>
                            </tr>
                            <tr>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:22px;line-height:50px;padding:5px 35px;font-weight:500;text-align: center;">
                                    Verification Successful on Asian Embrace</td>
                            </tr>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:10px 35px 15px;font-weight:400;">
                                    Hi ${name},</td>
                            </tr>
                            <tr>
                                <td
                                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                                    Great news! Your account has been successfully verified, and you're now ready to start connecting with kind and genuine Western men on Asian Embrace. </td>
                            </tr>

                        

            </tr>
          
            <tr>
                <td style="padding: 13px;"></td>
            </tr>
            <tr  >
                <td style="font-size: 16px;text-align: center;"><a href="https://stage.tasksplan.com:9090/discover"
                        style="background-color: #D52D3A;color: #FFFFFF; text-decoration: none;padding: 12px 40px;border-radius: 50px;display: flex;justify-content: center; width: fit-content; margin: auto; ">Get started</a></td>
            </tr>
            <tr>
                <td style="padding: 16px;"></td>
            </tr>
            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                    We’re excited to see the connections, friendships, and meaningful moments you’ll create. </td>
            </tr>
            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">
                    Thank you for being part of our community. </td>
            </tr>

            <tr>
                <td style="padding: 13px;"></td>
            </tr>

            <tr>
                <td
                    style="color:#000;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 0;font-weight:400;">
                    Warm regards,</td>
            </tr>
            <tr>
                <td
                    style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:16px;line-height:24px;padding:0px 35px 15px;font-weight:500;">
                    The Asian Embrace Team</td>
            </tr>
            <tr>
                <td style="padding: 13px;"></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                        role="presentation" style="width:530px;background-color:#fff;">

                        <tr style="width:530px;">
                            <td
                                style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                    src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                            </td>
                        </tr>
                        

                        <tr>
                            <td style="padding: 10px;"></td>
                        </tr>
                        <tr>
               
                        </tr>
                    </table>
                </td>
            </tr>
         
<tr style="background-color: #FEF2F3;">
                <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
            
            </tr>
            <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
            
            </tr>
 
           
        </tfoot>
        
      
    </td>
    </tr>
    </tbody>

    </table>
</body>

</html>
   `;
};

exports.emailAddressChangeTemplate = ({
    name = '',
    email = '',
    userEmail = ''
}) => {
    return `
     <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png);background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                                      
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;text-align:center;font-size:24px;line-height:50px;padding:20px 35px 10px;font-weight:500;">Your Email Address Has Been Updated </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We wanted to let you know that your email address was successfully updated on Asian Embrace. From now on, you’ll receive all communications at ${userEmail}.
                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you did not request this change, please contact our support team immediately to secure your account.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We’re here to help if you need any assistance—just reply to this email.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Thank you for being a part of the Asian Embrace community!

                        </td>
                     </tr>
                     </tr>
                    
                      <tr>
                        <td style="padding: 8px;"></td>
                     </tr> 

                
                     

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                        <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                        <td>
                            <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="width:530px;background-color:#fff;">
        
                                <tr style="width:530px;">
                                    <td
                                        style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                        <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                            src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                    </td>
                                </tr>
                                
        
                                <tr>
                                    <td style="padding: 10px;"></td>
                                </tr>
                                <tr>
                       
                                </tr>
                            </table>
                        </td>
                    </tr>
                 
        <tr style="background-color: #FEF2F3;">
                        <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
                    
                    </tr>
                    <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                        <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
                    
                    </tr>
         
                   
                </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
   `;
};

exports.passwordChangeTemplate = ({
    name = '',
    email = '',
}) => {
    return `
     <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png);background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                                      
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;text-align:center;font-size:24px;line-height:50px;padding:20px 35px 10px;font-weight:500;">Your Password Has Been Changed </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We wanted to let you know that your password was successfully changed. If you made this change, no further action is needed.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you did not request a password change, please contact our support team immediately to secure your account.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We’re here to help if you need any assistance—just reply to this email.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Thank you for being a part of the Asian Embrace community!

                        </td>
                     </tr>
                     </tr>
                    
                      <tr>
                        <td style="padding: 8px;"></td>
                     </tr> 

                
                     

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                        <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                        <td>
                            <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="width:530px;background-color:#fff;">
        
                                <tr style="width:530px;">
                                    <td
                                        style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                        <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                            src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                    </td>
                                </tr>
                                
        
                                <tr>
                                    <td style="padding: 10px;"></td>
                                </tr>
                                <tr>
                       
                                </tr>
                            </table>
                        </td>
                    </tr>
                 
        <tr style="background-color: #FEF2F3;">
                        <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
                    
                    </tr>
                    <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                        <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
                    
                    </tr>
         
                   
                </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
   `;
};

exports.loginReminderTemplate = ({
   name = '',
   email = '',
}) => {
   return `
    <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png);background-repeat: no-repeat;border-radius: 20px;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                     <tr>
                        <td style="padding: 0 30px 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/img1.png" width="100%" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr>                    
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:24px;line-height:50px;padding:5px 35px;font-weight:500;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">We noticed you haven’t been active on Asian Embrace recently. There are new and genuine Asian women ready to connect, and you could be just one message away from finding that special connection.</td>
                     </tr>
                      
               

                     <tr>
                                 <td style="font-size: 14px;padding: 20px 0;text-align: center;"><a href="https://stage.tasksplan.com:9090/login" style="background-color: #D52D3A;color: #FFFFFF;padding: 15px 70px;text-decoration: none;border-radius: 50px;">Log In Now</a></td>
                              </tr>

                      <tr>
                        <td style="padding: 13px;"></td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Don’t miss out on the chance to build meaningful relationships, whether you’re looking for love, companionship, or just good conversation.</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you need any help, just reply to this email. We’re here to support you!</td>
                     </tr>

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                         <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                     <tr>
                        <td>
                           <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:530px;background-color:#fff;">

                              <tr>
                                 <td style="border-top: 1px solid #F3F3F3;border-bottom: 1px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                    <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                 </td>
                              </tr>   
                              <tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                              <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:11px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">© 2025 Asian Embrace. All rights reserved.</td>
                     </tr>          
                      <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:12px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">You're receiving this email because you are a subscriber of AsianEmbrace.com If you feel you received it by mistake or wish to unsubscribe, click here</td>
                     </tr>       
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:10px;line-height:24px;padding:0px 35px 15px;font-weight:400;text-align: center;">
                           <a href="#" style="color: #333;margin-right: 10px;">Privacy policy</a> <a href="#" style="color: #333;margin-right: 10px;">Terms of service</a> <a href="#" style="color: #333;margin-right: 10px;">Help center</a> <a href="#" style="color: #333;">Unsubscribe</a>
                        </td>
                     </tr>   
                     <tr>
                        <td style="padding: 5px 13px;"></td>
                     </tr>                        
                           </table>
                        </td>
                     </tr>
                  </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
  `;
};

exports.accountDeactivateTemplate = ({
   name = '',
   email = '',
}) => {
   return `
    <html>
<head>
<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
</head>
<body style="padding: 0;margin: 0;font-family: 'Poppins', sans-serif;background-color:#E3EDF6;">
   <table width="100%" bgcolor="#E3EDF6" style="background-color:#E3EDF6" border="0" cellpadding="0" cellspacing="0" role="presentation">
      <tbody>
         <tr>
            <td style="padding: 30px 0;">
               <table bgcolor="#fff" align="center" width="600" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;background: #fff;background-image: url(https://stage.tasksplan.com:8888/public/email-template/dark_fade.png);background-repeat: no-repeat;border-radius: 20px; overflow: hidden;">
                  <thead>
                     <tr>
                        <td style="padding: 30px;">
                           <img alt="" src="https://stage.tasksplan.com:8888/public/email-template/logo-new.png" width="266" height="auto" border="0" hspace="0" vspace="0" style="display:block;vertical-align:top;margin: 0 auto;">
                        </td>
                     </tr> 
                                      
                  </thead>
                  <tbody>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;text-align:center;font-size:24px;line-height:40px;padding:20px 35px 10px;font-weight:500;">Your Account Has Been Deactivated on Asian Embrace </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Hi ${name},</td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Your account on Asian Embrace has been successfully deactivated. Your profile is now hidden, and you will no longer receive messages.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Please note: All your data will be permanently deleted after 30 days. After this period, your account cannot be reactivated, and all information, including your profile and messages, will be permanently removed.


                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">If you did not request this or if you need any assistance, please contact our support team immediately.

                        </td>
                     </tr>
                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:400;">Thank you for being a part of our community. We wish you all the best!

                        </td>
                     </tr>
                     </tr>
                    
                      <tr>
                        <td style="padding: 8px;"></td>
                     </tr> 

                
                     

                     <tr>
                        <td style="color:#000;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 0;font-weight:400;">Warm regards,</td>
                     </tr>
                     <tr>
                        <td style="color:#DC323F;font-family: 'Poppins', sans-serif;font-size:14px;line-height:24px;padding:0px 35px 15px;font-weight:500;">The Asian Embrace Team</td>
                     </tr>
<tr>
                        <td style="padding: 13px;"></td>
                     </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                        <td>
                            <table bgcolor="#fff" align="center" width="530" border="0" cellpadding="0" cellspacing="0"
                                role="presentation" style="width:530px;background-color:#fff;">
        
                                <tr style="width:530px;">
                                    <td
                                        style="border-top: 1px solid #F3F3F3;border-bottom: 0px solid #F3F3F3;padding: 25px 0 15px;text-align: center;">
                                        <img src="https://stage.tasksplan.com:8888/public/email-template/Social1.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/insta2.png" /> <img src="https://stage.tasksplan.com:8888/public/email-template/Social3.png" /> <img
                                            src="https://stage.tasksplan.com:8888/public/email-template/Social4.png" />
                                    </td>
                                </tr>
                                
        
                                <tr>
                                    <td style="padding: 10px;"></td>
                                </tr>
                                <tr>
                       
                                </tr>
                            </table>
                        </td>
                    </tr>
                 
        <tr style="background-color: #FEF2F3;">
                        <td style="padding: 16px 40px 0;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">You're receiving this email because you are a subscriber of AsianEmbrace.com</td>
                    
                    </tr>
                    <tr style="background-color: #FEF2F3; border-radius: 0 0 20px 20px;">
                        <td style="padding: 0 40px 16px;color: #000; font-family: 'Poppins', sans-serif; font-size: 13.2px; line-height: 24px;">If you feel you received it by mistake or wish to unsubscribe, <a href="" style="color: black; font-weight: 600; text-decoration: none;">click here</a></td>
                    
                    </tr>
         
                   
                </tfoot>
               </table>
            </td>
         </tr>
      </tbody>
   </table>
</body>
</html>
  `;
};




