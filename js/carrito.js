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
        console.log('Imagen guardada en localStorage:', imagen);
        const item = document.createElement('div');
        item.classList.add('producto-carrito');

        item.innerHTML = `
    <picture>
        <source srcset="${imagen.replace('.jpg', '.webp')}" type="image/webp">
        <img 
            src="${imagen}" 
            srcset="
                ${imagen.replace('.webp', '-400w.webp')} 400w,
                ${imagen.replace('.webp', '-800w.webp')} 800w,
                ${imagen.replace('.webp', '-1200w.webp')} 1200w
            "
            sizes="(max-width: 600px) 400px, (max-width: 992px) 800px, 1200px"
            alt="${nombre}" 
            class="imagen-carrito">
    </picture>
    <h3>${nombre}</h3>
    <p>Precio: $${precio}</p>
    <p>Cantidad: ${cantidad}</p>
    <button class="btn-eliminar" data-id="${id}">Eliminar</button>
`;


        listaCarrito.appendChild(item);
    });

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains("btn-agregar")) {
            let idProducto = event.target.getAttribute("data-id");
            agregarAlCarrito(idProducto);
        }
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

    carrito = eliminarDelCarrito(carrito, Number(id));

    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    calcularTotal();
}

// carrito.js

function agregarAlCarrito(carrito, producto) {
    carrito.push(producto);
    return carrito;
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(carrito, id) {
    return carrito.filter(producto => producto.id !== id);
}


module.exports = { agregarAlCarrito, eliminarDelCarrito };




// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
