const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json()); // <--- DEBE ESTAR AQUÍ
app.use(cors()); 

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/asistencia', asistenciaRoutes);

// Conexión a la base de datos de MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});