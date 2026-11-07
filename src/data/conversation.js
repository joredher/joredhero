// DRAFT COPY — the "How I work" conversation, pending the owner's review.
// Each question has tappable answers; a short reply follows each answer. Replies only restate
// what the résumé and projects already say (no prices, timelines or guarantees). Every text
// keeps both languages together, like the résumé records.
export const conversation = {
  greeting: {
    en: 'Hi, I’m Jorge. Let’s see how we would work together. A few quick taps and I’ll show you the path.',
    es: 'Hola, soy Jorge. Veamos cómo trabajaríamos juntos. Con unos toques te muestro el camino.',
  },
  steps: [
    {
      id: 'build',
      question: { en: 'What would you like to build?', es: '¿Qué te gustaría construir?' },
      options: [
        {
          id: 'landing',
          label: { en: 'A landing page', es: 'Una página de aterrizaje' },
          summary: { en: 'a landing page', es: 'una página de aterrizaje' },
          reply: {
            en: 'Good fit. I recently built the landing page for El Gran Bailoteo, a music festival, with Next.js and React.',
            es: 'Buena elección. Hace poco construí la página de El Gran Bailoteo, un festival de música, con Next.js y React.',
          },
        },
        {
          id: 'backend',
          label: { en: 'A backend or API', es: 'Un backend o una API' },
          summary: { en: 'a backend or API', es: 'un backend o una API' },
          reply: {
            en: 'That’s my main focus: backend architecture with PHP and Laravel, Node.js and Python.',
            es: 'Es mi enfoque principal: arquitectura backend con PHP y Laravel, Node.js y Python.',
          },
        },
        {
          id: 'integration',
          label: { en: 'An integration or automation', es: 'Una integración o automatización' },
          summary: { en: 'an integration or automation', es: 'una integración o automatización' },
          reply: {
            en: 'API integrations, web scraping and data pipelines are part of what I do.',
            es: 'Las integraciones de API, el web scraping y los procesos de datos son parte de lo que hago.',
          },
        },
        {
          id: 'unsure',
          label: { en: 'I’m not sure yet', es: 'Aún no lo sé' },
          summary: { en: 'something I’m still defining', es: 'algo que aún estoy definiendo' },
          reply: {
            en: 'That’s fine. Defining it together is the first step.',
            es: 'No hay problema. Definirlo juntos es el primer paso.',
          },
        },
      ],
    },
    {
      id: 'stage',
      question: { en: 'Where are you at right now?', es: '¿En qué punto estás ahora?' },
      options: [
        {
          id: 'idea',
          label: { en: 'Just an idea', es: 'Solo una idea' },
          summary: { en: 'it is just an idea', es: 'es solo una idea' },
          reply: {
            en: 'Then we start with a conversation about your goal and audience.',
            es: 'Entonces empezamos con una conversación sobre tu objetivo y tu audiencia.',
          },
        },
        {
          id: 'brief',
          label: { en: 'I have a brief or design', es: 'Tengo un brief o un diseño' },
          summary: { en: 'I have a brief or design', es: 'tengo un brief o un diseño' },
          reply: {
            en: 'Great, that helps. I’ll write down the scope so we agree before work begins.',
            es: 'Excelente, eso ayuda. Dejaré el alcance por escrito para acordarlo antes de empezar.',
          },
        },
        {
          id: 'existing',
          label: { en: 'Something already exists', es: 'Ya existe algo' },
          summary: { en: 'something already exists', es: 'ya existe algo' },
          reply: {
            en: 'Understood. We’ll look at what is there and decide what to keep and what to change.',
            es: 'Entendido. Revisaremos lo que hay y decidiremos qué mantener y qué cambiar.',
          },
        },
      ],
    },
    {
      id: 'when',
      question: { en: 'When would you like to start?', es: '¿Cuándo te gustaría empezar?' },
      options: [
        {
          id: 'soon',
          label: { en: 'As soon as possible', es: 'Lo antes posible' },
          summary: { en: 'I want to start as soon as possible', es: 'quiero empezar lo antes posible' },
          reply: {
            en: 'Noted. I’ll tell you honestly what fits, once I know the scope.',
            es: 'Anotado. Te diré con honestidad qué es posible, una vez conozca el alcance.',
          },
        },
        {
          id: 'month',
          label: { en: 'In the next month or two', es: 'En el próximo mes o dos' },
          summary: { en: 'I want to start in the next month or two', es: 'quiero empezar en el próximo mes o dos' },
          reply: {
            en: 'That gives us room to plan well.',
            es: 'Eso nos da espacio para planear bien.',
          },
        },
        {
          id: 'flexible',
          label: { en: 'No rush', es: 'Sin prisa' },
          summary: { en: 'I have no rush', es: 'no tengo prisa' },
          reply: {
            en: 'Perfect. We can take the time to get the details right.',
            es: 'Perfecto. Podemos tomarnos el tiempo para cuidar los detalles.',
          },
        },
      ],
    },
    {
      id: 'channel',
      question: { en: 'Where should we continue the conversation?', es: '¿Dónde seguimos la conversación?' },
      options: [
        {
          id: 'whatsapp',
          label: { en: 'WhatsApp', es: 'WhatsApp' },
          summary: { en: 'WhatsApp', es: 'WhatsApp' },
          reply: { en: 'WhatsApp works for me.', es: 'Por WhatsApp me parece bien.' },
        },
        {
          id: 'email',
          label: { en: 'Email', es: 'Correo' },
          summary: { en: 'email', es: 'correo' },
          reply: { en: 'Email works for me.', es: 'Por correo me parece bien.' },
        },
      ],
    },
  ],
  path: {
    intro: {
      en: 'Here is how it goes from here:',
      es: 'Así sigue el proceso a partir de aquí:',
    },
  },
  closing: {
    en: 'That’s the path. When you’re ready, send me your answers and we’ll start with the first conversation.',
    es: 'Ese es el camino. Cuando quieras, envíame tus respuestas y empezamos con la primera conversación.',
  },
  // Message prefilled for WhatsApp or email; {summary} is the visitor's choices, in their language.
  message: {
    en: 'Hi Jorge, I found you through your website. I’d like to build {build}; {stage}, and {when}.',
    es: 'Hola Jorge, te encontré por tu sitio web. Quiero construir {build}; {stage} y {when}.',
  },
  subject: { en: 'A project with you', es: 'Un proyecto contigo' },
};
