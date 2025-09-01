const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');

router.post('/registrar', asistenciaController.registrarAsistencia);

module.exports = router;