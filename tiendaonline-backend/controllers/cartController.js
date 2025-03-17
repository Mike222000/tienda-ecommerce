const { Cart, Product } = require('../models');
const { validationResult } = require('express-validator');

// Agregar un producto al carrito
exports.addToCart = async (req, res) => {
    try {
        // Validar los datos de entrada
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: 'Datos inválidos', details: errors.array() });
        }

        // Extraer datos
        const userId = req.user.id;
        let { productId, quantity } = req.body;

        // Convertir a enteros
        productId = parseInt(productId, 10);
        quantity = parseInt(quantity, 10);

        // Verificar si el producto existe
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        let cartItem = await Cart.findOne({ where: { userId, productId } });

        if (cartItem) {
            cartItem.quantity += quantity; // Sumar la cantidad
            await cartItem.save();
        } else {
            await Cart.create({ userId, productId, quantity });
        }

        res.json({ message: 'Producto agregado al carrito' });
    } catch (error) {
        console.error('❌ Error al agregar al carrito:', error);
        res.status(500).json({ error: 'Error al agregar al carrito', details: error.message });
    }
};

// Obtener el carrito del usuario autenticado
exports.getCart = async (req, res) => {
    try {
        const userId = req.user.id;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({ error: 'ID de usuario inválido' });
        }

        const cart = await Cart.findAll({
            where: { userId },
            include: [{ model: Product, attributes: ['id', 'nombre', 'precio'] }]
        });

        // Sanitizar salida para prevenir XSS en el frontend
        const sanitizedCart = cart.map(item => ({
            id: item.id,
            userId: item.userId,
            productId: item.productId,
            quantity: item.quantity,
            product: {
                id: item.product?.id,
                nombre: item.product?.nombre || '',
                precio: parseFloat(item.product?.precio) || 0
            }
        }));

        res.json(sanitizedCart);
    } catch (error) {
        console.error('❌ Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error al obtener el carrito', details: error.message });
    }
};
