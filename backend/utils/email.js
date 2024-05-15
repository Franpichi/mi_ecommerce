const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
    const msg = {
        to: to,
        from: 'francopizzichini15@gmail.com', 
        subject: subject,
        text: text,
    };

    try {
        await sgMail.send(msg);
        console.log('Correo electrónico enviado con éxito');
    } catch (error) {
        console.error('Error al enviar el correo electrónico:', error);
        throw new Error('Error al enviar el correo electrónico');
    }
};

module.exports = sendEmail;
