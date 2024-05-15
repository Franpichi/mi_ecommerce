const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (emailDetails) => {
  try {
    const msg = {
      to: emailDetails.toEmail,
      from: 'francopizzichini15@gmail.com',
      subject: emailDetails.subject,
      text: emailDetails.text,
      html: emailDetails.html,
    };

    await sgMail.send(msg);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
