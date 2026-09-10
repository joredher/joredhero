import { experience } from './experience.js';

// Sources: owner-supplied 2026 résumé and matching skills screenshot.
// Frontend, backend, AI and portfolio IDs preserve existing category URLs.
// Concept cards use symbols; branded technology cards use locally stored logos.
const groups = [
  {
    "id": "frontend",
    "label": {
      "en": "Frontend",
      "es": "Frontend"
    },
    "description": {
      "en": "Reactive interfaces for web and mobile applications.",
      "es": "Interfaces reactivas para aplicaciones web y móviles."
    },
    "technologies": [
      {
        "id": "javascript",
        "name": "JavaScript",
        "label": {
          "en": "JavaScript",
          "es": "JavaScript"
        },
        "description": {
          "en": "ES6+ JavaScript for frontend interfaces and full-stack web development.",
          "es": "JavaScript ES6+ para interfaces frontend y desarrollo web full stack."
        },
        "symbol": "code"
      },
      {
        "id": "typescript",
        "name": "TypeScript",
        "label": {
          "en": "TypeScript",
          "es": "TypeScript"
        },
        "description": {
          "en": "Typed application development across the frontend and full-stack roles in my résumé.",
          "es": "Desarrollo de aplicaciones tipadas en mis roles de frontend y full stack."
        },
        "symbol": "code"
      },
      {
        "id": "vue-js",
        "name": "Vue.js",
        "label": {
          "en": "Vue.js",
          "es": "Vue.js"
        },
        "description": {
          "en": "Vue 3 and reactive interfaces used across my web application work.",
          "es": "Vue 3 e interfaces reactivas utilizadas en mis aplicaciones web."
        },
        "symbol": "code"
      },
      {
        "id": "react",
        "name": "React",
        "label": {
          "en": "React",
          "es": "React"
        },
        "description": {
          "en": "Component-based interfaces, including my current work at DELTA and this portfolio.",
          "es": "Interfaces basadas en componentes, incluido mi trabajo actual en DELTA y este portafolio."
        },
        "symbol": "code"
      },
      {
        "id": "ionic",
        "name": "Ionic",
        "label": {
          "en": "Ionic",
          "es": "Ionic"
        },
        "description": {
          "en": "Cross-platform web and mobile interfaces in the 119 Emergencias work at DELTA.",
          "es": "Interfaces web y móviles multiplataforma en el trabajo de 119 Emergencias en DELTA."
        },
        "symbol": "code"
      },
      {
        "id": "jquery",
        "name": "jQuery",
        "label": {
          "en": "jQuery",
          "es": "jQuery"
        },
        "description": {
          "en": "Interface functionality in microsites and full-stack web applications.",
          "es": "Funcionalidad de interfaces en micrositios y aplicaciones web full stack."
        },
        "symbol": "code"
      },
      {
        "id": "bootstrap",
        "name": "Bootstrap",
        "label": {
          "en": "Bootstrap",
          "es": "Bootstrap"
        },
        "description": {
          "en": "Responsive interface styling in microsites and web applications.",
          "es": "Estilos de interfaz adaptables en micrositios y aplicaciones web."
        },
        "symbol": "code"
      }
    ]
  },
  {
    "id": "backend",
    "label": {
      "en": "Backend",
      "es": "Backend"
    },
    "description": {
      "en": "Backend architecture, services and server-rendered views.",
      "es": "Arquitectura backend, servicios y vistas renderizadas en el servidor."
    },
    "technologies": [
      {
        "id": "php",
        "name": "PHP",
        "label": {
          "en": "PHP",
          "es": "PHP"
        },
        "description": {
          "en": "A core language in my backend development, particularly with Laravel.",
          "es": "Un lenguaje central en mi desarrollo backend, especialmente con Laravel."
        },
        "symbol": "code"
      },
      {
        "id": "laravel",
        "name": "Laravel",
        "label": {
          "en": "Laravel",
          "es": "Laravel"
        },
        "description": {
          "en": "Backend architecture, business modules, APIs and web applications across my professional roles.",
          "es": "Arquitectura backend, módulos de negocio, API y aplicaciones web en mis roles profesionales."
        },
        "symbol": "code"
      },
      {
        "id": "codeigniter",
        "name": "CodeIgniter",
        "label": {
          "en": "CodeIgniter",
          "es": "CodeIgniter"
        },
        "description": {
          "en": "PHP framework included in my languages and frameworks toolkit.",
          "es": "Framework PHP incluido en mis herramientas de lenguajes y frameworks."
        },
        "symbol": "code"
      },
      {
        "id": "node-js",
        "name": "Node.js",
        "label": {
          "en": "Node.js",
          "es": "Node.js"
        },
        "description": {
          "en": "Backend services and asynchronous data processing, including Puppeteer pipelines.",
          "es": "Servicios backend y procesamiento asíncrono de datos, incluidos procesos con Puppeteer."
        },
        "symbol": "code"
      },
      {
        "id": "python",
        "name": "Python",
        "label": {
          "en": "Python",
          "es": "Python"
        },
        "description": {
          "en": "Backend and automation work, including scraping and data extraction pipelines.",
          "es": "Trabajo de backend y automatización, incluidos procesos de scraping y extracción de datos."
        },
        "symbol": "code"
      },
      {
        "id": "blade",
        "name": "Blade",
        "label": {
          "en": "Blade",
          "es": "Blade"
        },
        "description": {
          "en": "Laravel templates used for dynamic microsites and server-rendered interfaces.",
          "es": "Plantillas de Laravel utilizadas en micrositios dinámicos e interfaces renderizadas en el servidor."
        },
        "symbol": "code"
      }
    ]
  },
  {
    "id": "data",
    "label": {
      "en": "Databases & real time",
      "es": "Bases de datos y tiempo real"
    },
    "description": {
      "en": "Storage, APIs and communication between systems.",
      "es": "Almacenamiento, API y comunicación entre sistemas."
    },
    "technologies": [
      {
        "id": "postgresql",
        "name": "PostgreSQL",
        "label": {
          "en": "PostgreSQL",
          "es": "PostgreSQL"
        },
        "description": {
          "en": "Relational data storage for full-stack applications and business rules.",
          "es": "Almacenamiento relacional para aplicaciones full stack y reglas de negocio."
        },
        "symbol": "database"
      },
      {
        "id": "mysql",
        "name": "MySQL",
        "label": {
          "en": "MySQL",
          "es": "MySQL"
        },
        "description": {
          "en": "Relational schema design, data management, advanced queries and analytics.",
          "es": "Diseño de esquemas relacionales, gestión de datos, consultas avanzadas y análisis."
        },
        "symbol": "database"
      },
      {
        "id": "mongodb",
        "name": "MongoDB",
        "label": {
          "en": "MongoDB",
          "es": "MongoDB"
        },
        "description": {
          "en": "Document storage for microsites and extracted data in automation pipelines.",
          "es": "Almacenamiento de documentos para micrositios y datos extraídos en procesos de automatización."
        },
        "symbol": "database"
      },
      {
        "id": "sqlite",
        "name": "SQLite",
        "label": {
          "en": "SQLite",
          "es": "SQLite"
        },
        "description": {
          "en": "A database in my current data-storage toolkit.",
          "es": "Una base de datos de mis herramientas actuales de almacenamiento."
        },
        "symbol": "database"
      },
      {
        "id": "openvidu",
        "name": "OpenVidu",
        "label": {
          "en": "OpenVidu",
          "es": "OpenVidu"
        },
        "description": {
          "en": "Real-time video conferencing modules built with a Laravel backend at Agencia FixU.",
          "es": "Módulos de videoconferencia en tiempo real con un backend Laravel en Agencia FixU."
        },
        "symbol": "video"
      },
      {
        "id": "webrtc",
        "name": "WebRTC",
        "label": {
          "en": "WebRTC",
          "es": "WebRTC"
        },
        "description": {
          "en": "Real-time media communication used with OpenVidu.",
          "es": "Comunicación multimedia en tiempo real utilizada con OpenVidu."
        },
        "symbol": "video"
      },
      {
        "id": "websockets",
        "name": "WebSockets",
        "label": {
          "en": "WebSockets",
          "es": "WebSockets"
        },
        "description": {
          "en": "Real-time communication systems included in my professional profile.",
          "es": "Sistemas de comunicación en tiempo real incluidos en mi perfil profesional."
        },
        "symbol": "network"
      },
      {
        "id": "restful-apis",
        "name": "RESTful APIs",
        "label": {
          "en": "RESTful APIs",
          "es": "RESTful APIs"
        },
        "description": {
          "en": "Developing and integrating APIs with reactive interfaces and external services.",
          "es": "Desarrollo e integración de API con interfaces reactivas y servicios externos."
        },
        "symbol": "network"
      },
      {
        "id": "webhooks",
        "name": "Webhooks",
        "label": {
          "en": "Webhooks",
          "es": "Webhooks"
        },
        "description": {
          "en": "Event-driven integrations included in my integration toolkit.",
          "es": "Integraciones basadas en eventos incluidas en mis herramientas de integración."
        },
        "symbol": "network"
      }
    ]
  },
  {
    "id": "automation",
    "label": {
      "en": "Scraping & automation",
      "es": "Scraping y automatización"
    },
    "description": {
      "en": "Extracting data and connecting automated processes.",
      "es": "Extracción de datos y conexión de procesos automatizados."
    },
    "technologies": [
      {
        "id": "puppeteer",
        "name": "Puppeteer",
        "label": {
          "en": "Puppeteer",
          "es": "Puppeteer"
        },
        "description": {
          "en": "Browser automation and scraping pipelines with Node.js at R8write Tech.",
          "es": "Automatización del navegador y procesos de scraping con Node.js en R8write Tech."
        },
        "symbol": "code"
      },
      {
        "id": "web-scraping",
        "name": "Web scraping",
        "label": {
          "en": "Web scraping",
          "es": "Web scraping"
        },
        "description": {
          "en": "Automated extraction with Puppeteer and Python, including storage in MongoDB.",
          "es": "Extracción automatizada con Puppeteer y Python, incluido el almacenamiento en MongoDB."
        },
        "symbol": "network"
      },
      {
        "id": "data-extraction",
        "name": "Data extraction",
        "label": {
          "en": "Data extraction",
          "es": "Extracción de datos"
        },
        "description": {
          "en": "Collecting and processing data through asynchronous automation pipelines.",
          "es": "Recolección y procesamiento de datos mediante procesos asíncronos de automatización."
        },
        "symbol": "database"
      },
      {
        "id": "integration-pipelines",
        "name": "Integration pipelines",
        "label": {
          "en": "Integration pipelines",
          "es": "Procesos de integración"
        },
        "description": {
          "en": "Connecting external services, data extraction and application workflows.",
          "es": "Conexión de servicios externos, extracción de datos y procesos de aplicaciones."
        },
        "symbol": "network"
      }
    ]
  },
  {
    "id": "cloud",
    "label": {
      "en": "Cloud, DevOps & tools",
      "es": "Nube, DevOps y herramientas"
    },
    "description": {
      "en": "Deployment, version control and development tools.",
      "es": "Despliegue, control de versiones y herramientas de desarrollo."
    },
    "technologies": [
      {
        "id": "aws",
        "name": "AWS",
        "label": {
          "en": "AWS",
          "es": "AWS"
        },
        "description": {
          "en": "Cloud infrastructure used for application deployments.",
          "es": "Infraestructura en la nube utilizada para desplegar aplicaciones."
        },
        "symbol": "cloud"
      },
      {
        "id": "amazon-s3",
        "name": "Amazon S3",
        "label": {
          "en": "Amazon S3",
          "es": "Amazon S3"
        },
        "description": {
          "en": "Cloud storage used across several professional projects.",
          "es": "Almacenamiento en la nube utilizado en varios proyectos profesionales."
        },
        "symbol": "cloud"
      },
      {
        "id": "amazon-cloudfront",
        "name": "Amazon CloudFront",
        "label": {
          "en": "Amazon CloudFront",
          "es": "Amazon CloudFront"
        },
        "description": {
          "en": "AWS delivery infrastructure used in deployments at R8write Tech.",
          "es": "Infraestructura de distribución de AWS utilizada en despliegues en R8write Tech."
        },
        "symbol": "cloud"
      },
      {
        "id": "docker",
        "name": "Docker",
        "label": {
          "en": "Docker",
          "es": "Docker"
        },
        "description": {
          "en": "Container-based deployments with AWS infrastructure.",
          "es": "Despliegues con contenedores e infraestructura AWS."
        },
        "symbol": "code"
      },
      {
        "id": "git-flow",
        "name": "Git Flow",
        "label": {
          "en": "Git Flow",
          "es": "Git Flow"
        },
        "description": {
          "en": "A branching workflow in my development toolkit.",
          "es": "Un flujo de trabajo con ramas incluido en mis herramientas de desarrollo."
        },
        "symbol": "network"
      },
      {
        "id": "ci-cd",
        "name": "CI/CD",
        "label": {
          "en": "CI/CD",
          "es": "CI/CD"
        },
        "description": {
          "en": "Continuous integration and delivery practices in my development toolkit.",
          "es": "Prácticas de integración y entrega continuas incluidas en mis herramientas de desarrollo."
        },
        "symbol": "network"
      },
      {
        "id": "linux",
        "name": "Linux",
        "label": {
          "en": "Linux",
          "es": "Linux"
        },
        "description": {
          "en": "A working environment in my cloud and development toolkit.",
          "es": "Un entorno de trabajo de mis herramientas de nube y desarrollo."
        },
        "symbol": "code"
      },
      {
        "id": "postman",
        "name": "Postman",
        "label": {
          "en": "Postman",
          "es": "Postman"
        },
        "description": {
          "en": "A tool in my API development and integration toolkit.",
          "es": "Una herramienta de mi entorno de desarrollo e integración de API."
        },
        "symbol": "code"
      }
    ]
  },
  {
    "id": "ai",
    "label": {
      "en": "Methods & AI",
      "es": "Metodologías e IA"
    },
    "description": {
      "en": "Engineering practices and AI-assisted coding.",
      "es": "Prácticas de ingeniería y programación asistida por IA."
    },
    "technologies": [
      {
        "id": "github-copilot",
        "name": "GitHub Copilot",
        "label": {
          "en": "GitHub Copilot",
          "es": "GitHub Copilot"
        },
        "description": {
          "en": "AI-assisted coding tool included in my current engineering workflow.",
          "es": "Herramienta de programación asistida por IA incluida en mi flujo de ingeniería."
        },
        "symbol": "spark"
      },
      {
        "id": "chatgpt",
        "name": "ChatGPT",
        "label": {
          "en": "ChatGPT",
          "es": "ChatGPT"
        },
        "description": {
          "en": "AI-assisted coding and exploration tool in my engineering toolkit.",
          "es": "Herramienta de programación asistida por IA y exploración en mi entorno de ingeniería."
        },
        "symbol": "spark"
      },
      {
        "id": "agile-scrum",
        "name": "Agile / Scrum",
        "label": {
          "en": "Agile / Scrum",
          "es": "Agile / Scrum"
        },
        "description": {
          "en": "Iterative delivery and collaboration, including sprint-based work at Agencia FixU.",
          "es": "Entrega iterativa y colaboración, incluido el trabajo por sprints en Agencia FixU."
        },
        "symbol": "network"
      },
      {
        "id": "clean-architecture",
        "name": "Clean Architecture",
        "label": {
          "en": "Clean Architecture",
          "es": "Arquitectura limpia"
        },
        "description": {
          "en": "An architecture approach included in my engineering practices.",
          "es": "Un enfoque de arquitectura incluido en mis prácticas de ingeniería."
        },
        "symbol": "layers"
      },
      {
        "id": "solid",
        "name": "SOLID",
        "label": {
          "en": "SOLID",
          "es": "SOLID"
        },
        "description": {
          "en": "Object-oriented design principles included in my engineering practices.",
          "es": "Principios de diseño orientado a objetos incluidos en mis prácticas de ingeniería."
        },
        "symbol": "layers"
      }
    ]
  },
  {
    "id": "professional",
    "label": {
      "en": "Professional skills",
      "es": "Competencias profesionales"
    },
    "description": {
      "en": "How I collaborate, learn and deliver software.",
      "es": "Cómo colaboro, aprendo y entrego software."
    },
    "technologies": [
      {
        "id": "critical-thinking",
        "name": "Critical thinking",
        "label": {
          "en": "Critical thinking",
          "es": "Pensamiento crítico"
        },
        "description": {
          "en": "Analysing requirements and approaching engineering decisions thoughtfully.",
          "es": "Análisis de requerimientos y reflexión para tomar decisiones de ingeniería."
        },
        "symbol": "spark"
      },
      {
        "id": "problem-solving",
        "name": "Problem-solving",
        "label": {
          "en": "Problem-solving",
          "es": "Resolución de problemas"
        },
        "description": {
          "en": "Resolving development issues and improving application workflows.",
          "es": "Resolución de incidencias de desarrollo y mejora de procesos de aplicaciones."
        },
        "symbol": "code"
      },
      {
        "id": "full-stack-collaboration",
        "name": "Full-stack collaboration",
        "label": {
          "en": "Full-stack collaboration",
          "es": "Colaboración full stack"
        },
        "description": {
          "en": "Working across frontend, backend and distributed technical teams.",
          "es": "Trabajo entre frontend, backend y equipos técnicos distribuidos."
        },
        "symbol": "network"
      },
      {
        "id": "on-time-delivery",
        "name": "On-time delivery",
        "label": {
          "en": "On-time delivery",
          "es": "Entrega a tiempo"
        },
        "description": {
          "en": "Delivering work within agreed schedules and sprint commitments.",
          "es": "Entrega de trabajo en los plazos acordados y compromisos de los sprints."
        },
        "symbol": "layers"
      },
      {
        "id": "continuous-learning",
        "name": "Continuous learning",
        "label": {
          "en": "Continuous learning",
          "es": "Aprendizaje continuo"
        },
        "description": {
          "en": "Exploring emerging technologies and methodologies.",
          "es": "Exploración de tecnologías y metodologías emergentes."
        },
        "symbol": "spark"
      },
      {
        "id": "english-b2",
        "name": "English — B2+",
        "label": {
          "en": "English — B2+",
          "es": "Inglés — B2+"
        },
        "description": {
          "en": "Upper-intermediate English, strengthened by study in Australia and international collaboration.",
          "es": "Inglés intermedio alto, fortalecido con estudios en Australia y colaboración internacional."
        },
        "symbol": "network"
      },
      {
        "id": "software-implementation",
        "name": "Software implementation",
        "label": {
          "en": "Software implementation",
          "es": "Implementación de software"
        },
        "description": {
          "en": "Software development and implementation as part of my professional competencies.",
          "es": "Desarrollo e implementación de software como parte de mis competencias profesionales."
        },
        "symbol": "code"
      },
      {
        "id": "augmented-reality",
        "name": "Augmented reality",
        "label": {
          "en": "Augmented reality",
          "es": "Realidad aumentada"
        },
        "description": {
          "en": "Background in augmented reality, listed among my additional competencies.",
          "es": "Conocimientos previos en realidad aumentada, incluidos entre mis competencias adicionales."
        },
        "symbol": "layers"
      }
    ]
  },
  {
    "id": "portfolio",
    "label": {
      "en": "This portfolio",
      "es": "Este portafolio"
    },
    "description": {
      "en": "The technologies powering this website.",
      "es": "Las tecnologías que hacen funcionar este sitio."
    },
    "technologies": [
      {
        "id": "react",
        "name": "React",
        "label": {
          "en": "React",
          "es": "React"
        },
        "description": {
          "en": "React provides the reusable components and interaction state in this portfolio.",
          "es": "React permite crear los componentes reutilizables y gestionar las interacciones de este portafolio."
        },
        "symbol": "code"
      },
      {
        "id": "vite",
        "name": "Vite",
        "label": {
          "en": "Vite",
          "es": "Vite"
        },
        "description": {
          "en": "Vite runs the local preview and builds the production version of this portfolio.",
          "es": "Vite ejecuta la vista previa local y genera la versión de producción de este portafolio."
        },
        "symbol": "code"
      },
      {
        "id": "css",
        "name": "CSS",
        "label": {
          "en": "CSS",
          "es": "CSS"
        },
        "description": {
          "en": "CSS defines the visual identity, responsive layouts and restrained motion in this portfolio.",
          "es": "CSS define la identidad visual, los diseños adaptables y el movimiento sutil de este portafolio."
        },
        "symbol": "code"
      }
    ]
  }
];

export const technologyGroups = groups.map(group => ({ ...group,
  technologies: group.technologies.map(technology => ({ ...technology,
    projectIds: ['React', 'Vite', 'CSS'].includes(technology.name) ? ['portfolio'] : [],
    experienceIds: experience.filter(entry => entry.technologies.includes(technology.name)).map(entry => entry.id),
  })),
}));

export function technologyHref(name) {
  for (const group of technologyGroups) {
    const technology = group.technologies.find(item => item.name === name);
    if (technology) return `#skills/${group.id}/${technology.id}`;
  }
  return '#skills';
}
