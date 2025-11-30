const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('notifications', require('./routes/notificationRoutes'));

const PORT = process.env.PORT || 4002; // Usamos otro puerto distinto al de promos (4000)
app.listen(PORT, () => {
    console.log(`Servidor de Notificaciones corriendo en puerto ${PORT}`);
});