// js/carrito.js

// Obtener contenedor del carrito

console.log('carrito.js cargado');

const listaCarrito = document.querySelector('.carrito-items');

// Función para mostrar productos en el carrito
function mostrarCarrito() {
    // Obtener carrito desde Local Storage
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const listaCarrito = document.querySelector('.carrito-items');
    
    // Limpiar contenido anterior
    listaCarrito.innerHTML = '';

    // Verificar si el carrito está vacío
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>El carrito está vacío</p>';
        return;
        
    }

    // Recorrer productos del carrito y generar HTML
    carrito.forEach(producto => {
        const { id, nombre, precio, cantidad, imagen } = producto;
        const item = document.createElement('div');
        item.classList.add('producto-carrito');
        item.innerHTML = `
         <img src="${imagen}" alt="${nombre}" class="imagen-carrito">
            <h3>${nombre}</h3>
            <p>Precio: $${precio}</p>
            <p>Cantidad: ${cantidad}</p>
            <button class="btn-eliminar" data-id="${id}">Eliminar</button>
        `;
        listaCarrito.appendChild(item);
    });

    // Asignar evento de clic a los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });
}

calcularTotal();

    // Función para calcular el total del carrito
// Función para calcular el total del carrito
function calcularTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    carrito.forEach(producto => {
        // Convertir precio y cantidad a números
        const precio = parseFloat(producto.precio);
        const cantidad = parseInt(producto.cantidad);

        // Verificar si ambos son números antes de sumar
        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    });

    // Actualizar el total en el HTML
    const totalPrecio = document.getElementById('total-precio');
    totalPrecio.textContent = `$${total.toFixed(2)}`;
}


// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    const id = event.target.getAttribute('data-id');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar productos para eliminar el seleccionado
    carrito = carrito.filter(producto => producto.id !== id);

    // Actualizar Local Storage
    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Actualizar vista del carrito
    mostrarCarrito();

    calcularTotal();

}

// Cargar carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
