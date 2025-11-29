// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Creamos el "transporte" (el cartero)
const transporter = nodemailer.createTransport({
    service: 'gmail', // O 'hotmail', o tu servidor SMTP corporativo
    auth: {
        user: process.env.EMAIL_USER, // Tu correo
        pass: process.env.EMAIL_PASS  // Tu contraseña de aplicación (NO la normal)
    }
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('Listo para enviar correos');
}).catch((err) => {
    console.error('Error configurando el correo:', err);
});

module.exports = transporter;