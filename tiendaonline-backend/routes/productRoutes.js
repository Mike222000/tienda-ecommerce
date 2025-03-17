const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const { body } = require('express-validator');

const router = express.Router();

// Rutas con validaciones
router.post('/',
    [
        body('nombre').trim().isLength({ min: 3 }).escape().withMessage('El nombre debe tener al menos 3 caracteres'),
        body('descripcion').optional().trim().escape(),
        body('precio').isFloat({ min: 0.01 }).withMessage('El precio debe ser un número mayor a 0'),
        body('stock').isInt({ min: 0 }).withMessage('El stock debe ser un número entero mayor o igual a 0'),
        body('imagen').optional().matches(/\.(jpg|jpeg|png|webp)$/).withMessage('La imagen debe ser un archivo válido (.jpg, .jpeg, .png, .webp)')
    ],
    createProduct
);

router.get('/', getProducts);

module.exports = router;
