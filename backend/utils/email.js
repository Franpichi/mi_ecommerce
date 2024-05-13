//utils/email.js
const sgMail = require('@sendgrid/mail');

// Configurar la API Key de SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Función para enviar correo electrónico
const sendEmail = async (to, subject, text) => {
    const msg = {
        to: to,
        from: 'francopizzichini15@gmail.com', // Debe ser una dirección de correo verificada en SendGrid
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
