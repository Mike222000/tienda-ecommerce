console.log('carrito.js cargado');

const listaCarrito = document.querySelector('.carrito-items');

// Función para mostrar el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    listaCarrito.innerHTML = '';

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p>El carrito está vacío</p>';
        return;
    }

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

    // Agregar eventos a los botones de eliminar
    const botonesEliminar = document.querySelectorAll('.btn-eliminar');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', eliminarProducto);
    });

    calcularTotal();
}

// Función para calcular el total del carrito
function calcularTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = 0;

    carrito.forEach(producto => {
        const precio = parseFloat(producto.precio);
        const cantidad = parseInt(producto.cantidad);

        if (!isNaN(precio) && !isNaN(cantidad)) {
            total += precio * cantidad;
        }
    });

    const totalPrecio = document.getElementById('total-precio');
    totalPrecio.textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
function eliminarProducto(event) {
    const id = event.target.getAttribute('data-id');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito = carrito.filter(producto => String(producto.id) !== String(id));

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
}

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
