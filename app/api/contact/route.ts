import { NextResponse } from 'next/server';
import { site } from '@/lib/content';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Petición no válida.' }, { status: 400 });
  }

  // Campo trampa: invisible para personas, los bots lo rellenan. Se responde "ok" sin enviar nada.
  if (String(body.website ?? '').trim()) {
    return NextResponse.json({ message: 'Gracias, hemos recibido tu mensaje.' });
  }

  const name = String(body.name ?? '').replace(/\s+/g, ' ').trim();
  const email = String(body.email ?? '').trim();
  const message = String(body.message ?? '').trim();

  const errors: Record<string, string> = {};
  if (name.length < 2 || name.length > 100) errors.name = 'Escribe tu nombre (entre 2 y 100 caracteres).';
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = 'Escribe un correo electrónico válido.';
  if (message.length < 10 || message.length > 5000) errors.message = 'Cuéntanos un poco más (mínimo 10 caracteres).';

  if (Object.keys(errors).length) {
    return NextResponse.json({ error: 'Revisa los campos marcados.', errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin clave de Resend (por ejemplo, en local) el mensaje solo queda en el registro del servidor.
    console.info('[contacto] RESEND_API_KEY no configurada. Mensaje de', name, `<${email}>:`, message);
  } else {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          from: process.env.CONTACT_FROM_EMAIL || 'GALEON Web <onboarding@resend.dev>',
          to: [process.env.CONTACT_TO_EMAIL || site.email],
          reply_to: email,
          subject: `Nuevo contacto desde la web: ${name}`,
          text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
          html: `<h2>Nuevo contacto desde la web</h2>
<p><strong>Nombre:</strong> ${escapeHtml(name)}<br><strong>Email:</strong> ${escapeHtml(email)}</p>
<p><strong>Mensaje:</strong></p>
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
        }),
        signal: AbortSignal.timeout(15000),
      });
      if (!res.ok) {
        console.error('[contacto] Resend respondió', res.status, await res.text());
        return sendError();
      }
    } catch (err) {
      console.error('[contacto] Error al enviar con Resend:', err);
      return sendError();
    }
  }

  return NextResponse.json({
    message: 'Gracias, hemos recibido tu mensaje. Te responderemos en menos de 24h.',
  });
}

function sendError() {
  return NextResponse.json(
    { error: `No se ha podido enviar el mensaje. Inténtalo de nuevo o escríbenos a ${site.email}.` },
    { status: 502 },
  );
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
