<?php

namespace App\Controllers;

class Assistant extends BaseController
{
    /**
     * Recibe el mensaje del visitante, lo envía a Groq (API compatible con OpenAI) desde el
     * servidor —la API key nunca se expone al navegador— y devuelve la respuesta en JSON.
     *
     * Requiere GROQ_API_KEY definida en el .env del proyecto (ver .env.example).
     * Consíguela gratis, sin tarjeta, en https://console.groq.com/keys
     */
    public function reply()
    {
        $rules = ['message' => 'required|max_length[600]'];

        if (! $this->validate($rules)) {
            return $this->response->setStatusCode(422)->setJSON([
                'error'    => 'Mensaje no válido.',
                'csrfName' => csrf_token(),
                'csrfHash' => csrf_hash(),
            ]);
        }

        $userMessage = trim((string) $this->request->getPost('message'));
        $apiKey      = getenv('GROQ_API_KEY');

        if (! $apiKey) {
            return $this->response->setStatusCode(500)->setJSON([
                'error' => 'El asistente no está configurado todavía (falta GROQ_API_KEY en el .env).',
            ]);
        }

        $payload = [
            'model'    => 'llama-3.3-70b-versatile',
            'messages' => [
                [
                    'role'    => 'system',
                    'content' => 'Eres Nova, el asistente virtual de GALEON, una empresa de automatización con '
                        . 'inteligencia artificial y desarrollo web. Responde en español, de forma breve, cercana y '
                        . 'profesional (máximo 3-4 frases). Si el visitante muestra interés real en un proyecto, '
                        . 'invítale a pedir un presupuesto gratuito en la sección de contacto de la web.'
                        . 'no respondas a cosas que no esten relacionadas con nuestra empresa'
                        . 'si te hablan sobre cosas que no estan relacionadas con la empresa, dile que no nos dedicamos a eso',
                ],
                ['role' => 'user', 'content' => $userMessage],
            ],
            'temperature' => 0.6,
            'max_tokens'  => 300,
        ];

        $ch = curl_init('https://api.groq.com/openai/v1/chat/completions');
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST           => true,
            CURLOPT_HTTPHEADER     => [
                'Content-Type: application/json',
                'Authorization: Bearer ' . $apiKey,
            ],
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_TIMEOUT    => 20,
        ]);

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);

        if ($response === false || $httpCode >= 400) {
            log_message('error', 'Assistant::reply — fallo al llamar a Groq: ' . $curlError . ' (HTTP ' . $httpCode . ') — respuesta: ' . $response);

            return $this->response->setStatusCode(502)->setJSON([
                'error' => 'No se ha podido contactar con el asistente. Inténtalo de nuevo en unos segundos.',
                // TEMPORAL — quita este bloque "debug" en cuanto quede solucionado, no debe ir a producción.
                'debug' => [
                    'httpCode'       => $httpCode,
                    'curlError'      => $curlError,
                    'openaiResponse' => $response ? json_decode($response, true) : null,
                ],
            ]);
        }

        $data  = json_decode($response, true);
        $reply = $data['choices'][0]['message']['content'] ?? null;

        if (! $reply) {
            return $this->response->setStatusCode(502)->setJSON([
                'error' => 'El asistente no ha podido generar una respuesta ahora mismo.',
            ]);
        }

        return $this->response->setJSON([
            'reply'    => trim($reply),
            'csrfName' => csrf_token(),
            'csrfHash' => csrf_hash(),
        ]);
    }
}
