import { NextResponse } from 'next/server';
import { site } from '@/lib/content';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Remitente por defecto de Resend: sirve sin verificar dominio, pero solo puede
// enviar al email con el que creaste la cuenta de Resend. Con un dominio verificado,
// pon RESEND_FROM (p. ej. "GALEON Web <web@tudominio.com>").
const DEFAULT_FROM = 'GALEON Web <onboarding@resend.dev>';

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Petición no válida.' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
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
  const to = process.env.CONTACT_TO_EMAIL;
  const fallbackError = `No se ha podido enviar el mensaje. Escríbenos directamente a ${site.email}.`;

  if (!apiKey || !to) {
    console.error('[contacto] Falta RESEND_API_KEY o CONTACT_TO_EMAIL: el mensaje no se ha enviado.');
    return NextResponse.json({ error: fallbackError }, { status: 503 });
  }

  // Solo texto plano: así lo que escriba el visitante nunca se interpreta como HTML.
  const text = [`Nombre: ${name}`, `Email: ${email}`, '', message].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || DEFAULT_FROM,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        reply_to: email,
        subject: `Nuevo contacto web: ${name.replace(/[\r\n]+/g, ' ')}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!res.ok) {
      console.error('[contacto] Resend respondió', res.status, await res.text());
      return NextResponse.json({ error: fallbackError }, { status: 502 });
    }
  } catch (err) {
    console.error('[contacto] Error al llamar a Resend', err);
    return NextResponse.json({ error: fallbackError }, { status: 502 });
  }

  return NextResponse.json({
    message: 'Gracias, hemos recibido tu mensaje. Te responderemos en menos de 24h.',
  });
}
