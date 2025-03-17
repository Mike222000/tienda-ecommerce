const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { body, validationResult } = require('express-validator'); // Validación de inputs
require('dotenv').config();

// Registrar usuario con validación y sanitización
exports.register = async (req, res) => {
    try {
        // Validar datos de entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Datos inválidos', details: errors.array() });
        }

        let { nombre, email, password, rol } = req.body;

        // Sanitizar el nombre para evitar XSS
        const sanitizedNombre = nombre.replace(/<[^>]+>/g, ''); // Elimina etiquetas HTML potencialmente dañinas

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ error: 'El email ya está registrado' });
        }

        // Encriptar la contraseña de manera segura
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear usuario
        const newUser = await User.create({
            nombre: sanitizedNombre,
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({ 
            message: 'Usuario registrado exitosamente', 
            usuario: { id: newUser.id, nombre: newUser.nombre, email: newUser.email, rol: newUser.rol } 
        });
    } catch (error) {
        console.error('❌ Error al registrar usuario:', error);
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
};

// Iniciar sesión con JWT seguro
exports.login = async (req, res) => {
    try {
        let { email, password } = req.body;

        // Validar email y password
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Datos inválidos', details: errors.array() });
        }

        // Buscar usuario en la base de datos
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Comparar la contraseña encriptada
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Usuario o contraseña incorrectos' });
        }

        // Verificar que JWT_SECRET está definido antes de usarlo
        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ error: 'Configuración de servidor incorrecta. Falta JWT_SECRET.' });
        }

        // Generar token JWT seguro
        const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('❌ Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión', details: error.message });
    }
};

// Obtener perfil del usuario autenticado
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'nombre', 'email', 'rol', 'createdAt'],
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        // Responder con datos sanitizados
        res.json({
            id: user.id,
            nombre: user.nombre.replace(/<[^>]+>/g, ''), // Sanitizar solo nombre
            email: user.email,
            rol: user.rol,
            createdAt: user.createdAt
        });
    } catch (error) {
        console.error('❌ Error al obtener el perfil:', error);
        res.status(500).json({ error: 'Error al obtener el perfil', details: error.message });
    }
};
