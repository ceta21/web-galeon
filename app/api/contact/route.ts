import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

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

  // TODO: enviar el email o guardar el lead (Resend, Nodemailer, tu CRM...).
  // Igual que en la web anterior, de momento solo se valida y se confirma.
  console.info('[contacto] Nuevo mensaje de', name, `<${email}>`);

  return NextResponse.json({
    message: 'Gracias, hemos recibido tu mensaje. Te responderemos en menos de 24h.',
  });
}
