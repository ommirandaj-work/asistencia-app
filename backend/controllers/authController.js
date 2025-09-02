const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Función auxiliar para generar un token JWT
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// @desc    Registrar un nuevo usuario
// @route   POST /api/auth/register
// @access  Public
exports.login = async (req, res) => {
    const { username, password } = req.body;

    // 1. Añade esta línea para ver la contraseña que el backend recibe
    console.log('Password received:', password);

    try {
        // Encuentra al usuario por su nombre de usuario
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // 2. Añade esta línea para ver la contraseña encriptada de la BD
        console.log('Password from DB:', user.password);

        // Compara la contraseña recibida con la de la base de datos
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }
        //...
    } catch (error) {
        //...
    }
};

// @desc    Autenticar un usuario y obtener un token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {
            res.status(401).json({ message: 'Credenciales inválidas.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error en el login.' });
    }
};