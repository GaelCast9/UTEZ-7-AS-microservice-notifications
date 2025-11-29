// src/utils/qrGenerator.js
const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        // Genera una URL de datos (data:image/png;base64,...)
        const qrImage = await QRCode.toDataURL(text);
        return qrImage;
    } catch (err) {
        console.error('Error generando QR:', err);
        return null;
    }
};

module.exports = generateQRCode;