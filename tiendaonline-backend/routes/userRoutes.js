const express = require('express');
const { register, login, getProfile } = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Registro de usuario con validaciones
router.post('/register', 
    [
        body('nombre').trim().isLength({ min: 3 }).escape().withMessage('El nombre debe tener al menos 3 caracteres'),
        body('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
        body('rol').isIn(['admin', 'cliente']).withMessage('Rol inválido')
    ],
    register
);

// Inicio de sesión con validaciones
router.post('/login', 
    [
        body('email').isEmail().normalizeEmail().withMessage('Debe ser un email válido'),
        body('password').notEmpty().withMessage('La contraseña es obligatoria')
    ], 
    login
);

// Obtener perfil del usuario autenticado
router.get('/profile', authMiddleware, getProfile);

module.exports = router;

