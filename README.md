# GALEON · Web corporativa

Web de GALEON, consultora de inteligencia artificial. Hecha con **Next.js 15 + React 19 + TypeScript**.

## Arrancar en local

Necesitas Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local   # y rellena las claves
npm run dev                  # http://localhost:3000
```

Para producción: `npm run build` y luego `npm start`.

## Dónde está cada cosa

| Qué | Dónde |
|---|---|
| **Todos los textos** (servicios, paquetes, FAQ, email, redes...) | `lib/content.ts` |
| Estilos y colores | `app/globals.css` (variables al principio) |
| Página de inicio / contacto | `app/page.tsx`, `app/contacto/page.tsx` |
| Secciones de la web | `components/` |
| Formulario de contacto (servidor) | `app/api/contact/route.ts` |
| Asistente "Nova" con Groq (servidor) | `app/api/assistant/route.ts` |
| Logo | `public/img/` y `app/icon.png` (favicon) |

## Asistente Nova

El chat llama a Groq desde el servidor: la clave **nunca** llega al navegador.
Consigue una clave gratis en https://console.groq.com/keys y ponla como `GROQ_API_KEY`
en `.env.local` (o en las variables de entorno de tu hosting).
Sin clave, el chat muestra un aviso amable y remite al formulario.

## Formulario de contacto

Los mensajes se envían por email con [Resend](https://resend.com) desde el servidor.
Necesita dos variables:

- `RESEND_API_KEY`: crea una clave en https://resend.com/api-keys (el plan gratis basta).
- `CONTACT_TO_EMAIL`: el correo donde quieres recibir los mensajes (puedes poner varios
  separados por comas). Al responder al email, contestas directamente al visitante.

Mientras no verifiques un dominio en Resend, el remitente es `onboarding@resend.dev` y
Resend **solo deja enviar al email con el que creaste la cuenta**, así que `CONTACT_TO_EMAIL`
tiene que ser ese. Cuando verifiques tu dominio, añade `RESEND_FROM`
(p. ej. `GALEON Web <web@tudominio.com>`) y podrás recibir en cualquier dirección.

Si faltan las variables o Resend falla, el formulario no finge que se ha enviado: muestra
un error con el email de contacto de `lib/content.ts`.

## Pendiente

- **Redes sociales**: añade las URLs en `site.social` de `lib/content.ts`.

## Publicar

La forma más sencilla es [Vercel](https://vercel.com): importa el repositorio y añade
`GROQ_API_KEY`, `RESEND_API_KEY` y `CONTACT_TO_EMAIL` en *Settings → Environment Variables*.
