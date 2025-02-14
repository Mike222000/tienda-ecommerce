// js/productos.js

// Obtener todos los botones de "Agregar al carrito"

console.log('productos.js cargado');

const botonesAgregar = document.querySelectorAll('.btn-agregar');

// Función para agregar producto al carrito
function agregarAlCarrito(event) {
    // Obtener el producto seleccionado
    const boton = event.target;
    const producto = boton.parentElement;
    const nombre = producto.querySelector('.nombre').textContent;
    const precio = parseFloat(producto.querySelector('.precio').textContent.replace('$', ''));
    const imagen = producto.querySelector('img').getAttribute('src');
    const id = boton.getAttribute('data-id');

    // Crear objeto del producto
    const productoSeleccionado = {
        id,
        nombre,
        precio,
        imagen,
        cantidad: 1
    };

    // Obtener carrito actual desde Local Storage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const existe = carrito.some(producto => producto.id === id);
    if (existe) {
        // Actualizar cantidad si el producto ya está en el carrito
        carrito = carrito.map(producto => {
            if (producto.id === id) {
                producto.cantidad++;
            }
            return producto;
        });
    } else {
        // Agregar nuevo producto al carrito
        carrito.push(productoSeleccionado);
    }

    // Guardar carrito actualizado en Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert('Producto agregado al carrito');
}

// Asignar evento de clic a cada botón
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});
