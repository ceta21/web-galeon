# GALEON · Web corporativa

Web de GALEON, consultora de inteligencia artificial. Hecha con **Next.js 15 + React 19 + TypeScript**.

## Arrancar en local

Necesitas Node.js 20 o superior.

```bash
npm install
cp .env.example .env.local   # y pon tu GROQ_API_KEY
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

## Pendiente

- **Envío real del formulario**: ahora valida y confirma, pero no manda email.
  Conéctalo en `app/api/contact/route.ts` (por ejemplo con Resend o Nodemailer).
- **Redes sociales**: añade las URLs en `site.social` de `lib/content.ts`.

## Publicar

La forma más sencilla es [Vercel](https://vercel.com): importa el repositorio y añade
`GROQ_API_KEY` en *Settings → Environment Variables*.
