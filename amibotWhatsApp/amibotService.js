const formulario = document.querySelector('.contact-form');
    
    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue

        // 1. Capturamos los datos del usuario
        const nombre = formulario.querySelectorAll('input')[0].value;
        const correo = formulario.querySelectorAll('input')[1].value;
        const mensaje = formulario.querySelector('textarea').value;
        
        // 2. Tu número de teléfono (sin el signo +)
        // Ejemplo: 521234567890 (Código de país + número)
        const miTelefono = "523121931908"; 

        // 3. Creamos el mensaje para WhatsApp
        const textoWhatsApp = `Hola Amibot! 🤖%0A%0A` +
                             `Me interesa un bot personalizado.%0A` +
                             `*Nombre:* ${nombre}%0A` +
                             `*Correo:* ${correo}%0A` +
                             `*Mensaje:* ${mensaje}`;

        // 4. Redirigimos al usuario
        const url = `https://wa.me/${miTelefono}?text=${textoWhatsApp}`;
        window.open(url, '_blank');
    });