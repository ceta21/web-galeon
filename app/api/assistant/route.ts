import { NextResponse } from 'next/server';

// La clave de Groq solo vive en el servidor (GROQ_API_KEY en .env.local o en el hosting).
const SYSTEM_PROMPT =
  'Eres Nova, la asistente virtual de GALEON, una consultora de inteligencia artificial especializada en ' +
  'automatización con IA, asistentes, integraciones y desarrollo web a medida. Responde en español, de forma breve, ' +
  'cercana y profesional (máximo 3-4 frases). Si el visitante muestra interés real en un proyecto, invítale a pedir ' +
  'un diagnóstico gratuito en la sección de contacto de la web. No respondas a temas que no estén relacionados con ' +
  'GALEON o sus servicios: en ese caso, indica amablemente que no os dedicáis a eso. No inventes precios ni plazos: ' +
  'todos los proyectos se presupuestan a medida tras un diagnóstico.';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

export async function POST(req: Request) {
  let messages: ChatMessage[];
  try {
    const body = await req.json();
    messages = (Array.isArray(body.messages) ? body.messages : [])
      .filter(
        (m: unknown): m is ChatMessage =>
          !!m &&
          typeof m === 'object' &&
          ((m as ChatMessage).role === 'user' || (m as ChatMessage).role === 'assistant') &&
          typeof (m as ChatMessage).content === 'string',
      )
      .slice(-10)
      .map((m: ChatMessage) => ({ role: m.role, content: m.content.slice(0, 600) }));
  } catch {
    return NextResponse.json({ error: 'Mensaje no válido.' }, { status: 400 });
  }

  const last = messages[messages.length - 1];
  if (!last || last.role !== 'user' || !last.content.trim()) {
    return NextResponse.json({ error: 'Mensaje no válido.' }, { status: 422 });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'El asistente todavía no está configurado. Mientras tanto, escríbenos desde el formulario de contacto.' },
      { status: 503 },
    );
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.6,
        max_tokens: 300,
      }),
      signal: AbortSignal.timeout(20000),
    });

    if (!res.ok) {
      console.error('[asistente] Groq respondió', res.status, await res.text());
      return NextResponse.json(
        { error: 'No se ha podido contactar con el asistente. Inténtalo de nuevo en unos segundos.' },
        { status: 502 },
      );
    }

    const data = await res.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;
    if (!reply) {
      return NextResponse.json({ error: 'El asistente no ha podido responder ahora mismo.' }, { status: 502 });
    }
    return NextResponse.json({ reply: reply.trim() });
  } catch (err) {
    console.error('[asistente] Error al llamar a Groq:', err);
    return NextResponse.json(
      { error: 'No se ha podido contactar con el asistente. Inténtalo de nuevo en unos segundos.' },
      { status: 502 },
    );
  }
}
