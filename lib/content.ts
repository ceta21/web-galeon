// Todo el texto de la web en un solo sitio: edita aquí sin tocar los componentes.

export const site = {
  name: 'GALEON',
  tagline: 'Consultora de inteligencia artificial',
  email: 'galeon@gmail.com',
  description:
    'GALEON es una consultora de inteligencia artificial: diseñamos automatizaciones con IA, asistentes y webs a medida para negocios que quieren escalar sin fricción.',
  // Pon aquí las URLs reales de vuestras redes. Las que queden vacías no se muestran.
  social: {
    linkedin: '',
    instagram: '',
  },
};

export const nav = [
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#demo', label: 'Cómo funciona' },
  { href: '/#proceso', label: 'Proceso' },
  { href: '/#paquetes', label: 'Paquetes' },
  { href: '/#faqs', label: 'FAQ' },
];

export const hero = {
  eyebrow: 'Consultora de IA · Automatización · Web',
  titleStart: 'Pon la',
  titleHighlight: 'inteligencia artificial',
  titleEnd: 'a trabajar para tu negocio.',
  subtitle:
    'Detectamos dónde pierde tiempo tu empresa y lo resolvemos con automatizaciones, asistentes de IA y webs que convierten. Sin humo: soluciones que se usan desde el primer día.',
  primaryCta: { label: 'Pide tu diagnóstico gratuito', href: '/#contacto' },
  secondaryCta: { label: 'Ver servicios', href: '/#servicios' },
  badges: ['Diagnóstico gratuito', 'Respuesta en 24h', 'IA + Web en un solo equipo'],
};

// Panel interactivo de la portada. Son datos de EJEMPLO (así se indica en la web) para
// enseñar cómo se ve el seguimiento de las automatizaciones de un cliente.
export const heroPanel = {
  title: 'Panel de automatizaciones',
  note: 'Datos de ejemplo · haz clic en las pestañas',
  days: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  areas: [
    { key: 'atencion', label: 'Atención', color: '#22c7e8' },
    { key: 'leads', label: 'Leads', color: '#1d3fcf' },
    { key: 'reporting', label: 'Reporting', color: '#5b6cf0' },
    { key: 'contenido', label: 'Contenido', color: '#0f1b4d' },
  ],
  tabs: [
    {
      label: 'Todos',
      kpis: [
        { value: '1.240', label: 'Tareas / mes' },
        { value: '86 h', label: 'Ahorradas' },
        { value: '3 s', label: 'Respuesta' },
      ],
      bars: [62, 78, 70, 92, 84, 40, 28],
      mix: [42, 28, 18, 12],
    },
    {
      label: 'Atención',
      kpis: [
        { value: '520', label: 'Consultas' },
        { value: '24/7', label: 'Disponible' },
        { value: '2 s', label: 'Respuesta' },
      ],
      bars: [70, 82, 76, 88, 90, 58, 46],
      mix: [72, 12, 8, 8],
    },
    {
      label: 'Leads',
      kpis: [
        { value: '310', label: 'Leads / mes' },
        { value: '100%', label: 'En el CRM' },
        { value: '5 min', label: 'Seguimiento' },
      ],
      bars: [55, 74, 80, 72, 86, 22, 14],
      mix: [14, 66, 12, 8],
    },
    {
      label: 'Reporting',
      kpis: [
        { value: '48', label: 'Informes' },
        { value: '0', label: 'Excels a mano' },
        { value: 'Lunes', label: 'Envío auto.' },
      ],
      bars: [96, 30, 34, 38, 64, 10, 8],
      mix: [8, 14, 68, 10],
    },
  ],
};

export const trust = [
  { value: 'IA + Web', label: 'Un solo equipo' },
  { value: '24h', label: 'Respuesta a tu propuesta' },
  { value: '100%', label: 'A medida' },
  { value: 'Continuo', label: 'Soporte tras lanzar' },
];

// Banda de cifras (degradado azul). Son compromisos de trabajo, no métricas inventadas.
export const highlights = [
  { value: '24h', label: 'Respuesta', detail: 'Te enviamos una propuesta concreta' },
  { value: '1', label: 'Único equipo', detail: 'IA, automatización y web juntos' },
  { value: '100%', label: 'A medida', detail: 'Nada de plantillas genéricas' },
  { value: '24/7', label: 'Automatizaciones', detail: 'Trabajando mientras descansas' },
];

export type IconName = 'bot' | 'code' | 'plug' | 'compass' | 'chat' | 'funnel' | 'chart' | 'pen';

