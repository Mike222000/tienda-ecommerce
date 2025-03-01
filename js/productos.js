console.log('productos.js cargado');

// Seleccionar todos los botones de agregar al carrito
const botonesAgregar = document.querySelectorAll('.btn-agregar');

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const boton = event.target;
    const producto = boton.parentElement;

    // Obtener los datos del producto
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

    // Obtener el carrito desde localStorage o inicializarlo vacío
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Verificar si el producto ya está en el carrito
    const existe = carrito.some(producto => producto.id === id);

    if (existe) {
        // Si ya está en el carrito, incrementar su cantidad
        carrito = carrito.map(producto => {
            if (producto.id === id) {
                producto.cantidad++;
            }
            return producto;
        });
    } else {
        // Si no está en el carrito, agregarlo
        carrito.push(productoSeleccionado);
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Mostrar alerta de confirmación
    alert('Producto agregado al carrito');
}

// Asignar el evento de clic a todos los botones de agregar al carrito
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', agregarAlCarrito);
});
