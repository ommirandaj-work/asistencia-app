const Asistencia = require('../models/Asistencia');

exports.registrarAsistencia = async (req, res) => {
    const { tecnicoId, tipo, modalidad, geolocalizacion, foto_url } = req.body;
    const hora_registro = new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', hour12: false});
    
    try {
        const nuevaAsistencia = new Asistencia({
            tecnico: tecnicoId,
            tipo,
            modalidad,
            geolocalizacion,
            foto_url,
            hora_registro,
        });

        await nuevaAsistencia.save();
        res.status(201).json({ mensaje: 'Asistencia registrada con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la asistencia.' });
    }
};