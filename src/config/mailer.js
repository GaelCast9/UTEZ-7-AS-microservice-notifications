// src/config/mailer.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// --- DEBUG: VERIFICAR VARIABLES (Solo imprimirá los primeros caracteres) ---
const emailUser = process.env.EMAIL_USER || "NO_DEFINIDO";
const emailPass = process.env.EMAIL_PASS || "NO_DEFINIDO";
console.log(`📧 Intentando conectar con usuario: ${emailUser}`);
console.log(`🔑 Longitud de contraseña: ${emailPass.length} caracteres`);
// -----------------------------------------------------------------------

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Volvemos al 465 (SSL Directo)
    secure: true, // TRUE para 465
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    // COMBO DE FUERZA BRUTA PARA RED:
    family: 4, // Forzar IPv4
    tls: {
        rejectUnauthorized: false, // Ignorar errores menores de certificado
        ciphers: 'SSLv3' // A veces ayuda con handshakes antiguos
    },
    // Tiempos de espera cortos para que no se quede colgado eternamente
    connectionTimeout: 10000, 
    greetingTimeout: 10000,
    socketTimeout: 10000
});

// Verificar conexión al iniciar
transporter.verify().then(() => {
    console.log('✅ Listo para enviar correos (Config: 465 + IPv4)');
}).catch((err) => {
    console.error('❌ Error configurando el correo:', err);
});

module.exports = transporter;