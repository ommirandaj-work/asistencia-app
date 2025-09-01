const mongoose = require('mongoose');

const AsistenciaSchema = new mongoose.Schema({
    tecnico: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    fecha_registro: { 
        type: Date, 
        default: Date.now 
    },
    hora_registro: { 
        type: String, 
        required: true 
    },
    tipo: { 
        type: String, 
        enum: ['Entrada', 'Salida'], 
        required: true 
    },
    modalidad: { 
        type: String, 
        enum: ['Presencial', 'Remota'], 
        required: true 
    },
    geolocalizacion: {
        lat: Number,
        lon: Number
    },
    foto_url: { 
        type: String 
    },
    tardanza: { 
        type: Boolean, 
        default: false 
    },
    motivo_tardanza: { 
        type: String 
    },
    tiempo_tardanza_min: { 
        type: Number 
    }
});

module.exports = mongoose.model('Asistencia', AsistenciaSchema);