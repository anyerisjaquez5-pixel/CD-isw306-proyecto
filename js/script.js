
const formulario = document.querySelector("form");
const mensaje = document.getElementById("mensaje");


// Cargar datos guardados al abrir la página
window.addEventListener("load", function () {

    const datosGuardados = JSON.parse(localStorage.getItem("usuario"));

    if (datosGuardados) {

        document.getElementById("nombre").value = datosGuardados.nombre;
        document.getElementById("correo").value = datosGuardados.correo;
        document.getElementById("rol").value = datosGuardados.rol;

        document.querySelector(
            'input[name="notificaciones"]'
        ).checked = datosGuardados.notificaciones;
    }
});

formulario.addEventListener("submit", function (e) {

    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const rol = document.getElementById("rol").value;
    const notificaciones =
        document.querySelector('input[name="notificaciones"]').checked;

    mensaje.classList.remove("error", "exito");

    if (nombre === "") {
        mensaje.innerHTML = "El nombre no puede estar vacío";
        mensaje.classList.add("error");
        return;
    }

    if (nombre.length < 3) {
        mensaje.innerHTML = "El nombre debe tener al menos 3 caracteres";
        mensaje.classList.add("error");
        return;
    }

    const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!expresionCorreo.test(correo)) {
        mensaje.innerHTML = "Ingrese un correo electrónico válido";
        mensaje.classList.add("error");
        return;
    }

    const usuario = {
        nombre: nombre,
        correo: correo,
        rol: rol,
        notificaciones: notificaciones
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    mensaje.innerHTML = "Datos registrados correctamente";
    mensaje.classList.add("exito");

    formulario.reset();
});
// Proyecto ISW-306 - Etapa 2 Interactividad