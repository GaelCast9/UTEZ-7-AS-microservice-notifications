// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        ciphers: 'SSLv3',
        rejectUnauthorized: false
    },
    // Tiempos de espera estándar
    connectionTimeout: 10000,
    greetingTimeout: 10000
});

transporter.verify().then(() => {
    console.log('✅ Listo para enviar correos (Outlook/Hotmail)');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;