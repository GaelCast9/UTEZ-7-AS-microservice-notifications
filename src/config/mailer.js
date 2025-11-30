// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('✅ Localhost: Listo para enviar correos con Gmail');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;