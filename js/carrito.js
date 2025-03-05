console.log('carrito.js cargado');

const listaCarrito = document.querySelector('.carrito-items');

// Función para mostrar el carrito
export function mostrarCarrito() {
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

    // Agregar eventos a los botones de eliminar
    listaCarrito.addEventListener('click', function(event) {
        if (event.target.classList.contains('btn-eliminar')) {
            eliminarProducto(event);
        }
    });
    

    calcularTotal();
}

// Función para calcular el total del carrito
export function calcularTotal() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((acc, producto) => acc + producto.precio * producto.cantidad, 0);

    document.getElementById('total-precio').textContent = `$${total.toFixed(2)}`;
}

// Función para eliminar un producto del carrito
export function eliminarProducto(event) {
    const id = event.target.getAttribute('data-id'); // Mantener como string
    console.log("Intentando eliminar producto con ID:", id);

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Filtrar correctamente comparando como string
    carrito = carrito.filter(producto => producto.id.toString() !== id);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    mostrarCarrito();
    calcularTotal();
}


// Función para agregar un producto al carrito
export function agregarAlCarrito(idProducto) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let producto = { id: Number(idProducto), nombre: "Ejemplo", precio: 50, cantidad: 1 };

    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
