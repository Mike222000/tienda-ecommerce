require('dotenv').config();
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models'); // Importar Sequelize
const xss = require('xss-clean');

const app = express(); // ✅ Definir 'app' primero

const userRoutes = require('./routes/userRoutes'); // Importar rutas
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};


// 🔹 Verificar conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('✅ Conexión a la base de datos establecida correctamente'))
  .catch(err => console.error('❌ Error al conectar con la base de datos:', err));

  sequelize.sync({ alter: true })  // ⚠️ Esto eliminará y recreará todas las tablas
  .then(() => console.log("✅ Base de datos sincronizada"))
  .catch(err => console.error("❌ Error al sincronizar la base de datos:", err));


// 🔹 Configurar CORS con restricciones (⚠️ Importante)
app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'], // Especifica el origen del frontend
    credentials: true,                // Permitir envío de cookies
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

// 🔹 Configurar Helmet con seguridad mejorada
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"], // No uses "'unsafe-eval'"
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
        },
    },
    xssFilter: true, // Protección contra XSS
    noSniff: true, // Evita interpretación errónea de MIME types
    frameguard: { action: "deny" }, // Evita clickjacking
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true }, // Fuerza HTTPS
}));

// 🔹 Seguridad extra contra XSS
app.use(xss());

// 🔹 Middleware de Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// 🔹 Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);

// 🔹 Ruta de prueba
app.get('/', (req, res) => {
    res.send('API funcionando correctamente');
});

// 🔹 Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// 🔹 Middleware global para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

// 🔹 Iniciar el servidor
const PORT = process.env.PORT || 5000;

https.createServer(options, app).listen(PORT, () => {
    console.log(`🚀 Servidor HTTPS corriendo en https://localhost:${PORT}`);
});
