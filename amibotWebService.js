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

    // ── CONTACT ───────────────────────────────────
    const miCorreo = "rvargas2d9@gmail.com";
    const emailBtn = document.getElementById('emailBtn');
    if (emailBtn) {
        emailBtn.addEventListener('click', e => {
            e.preventDefault();
            const body = encodeURIComponent("Hola, me interesa información sobre los servicios de Amibot.");
            window.location.href = `mailto:${miCorreo}?subject=Me%20interesa%20Amibot&body=${body}`;
        });
    }
});

// ── CHATBOT ───────────────────────────────────

const chatMessages = document.getElementById('chat-messages');

function toggleChat() {
    const win = document.getElementById('chat-window');
    win.classList.toggle('open');
    if (win.classList.contains('open') && chatMessages.children.length === 0) {
        addMessage('bot', '¡Hola! 👋 Soy el asistente de Amibot. ¿En qué te puedo ayudar?');
    }
}

function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    addMessage('user', text);
    const typing = addMessage('bot', 'Escribiendo...');
    typing.classList.add('typing');

    try {
        const res = await fetch('/.netlify/functions/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await res.json();
        const reply = data.reply || 'No pude responder eso.';
        typing.textContent = reply;
        typing.classList.remove('typing');
    } catch {
        typing.textContent = 'Hubo un error. Por favor intenta de nuevo.';
        typing.classList.remove('typing');
    }
}