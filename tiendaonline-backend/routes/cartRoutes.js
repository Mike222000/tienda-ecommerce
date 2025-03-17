const express = require('express');
const { addToCart, getCart } = require('../controllers/cartController');
const authMiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');

const router = express.Router();

// Agregar producto al carrito (Validaciones)
router.post('/',
    authMiddleware, 
    [
        body('productId').isInt({ gt: 0 }).withMessage('El ID del producto debe ser un número entero positivo'),
        body('quantity').isInt({ gt: 0 }).withMessage('La cantidad debe ser un número entero positivo')
    ],
    addToCart
);

// Obtener el carrito del usuario autenticado
router.get('/', authMiddleware, getCart);

module.exports = router;
