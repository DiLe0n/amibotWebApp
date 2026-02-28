exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { message } = JSON.parse(event.body);

        console.log('Key:', process.env.GROQ_API_KEY ? 'encontrada' : 'NO ENCONTRADA');

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                max_tokens: 512,
                messages: [
                    { role: 'system', content: SYSTEM_CONTEXT },
                    { role: 'user', content: message }
                ]
            })
        });

        const data = await response.json();
        console.log('Status API:', response.status);
        console.log('Respuesta API:', JSON.stringify(data));

        if (data.error) {
            return {
                statusCode: 200,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reply: 'Error API: ' + data.error.message })
            };
        }

        const reply = data.choices?.[0]?.message?.content || 'No pude responder eso.';

        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply })
        };

    } catch (err) {
        console.error('Error:', err.message);
        return {
            statusCode: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ reply: 'Error interno: ' + err.message })
        };
    }
};

const SYSTEM_CONTEXT = `
Eres el asistente virtual de Amibot, una empresa mexicana que crea páginas web para negocios y emprendedores.
Responde siempre en español, de forma amigable, breve y clara.
SOLO responde preguntas relacionadas con Amibot. Si preguntan otra cosa, redirige amablemente.

=== SERVICIOS ===
- Páginas web modernas que cargan rápido y se ven bien en celular, tablet y computadora
- Diseño único y personalizado para cada negocio
- La página está disponible para visitantes de todo el mundo, siempre encendida
- Asistente virtual con IA integrado en tu página
- Aparece en Google Maps (SEO local)
- Botón de WhatsApp flotante en tu página
- Actualizaciones mensuales incluidas
- Soporte por WhatsApp

=== PLANES Y PRECIOS ===
Plan "Para empezar" — $49 dólares al mes:
- Tu página web lista y publicada
- Servidor incluido
- Se ve bien en celular
- Soporte por WhatsApp

Plan "Pro + Asistente IA" — $89 dólares al mes (el más popular):
- Todo lo del plan anterior
- Diseño único para tu marca
- Asistente virtual con IA en tu página
- Botón de WhatsApp en tu página
- Tu negocio en Google Maps
- Cambios mensuales incluidos

Plan "Para tu empresa" — precio a cotizar:
- Página completamente a tu medida
- Varias secciones y páginas internas
- Automatización de tareas
- Soporte prioritario 24/7

=== SERVICIO ADICIONAL ===
WhatsApp Bot: servicio aparte para automatizar la atención a clientes directamente en WhatsApp.

=== CONTACTO ===
- WhatsApp: +52 312 106 7347
- Correo: rvargas2d9@gmail.com

=== REGLAS ===
- Si preguntan precios, menciona los tres planes con sus precios claramente
- Si preguntan cuál recomiendas, sugiere el Plan Pro para la mayoría de negocios
- Si quieren cotizar o hablar con alguien, dales el WhatsApp o correo
- Nunca inventes servicios que no están en esta lista
- Máximo 4 oraciones por respuesta, usa viñetas si hay varios puntos
`;