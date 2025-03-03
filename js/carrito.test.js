const { agregarAlCarrito, eliminarDelCarrito } = require('./carrito');

test('Prueba inicial', () => {
    expect(true).toBe(true);
});

// Prueba para agregar productos al carrito
test('Agregar un producto al carrito', () => {
    let carrito = [];
    let producto = { id: 1, nombre: 'Zapatos', precio: 50 };
    
    carrito = agregarAlCarrito(carrito, producto);

    expect(carrito.length).toBe(1);
    expect(carrito[0]).toEqual(producto);
});

// Prueba para eliminar productos del carrito
test('Eliminar un producto del carrito', () => {
    let carrito = [{ id: 1, nombre: 'Zapatos', precio: 50 }];
    
    carrito = eliminarDelCarrito(carrito, 1);

    expect(carrito.length).toBe(0);
});
