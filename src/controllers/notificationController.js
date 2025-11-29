// src/controllers/notificationController.js
const transporter = require('../config/mailer');
const generateQRCode = require('../utils/qrGenerator');
const { getWelcomeTemplate, getTicketTemplate, getPromotionTemplate } = require('../utils/templates');

// 1. Enviar correo de Bienvenida
exports.sendWelcomeEmail = async (req, res) => {
    try {
        const { email, name } = req.body;

        const mailOptions = {
            from: `"SVCBDE Soporte" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '¡Bienvenido a SVCBDE!',
            html: getWelcomeTemplate(name)
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Correo de bienvenida enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error al enviar correo', error: error.message });
    }
};

// 2. Enviar Boleto con QR (MODIFICADO PARA GMAIL)
exports.sendTicketEmail = async (req, res) => {
    try {
        const { email, ticketData } = req.body;
        
        // 1. Generamos el string del QR (Base64)
        const qrImageBase64 = await generateQRCode(ticketData.boletoId);

        // 2. Definimos un ID único para la imagen interna
        const cid_image = 'unique-qr-code-id'; 

        const mailOptions = {
            from: `"SVCBDE Boletos" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `Tus boletos para: ${ticketData.evento}`,
            // 3. En el HTML, en lugar de pasar la imagen larga, pasamos la referencia 'cid:...'
            html: getTicketTemplate(ticketData, `cid:${cid_image}`),
            // 4. Adjuntamos la imagen real
            attachments: [
                {
                    filename: 'boleto-qr.png',
                    path: qrImageBase64, // Nodemailer entiende el data URI aquí
                    cid: cid_image // Esto conecta el adjunto con el HTML
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        res.status(200).json({ msg: 'Boleto enviado con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error enviando boleto', error: error.message });
    }
};

// 3. Enviar Promoción Masiva
exports.sendPromotionEmail = async (req, res) => {
    try {
        const { emails, promoData } = req.body;

        if (!emails || emails.length === 0) {
            return res.status(400).json({ msg: 'No hay destinatarios' });
        }

        const htmlContent = getPromotionTemplate(promoData);

        const mailOptions = {
            from: `"SVCBDE Promociones" <${process.env.EMAIL_USER}>`,
            bcc: emails, 
            subject: `¡Oferta Especial: ${promoData.nombre}!`,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);
        
        res.status(200).json({ 
            msg: 'Promoción enviada masivamente', 
            count: emails.length 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error enviando promoción', error: error.message });
    }
};