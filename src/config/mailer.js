// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// CAMBIO: Usamos configuración explícita en lugar de service: 'gmail'
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Puerto seguro SSL (Más estable en Render)
    secure: true, // true para el puerto 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // Opcional: Agregamos logs para ver más detalles si falla
    logger: true,
    debug: true
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('✅ Listo para enviar correos');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;