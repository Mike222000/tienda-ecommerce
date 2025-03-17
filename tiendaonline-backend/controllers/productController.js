const { Product } = require('../models');
const { validationResult } = require('express-validator'); // Para validar inputs

// Crear producto (con validaciones desde `productRoutes.js`)
exports.createProduct = async (req, res) => {
    try {
        // Validar los datos de entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Datos inválidos', details: errors.array() });
        }

        // Extraer y convertir valores correctamente
        let { nombre, descripcion, precio, stock, imagen } = req.body;

        // Crear producto en la base de datos
        const product = await Product.create({ nombre, descripcion, precio, stock, imagen });
        res.status(201).json(product);
    } catch (error) {
        console.error("❌ Error al crear el producto:", error);
        res.status(500).json({ error: "Error al crear el producto", details: error.message });
    }
};

// Obtener productos (con conversión segura de precios)
exports.getProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        
        // Convertir precio a número antes de enviarlo en la respuesta
        const formattedProducts = products.map(product => ({
            id: product.id,
            nombre: product.nombre,
            descripcion: product.descripcion,
            imagen: product.imagen,
            precio: parseFloat(product.precio), // Convertir a número
            stock: product.stock
        }));

        res.json(formattedProducts);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
