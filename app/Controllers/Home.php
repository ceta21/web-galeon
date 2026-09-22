<?php

namespace App\Controllers;

class Home extends BaseController
{
    public function index()
    {
        $data = [
            'title'            => 'GALEON — Automatización con IA y desarrollo web',
            'meta_description' => 'GALEON diseña automatizaciones con inteligencia artificial y páginas web a medida para negocios que quieren escalar sin fricción.',
            'page_css'         => 'home.css',

            'hero_eyebrow'  => 'GALEON · Automatización & IA',
            'hero_title'    => 'Automatiza tu negocio. Diseña tu futuro.',
            'hero_subtitle' => 'Construimos automatizaciones con inteligencia artificial y páginas web de alto rendimiento para negocios que quieren dejar de perder tiempo en tareas repetitivas y empezar a escalar.',
            'hero_cta_text' => 'Solicita una consultoría',
            'hero_cta_url'  => '#contacto',
            'hero_secondary_cta_text' => 'Ver servicios',
            'hero_secondary_cta_url'  => '#servicios',
            'hero_chips' => [
                'IA generativa integrada',
                'Webs listas para escalar',
            ],

            'trust_items' => [
                ['label' => 'Entregas', 'value' => 'Ágiles'],
                ['label' => 'Enfoque', 'value' => 'IA + Web'],
                ['label' => 'Soporte', 'value' => 'Continuo'],
                ['label' => 'Escalabilidad', 'value' => 'Desde el día 1'],
            ],

            'features' => [
                ['title' => 'Automatización con IA', 'description' => 'Flujos inteligentes que conectan tus herramientas, responden por ti y eliminan tareas manuales repetitivas.'],
                ['title' => 'Páginas web a medida', 'description' => 'Webs y landing pages rápidas, modernas y pensadas para convertir, no solo para verse bien.'],
                ['title' => 'Integraciones a medida', 'description' => 'Conectamos tu web, tu CRM, tus formularios y tus canales de atención en un mismo flujo automatizado.'],
                ['title' => 'Consultoría estratégica', 'description' => 'Analizamos tu operativa y te decimos exactamente qué automatizar primero para notar el impacto antes.'],
            ],

            'about_text' => 'En GALEON unimos automatización con inteligencia artificial y desarrollo web en un mismo equipo, para que no tengas que coordinar a varios proveedores distintos ni explicar tu proyecto dos veces.',
            'about_points' => [
                ['title' => 'Un solo equipo', 'description' => 'IA y desarrollo web bajo el mismo techo, sin fricción entre proveedores.'],
                ['title' => '100% a medida', 'description' => 'Nada de plantillas genéricas: diseñamos según tu operativa real.'],
                ['title' => 'Soporte post-lanzamiento', 'description' => 'Seguimos optimizando la automatización y la web después de publicar.'],
            ],

            'use_cases' => [
                ['title' => 'Atención al cliente', 'description' => 'Respuestas automáticas 24/7 a las preguntas más frecuentes de tus clientes.'],
                ['title' => 'Gestión de leads', 'description' => 'Cualifica y organiza automáticamente los contactos que llegan desde tu web.'],
                ['title' => 'Reporting', 'description' => 'Informes periódicos generados solos, sin tocar una hoja de cálculo.'],
                ['title' => 'Contenido', 'description' => 'Borradores de contenido y respuestas generados con IA, listos para revisar.'],
            ],
            'quote_text' => 'La automatización no sustituye el criterio humano: lo libera para lo importante.',

            'process_steps' => [
                ['number' => '01', 'title' => 'Diagnóstico', 'description' => 'Analizamos tu negocio, tus procesos y dónde estás perdiendo tiempo o clientes.'],
                ['number' => '02', 'title' => 'Diseño de la solución', 'description' => 'Definimos qué automatizar y cómo debe verse y funcionar tu web.'],
                ['number' => '03', 'title' => 'Desarrollo', 'description' => 'Construimos la automatización y/o la web con IA integrada donde aporta valor real.'],
                ['number' => '04', 'title' => 'Lanzamiento y soporte', 'description' => 'Publicamos, medimos resultados y seguimos optimizando contigo.'],
            ],

            'packages' => [
                [
                    'name' => 'Automatización IA',
                    'price_label' => 'Presupuesto a medida',
                    'description' => 'Para negocios que ya tienen web y quieren dejar de perder tiempo en tareas repetitivas.',
                    'items' => ['Automatización de atención al cliente', 'Integración con tus herramientas actuales', 'Soporte tras el lanzamiento'],
                    'featured' => false,
                ],
                [
                    'name' => 'Web a medida',
                    'price_label' => 'Presupuesto a medida',
                    'description' => 'Una web rápida, moderna y pensada para convertir visitas en clientes.',
                    'items' => ['Diseño 100% a medida', 'Optimizada para SEO y velocidad', 'Panel de gestión básico'],
                    'featured' => false,
                ],
                [
                    'name' => 'Automatización + Web',
                    'price_label' => 'Presupuesto a medida',
                    'description' => 'El paquete completo: tu web y tus automatizaciones diseñadas para trabajar juntas desde el primer día.',
                    'items' => ['Todo lo anterior incluido', 'Un único equipo, un único punto de contacto', 'Prioridad en soporte'],
                    'featured' => true,
                ],
            ],

            'faqs' => [
                ['question' => '¿Necesito tener ya una web para automatizar mi negocio?', 'answer' => 'No. Podemos automatizar procesos internos (atención, leads, reporting) aunque todavía no tengas página web.'],
                ['question' => '¿Cuánto tarda un proyecto?', 'answer' => 'Depende del alcance. Tras el diagnóstico inicial te damos un plazo concreto, sin sorpresas después.'],
                ['question' => '¿La IA sustituye a mi equipo?', 'answer' => 'No. Se encarga de las tareas repetitivas para que tu equipo se centre en lo que realmente aporta valor.'],
                ['question' => '¿Ofrecéis soporte después del lanzamiento?', 'answer' => 'Sí. Seguimos optimizando la automatización y la web contigo después de publicar.'],
                ['question' => '¿Puedo pedir solo la web o solo la automatización?', 'answer' => 'Sí, cada servicio funciona de forma independiente — no hace falta contratar el pack completo.'],
            ],
        ];

        return view('pages/home', $data);
    }
}
