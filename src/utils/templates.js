// src/utils/templates.js

const getWelcomeTemplate = (name) => {
    return `
        <h1>¡Bienvenido a SVCBDE, ${name}!</h1>
        <p>Tu cuenta ha sido creada exitosamente.</p>
        <p>Ahora puedes iniciar sesión para ver los mejores eventos y adquirir tus boletos.</p>
    `;
};

const getTicketTemplate = (ticketData, qrImage) => {
    // ticketData incluye: evento, fecha, lugar, asiento, usuario
    return `
        <div style="border: 2px solid #333; padding: 20px; max-width: 600px; font-family: Arial;">
            <h2 style="color: #077187;">Tu Boleto Digital - SVCBDE</h2>
            <hr/>
            <h3>Evento: ${ticketData.evento}</h3>
            <p><strong>Fecha:</strong> ${ticketData.fecha}</p>
            <p><strong>Lugar:</strong> ${ticketData.lugar}</p>
            <p><strong>Asiento/Zona:</strong> ${ticketData.asiento} (${ticketData.zona})</p>
            <hr/>
            <div style="text-align: center; margin: 20px;">
                <p>Presenta este código QR en la entrada:</p>
                <img src="${qrImage}" alt="Código QR de Acceso" style="width: 200px; height: 200px;"/>
                <p style="font-size: 12px; color: grey;">ID Boleto: ${ticketData.boletoId}</p>
            </div>
            <p style="font-size: 12px;">Este boleto es personal e intransferible.</p>
        </div>
    `;
};

// --- AQUÍ ESTÁ EL CAMBIO ---
const getPromotionTemplate = (promoData) => {
    let tituloOferta = '';

    // Definimos qué texto mostrar según el tipo
    switch (promoData.type) {
        case 'PERCENTAGE':
            tituloOferta = `${promoData.valor}% DE DESCUENTO`;
            break;
        case 'FLAT_DISCOUNT':
            tituloOferta = `$${promoData.valor} DE DESCUENTO`;
            break;
        case '2x1':
            tituloOferta = '¡PAGA 1 Y LLÉVATE 2!';
            break;
        case 'FREE_SHIPPING':
            tituloOferta = '¡ENVÍO GRATIS!';
            break;
        default:
            tituloOferta = '¡OFERTA ESPECIAL!';
    }

    return `
        <div style="font-family: Arial; padding: 20px; background-color: #f4f4f4;">
            <div style="background-color: white; padding: 20px; border-radius: 10px; text-align: center;">
                <h1 style="color: #ff5722;">¡Nueva Promoción: ${promoData.nombre}!</h1>
                <p style="font-size: 16px; color: #555;">${promoData.descripcion}</p>
                
                <div style="background-color: #e0f7fa; padding: 20px; border-radius: 8px; margin: 20px auto; max-width: 80%;">
                    <h2 style="color: #006064; margin: 0;">${tituloOferta}</h2>
                    
                    <p style="margin-top: 10px; font-size: 14px;">
                        Válido del ${promoData.fechaInicio} al ${promoData.fechaFin}
                    </p>
                </div>
                
                <p style="font-weight: bold;">¡Aprovecha antes de que se agoten!</p>
            </div>
        </div>
    `;
};

module.exports = { getWelcomeTemplate, getTicketTemplate, getPromotionTemplate };