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

## Formulario de contacto (Resend)

Los mensajes del formulario se envían por email con [Resend](https://resend.com) (gratis hasta 3.000 emails al mes).

1. Crea una cuenta en Resend **con el email donde quieres recibir los mensajes**.
2. En *API Keys*, crea una clave y ponla como `RESEND_API_KEY`.
3. Pon ese mismo email en `CONTACT_TO_EMAIL`.

Con el remitente de prueba (`onboarding@resend.dev`), Resend solo deja enviar al email de tu cuenta.
Cuando tengáis dominio propio (p. ej. `galeon.es`), verifícalo en Resend (*Domains*) y cambia
`CONTACT_FROM_EMAIL` a algo como `GALEON Web <web@galeon.es>`; entonces podrás recibir en cualquier dirección.

Al responder al email, la respuesta va directamente a quien escribió (`reply_to`).
Sin `RESEND_API_KEY`, los mensajes solo quedan en el registro del servidor.

## Publicar en Vercel

1. Entra en [vercel.com](https://vercel.com) con tu cuenta de GitHub.
2. **Add New → Project** e importa el repositorio `web-galeon`. Vercel detecta Next.js solo.
3. Antes de pulsar **Deploy**, abre *Environment Variables* y añade:
   - `GROQ_API_KEY`: clave de https://console.groq.com/keys
   - `RESEND_API_KEY`: clave de https://resend.com/api-keys
   - `CONTACT_TO_EMAIL`: email donde recibir los mensajes
4. Pulsa **Deploy**. En un minuto tendrás la web en `web-galeon.vercel.app` (o similar).
5. Para usar vuestro dominio: *Settings → Domains*, añade el dominio y copia en tu proveedor
   de dominio los registros DNS que te indique Vercel.

Cada vez que se suba algo a `master`, Vercel publica la nueva versión automáticamente.
Si cambias una variable de entorno, vuelve a desplegar (*Deployments → Redeploy*) para que se aplique.

## Pendiente

- **Redes sociales**: añade las URLs en `site.social` de `lib/content.ts`.
