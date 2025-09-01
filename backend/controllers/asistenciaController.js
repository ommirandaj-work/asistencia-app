const Asistencia = require('../models/Asistencia');

exports.registrarAsistencia = async (req, res) => {
    const { tecnicoId, tipo, modalidad, geolocalizacion, foto_url } = req.body;
    const hora_registro = new Date().toTimeString().slice(0, 5);

    try {
        // Aquí puedes agregar lógica para verificar tardanza,
        // pero la dejaremos simple por ahora para la prueba.

        const nuevaAsistencia = new Asistencia({
            tecnico: tecnicoId,
            tipo,
            modalidad,
            geolocalizacion,
            foto_url,
            hora_registro,
            // Los campos de tardanza los puedes dejar con valores por defecto
        });

        await nuevaAsistencia.save();
        res.status(201).json({ mensaje: 'Asistencia registrada con éxito.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar la asistencia.' });
    }
};