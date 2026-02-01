document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('whatsappForm');
    const emailBtn = document.getElementById('emailBtn');
    
    // --- Configuración ---
    const miTelefono = "523121931908"; // Tu número
    const miCorreo = "rvargas2d9@gmail.com"; // Tu correo real

    // --- Funcionalidad 1: Enviar formulario por WhatsApp ---
    if (formulario) {
        formulario.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita recarga

            // Capturamos datos
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo').value;
            const mensaje = document.getElementById('mensaje').value;

            // Mensaje formateado para WhatsApp
            const textoWhatsApp = `Hola Amibot! 🤖%0A%0A` +
                                 `Me interesa un bot personalizado.%0A` +
                                 `*Nombre:* ${nombre}%0A` +
                                 `*Correo:* ${correo}%0A` +
                                 `*Mensaje:* ${mensaje}`;

            // Abrir WhatsApp
            const url = `https://wa.me/${miTelefono}?text=${textoWhatsApp}`;
            window.open(url, '_blank');
        });
    }

    // --- Funcionalidad 2: Botón de Correo Dinámico ---
    // Esto actualiza el enlace 'mailto' en tiempo real si el usuario escribe algo
    if (emailBtn) {
        emailBtn.addEventListener('click', (e) => {
            const nombre = document.getElementById('nombre').value;
            const mensaje = document.getElementById('mensaje').value;
            
            // Si el usuario ya escribió algo, lo usamos en el cuerpo del correo
            let bodyCorreo = "Hola, me interesa información sobre los bots.";
            if (nombre && mensaje) {
                bodyCorreo = `Hola, soy ${nombre}.%0D%0A%0D%0A${mensaje}`;
            }

            // Actualizamos el href del botón justo antes de que se abra
            emailBtn.href = `mailto:${miCorreo}?subject=Interés en Amibot&body=${bodyCorreo}`;
        });
    }
});