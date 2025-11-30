// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // --- ESTA ES LA CLAVE PARA ARREGLAR EL TIMEOUT ---
    family: 4, // Fuerza a usar IPv4 y evita problemas de red con Node v17+
    // -------------------------------------------------
    tls: {
        rejectUnauthorized: false
    },
    // Tiempos de espera estándar
    connectionTimeout: 10000, 
    greetingTimeout: 10000
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('✅ Listo para enviar correos (IPv4 forzado)');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;