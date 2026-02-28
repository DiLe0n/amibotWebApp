document.addEventListener('DOMContentLoaded', () => {

    // ── NAVBAR SCROLL ────────────────────────────
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    }, { passive: true });

    // ── THEME TOGGLE ─────────────────────────────
    const html = document.documentElement;
    const toggleBtn = document.getElementById('themeToggle');
    const saved = localStorage.getItem('amibotTheme') || 'dark';
    html.setAttribute('data-theme', saved);
    toggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';

    toggleBtn.addEventListener('click', () => {
        const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('amibotTheme', next);
    });

    // ── SCROLL REVEAL ─────────────────────────────
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

    // ── ORB PARALLAX ──────────────────────────────
    document.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 18;
        const y = (e.clientY / window.innerHeight - 0.5) * 18;
        document.querySelector('.orb-1').style.transform = `translate(${x}px,${y}px)`;
        document.querySelector('.orb-2').style.transform = `translate(${-x*.7}px,${-y*.7}px)`;
        document.querySelector('.orb-3').style.transform = `translate(${x*.5}px,${y*.5}px)`;
    }, { passive: true });

    // ── CONTACT FORM → WHATSAPP ───────────────────
    const miTelefono = "523121067347";
    const formulario = document.getElementById('contactForm');

    formulario.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const mensaje = document.getElementById('mensaje').value;

        const textoWhatsApp = `Hola Amibot! 🤖%0A%0A` +
            `Me interesa un bot personalizado.%0A` +
            `*Nombre:* ${nombre}%0A` +
            `*Correo:* ${correo}%0A` +
            `*Mensaje:* ${mensaje}`;

        window.open(`https://wa.me/${miTelefono}?text=${textoWhatsApp}`, '_blank');
    });
});