export const services: { icon: IconName; title: string; description: string; tags: string[] }[] = [
  {
    icon: 'bot',
    title: 'Automatización con IA',
    description:
      'Flujos inteligentes que conectan tus herramientas, responden por ti y eliminan tareas manuales repetitivas.',
    tags: ['Agentes', 'Flujos', 'LLMs'],
  },
  {
    icon: 'compass',
    title: 'Consultoría estratégica de IA',
    description:
      'Analizamos tu operativa y te decimos exactamente qué automatizar primero para notar el impacto antes.',
    tags: ['Diagnóstico', 'Hoja de ruta'],
  },
  {
    icon: 'code',
    title: 'Webs a medida',
    description:
      'Webs y landing pages rápidas, modernas y pensadas para convertir, no solo para verse bien.',
    tags: ['SEO', 'Velocidad', 'Conversión'],
  },
  {
    icon: 'plug',
    title: 'Integraciones',
    description:
      'Conectamos tu web, tu CRM, tus formularios y tus canales de atención en un mismo flujo automatizado.',
    tags: ['CRM', 'APIs', 'Email'],
  },
];

export const about = {
  title: 'Tu aliado en inteligencia artificial',
  text: 'En GALEON unimos consultoría de IA, automatización y desarrollo web en un mismo equipo, para que no tengas que coordinar a varios proveedores ni explicar tu proyecto dos veces.',
  points: [
    { title: 'Un solo equipo', description: 'IA y desarrollo web bajo el mismo techo, sin fricción entre proveedores.' },
    { title: '100% a medida', description: 'Nada de plantillas genéricas: diseñamos según tu operativa real.' },
    { title: 'Soporte post-lanzamiento', description: 'Seguimos optimizando la automatización y la web después de publicar.' },
  ],
};

export const useCases: { icon: IconName; title: string; description: string }[] = [
  { icon: 'chat', title: 'Atención al cliente', description: 'Respuestas automáticas 24/7 a las preguntas más frecuentes de tus clientes.' },
  { icon: 'funnel', title: 'Gestión de leads', description: 'Cualifica y organiza automáticamente los contactos que llegan desde tu web.' },
  { icon: 'chart', title: 'Reporting', description: 'Informes periódicos generados solos, sin tocar una hoja de cálculo.' },
  { icon: 'pen', title: 'Contenido', description: 'Borradores de contenido y respuestas generados con IA, listos para revisar.' },
];

export const quote = 'La automatización no sustituye el criterio humano: lo libera para lo importante.';


// Demo animada de la sección "Cómo funciona": un lead que entra y se procesa solo.
export const demoFlow = [
  { title: 'Llega un mensaje', detail: '“Hola, ¿hacéis webs para clínicas?”', time: '0 s' },
  { title: 'La IA lo entiende', detail: 'Intención: presupuesto web · Sector: salud', time: '1 s' },
  { title: 'Se registra en tu CRM', detail: 'Lead creado y cualificado automáticamente', time: '2 s' },
  { title: 'Respuesta enviada', detail: 'Email personalizado + cita propuesta', time: '3 s' },
];

export const process = [
  { number: '01', title: 'Diagnóstico', description: 'Analizamos tu negocio, tus procesos y dónde estás perdiendo tiempo o clientes.' },
  { number: '02', title: 'Diseño de la solución', description: 'Definimos qué automatizar y cómo debe verse y funcionar tu web.' },
  { number: '03', title: 'Desarrollo', description: 'Construimos la automatización y/o la web con IA integrada donde aporta valor real.' },
  { number: '04', title: 'Lanzamiento y soporte', description: 'Publicamos, medimos resultados y seguimos optimizando contigo.' },
];

export const packages = [
  {
    name: 'Automatización IA',
    price: 'Presupuesto a medida',
    description: 'Para negocios que ya tienen web y quieren dejar de perder tiempo en tareas repetitivas.',
    items: ['Automatización de atención al cliente', 'Integración con tus herramientas actuales', 'Soporte tras el lanzamiento'],
    featured: false,
  },
  {
    name: 'Automatización + Web',
    price: 'Presupuesto a medida',
    description: 'El paquete completo: tu web y tus automatizaciones diseñadas para trabajar juntas desde el primer día.',
    items: ['Todo lo de los otros dos paquetes', 'Un único equipo, un único punto de contacto', 'Prioridad en soporte'],
    featured: true,
  },
  {
    name: 'Web a medida',
    price: 'Presupuesto a medida',
    description: 'Una web rápida, moderna y pensada para convertir visitas en clientes.',
    items: ['Diseño 100% a medida', 'Optimizada para SEO y velocidad', 'Panel de gestión básico'],
    featured: false,
  },
];

export const faqs = [
  { question: '¿Necesito tener ya una web para automatizar mi negocio?', answer: 'No. Podemos automatizar procesos internos (atención, leads, reporting) aunque todavía no tengas página web.' },
  { question: '¿Cuánto tarda un proyecto?', answer: 'Depende del alcance. Tras el diagnóstico inicial te damos un plazo concreto, sin sorpresas después.' },
  { question: '¿La IA sustituye a mi equipo?', answer: 'No. Se encarga de las tareas repetitivas para que tu equipo se centre en lo que realmente aporta valor.' },
  { question: '¿Ofrecéis soporte después del lanzamiento?', answer: 'Sí. Seguimos optimizando la automatización y la web contigo después de publicar.' },
  { question: '¿Puedo pedir solo la web o solo la automatización?', answer: 'Sí, cada servicio funciona de forma independiente: no hace falta contratar el pack completo.' },
];
