console.log('✅ login.js cargado');

// 🔹 Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const token = localStorage.getItem('token');
    const loginSection = document.getElementById('login-section');
    const logoutBtn = document.getElementById('logout-btn');

    console.log("🔍 Verificando autenticación, token encontrado:", token);

    if (token) {
        if (loginSection) loginSection.style.display = 'none'; // Ocultar el formulario de login
        if (logoutBtn) logoutBtn.style.display = 'inline-block'; // Mostrar el botón de cerrar sesión
    } else {
        if (loginSection) loginSection.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
}

// 🔹 Función para manejar el inicio de sesión
async function iniciarSesion(event) {
    event.preventDefault(); // Evita recargar la página

    // Obtener datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("📤 Enviando solicitud de login con:", { email, password });

    try {
        const response = await fetch('https://localhost:5000/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        console.log("📥 Respuesta del servidor:", data);

        if (!response.ok) {
            throw new Error(data.error || 'Error al iniciar sesión');
        }

        // 🔹 Almacenar el token en localStorage
        localStorage.setItem('token', data.token);
        alert('✅ Inicio de sesión exitoso');

        // 🔹 Redirigir a productos.html
        window.location.href = 'productos.html';

    } catch (error) {
        console.error('❌ Error al iniciar sesión:', error);
        alert('Error: ' + error.message);
    }
}

// 🔹 Función para cerrar sesión
function cerrarSesion() {
    localStorage.removeItem('token');
    alert('👋 Has cerrado sesión');
    window.location.href = 'index.html'; // Redirigir a la página de inicio
}

// 🔹 Agregar eventos
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', iniciarSesion);
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', cerrarSesion);
    }
});
