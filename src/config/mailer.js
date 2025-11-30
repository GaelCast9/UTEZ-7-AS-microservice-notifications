// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587, // Puerto estándar para STARTTLS
    secure: false, // DEBE ser false para el puerto 587
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        // No fallar si el certificado tiene problemas menores
        rejectUnauthorized: false 
    },
    // Aumentamos los tiempos de espera para evitar cortes prematuros
    connectionTimeout: 10000, // 10 segundos
    greetingTimeout: 10000,
    socketTimeout: 10000
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('✅ Listo para enviar correos (Puerto 587)');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;