const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas de autenticación
const authRoutes = require('./routes/authRoutes');

// Usar las rutas
app.use('/api/auth', authRoutes);

// Conexión a la base de datos de MongoDB (este código ya lo tienes)
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Conexión a MongoDB exitosa'))
.catch(err => console.error('❌ Error de conexión a MongoDB:', err));

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});