const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ruta para registrar un nuevo usuario
router.post('/register', authController.registerUser);

// Ruta para el inicio de sesión
router.post('/login', authController.loginUser);

module.exports = router;