import { agregarAlCarrito, eliminarDelCarrito, calcularTotal } from './carrito.js';

// Simulación de localStorage
global.localStorage = {
    getItem: jest.fn(() => JSON.stringify([])),  // Devuelve un array vacío por defecto
    setItem: jest.fn(),  // Simula la función de guardar datos en localStorage
};

describe('Carrito de Compras', () => {
    beforeEach(() => {
        localStorage.getItem.mockReturnValue(JSON.stringify([]));  // Reinicia el carrito antes de cada prueba
        localStorage.setItem.mockClear();
    });

    test('Prueba inicial', () => {
        expect(true).toBe(true);
    });

    test('Agregar un producto al carrito', () => {
        let carrito = [];
        let producto = { id: 1, nombre: 'Zapatos', precio: 50, cantidad: 1 };

        carrito = agregarAlCarrito(carrito, producto);

        expect(carrito.length).toBe(1);
        expect(carrito[0]).toEqual(producto);
        expect(localStorage.setItem).toHaveBeenCalled();  // Verifica que se guardó en localStorage
    });

    test('Eliminar un producto del carrito', () => {
        let carrito = [{ id: 1, nombre: 'Zapatos', precio: 50, cantidad: 1 }];

        carrito = eliminarDelCarrito(carrito, 1);

        expect(carrito.length).toBe(0);
        expect(localStorage.setItem).toHaveBeenCalled();
    });

    test('Calcular total correctamente', () => {
        localStorage.getItem.mockReturnValue(JSON.stringify([
            { id: 1, precio: 50, cantidad: 2 },
            { id: 2, precio: 30, cantidad: 1 }
        ]));

        document.body.innerHTML = '<span id="total-precio"></span>';
        calcularTotal();

        expect(document.getElementById('total-precio').textContent).toBe('$130.00');
    });
});

