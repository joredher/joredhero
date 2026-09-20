import { companies } from './companies.js';
import { countries } from './countries.js';

// Source: owner-supplied 2026 CVs (EN and ES). Dates and overlapping roles are preserved.
// Technical links reflect technologies explicitly named in each role; no inferred proficiency scores.
//
// `details` keeps the CV's full bullets (entry page and SEO summary). `highlights` is the brief
// version shown on the timeline cards, with **key phrases** marked for emphasis — it only compresses
// what the CV already says. `titleAccent` is the part of the title shown in the accent colour.
const roles = [
  {
    id: 'delta',
    companyId: 'delta',
    title: { en: 'Frontend Engineer', es: 'Ingeniero frontend' },
    titleAccent: { en: 'Frontend', es: 'frontend' },
    period: { en: 'Jan 2026 – Present', es: 'Ene 2026 – Actualidad' },
    current: true,
    partTime: true,
    summary: {
      en: 'Modular interfaces and ongoing improvements for the 119 Emergencias application.',
      es: 'Interfaces modulares y mejoras continuas para la aplicación 119 Emergencias.',
    },
    highlights: [
      {
        en: 'Modular components and reactive interfaces for **cross-platform web and mobile** apps (**React, Vue, Ionic**).',
        es: 'Componentes modulares e interfaces reactivas para apps **web y móviles multiplataforma** (**React, Vue, Ionic**).',
      },
      {
        en: 'Requirements and bug resolution across **web and mobile** for the **119 Emergencias** project.',
        es: 'Atención de requerimientos e incidencias en **web y móvil** del proyecto **119 Emergencias**.',
      },
    ],
    technologies: ['React', 'Vue.js', 'Node.js', 'Laravel', 'Ionic'],
    details: [
      {
        en: 'Contributed to designing modular components and reactive interfaces for cross-platform web and mobile applications (React, Vue, Ionic), ensuring a scalable frontend architecture and efficient consumption of backend services.',
        es: 'Participé en el diseño de componentes modulares e interfaces reactivas para plataformas web y móviles multiplataforma (React, Vue, Ionic), garantizando una arquitectura de frontend escalable y un consumo eficiente de servicios backend.',
      },
      {
        en: 'Handled requirements and resolved issues using a ticketing system, addressing development bugs across both mobile and web platforms for the 119 Emergencias project.',
        es: 'Atiendo requerimientos y resuelvo incidencias mediante un sistema de tickets, resolviendo fisuras en el desarrollo tanto móvil como web del proyecto 119 Emergencias.',
      },
      {
        en: 'Continue to collaborate on the ongoing development and enhancement of the 119 application.',
        es: 'Continúo colaborando en la evolución y el desarrollo de la aplicación 119.',
      },
    ],
  },
  {
    id: 'r8write',
    companyId: 'r8write',
    title: { en: 'Full Stack Developer II', es: 'Desarrollador full stack II' },
    titleAccent: { en: 'Full Stack', es: 'full stack' },
    period: { en: 'May 2022 – May 2024', es: 'May 2022 – May 2024' },
    partTime: false,
    summary: {
      en: 'Full-stack applications, automated data extraction and cloud deployments for an international team.',
      es: 'Aplicaciones full stack, extracción automatizada de datos y despliegues en la nube para un equipo internacional.',
    },
    highlights: [
      {
        en: 'Architected **full-stack** solutions (**Laravel, Vue.js, PostgreSQL**) for **high-traffic** apps and complex business rules.',
        es: 'Diseño de la arquitectura **full stack** (**Laravel, Vue.js, PostgreSQL**) para **alto tráfico** y reglas de negocio complejas.',
      },
      {
        en: 'Built **web scraping** and asynchronous pipelines (**Puppeteer, Python**) automating large-scale data extraction into **MongoDB**.',
        es: 'Pipelines de **web scraping** y procesamiento asíncrono (**Puppeteer, Python**) para la extracción masiva de datos hacia **MongoDB**.',
      },
      {
        en: 'Secure **REST API** integrations and **AWS** (S3, CloudFront) deployments with **Docker**, alongside distributed international teams.',
        es: 'Integraciones **API RESTful** seguras y despliegues en **AWS** (S3, CloudFront) con **Docker**, en equipos distribuidos.',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'TypeScript', 'MongoDB', 'Node.js', 'Python', 'AWS', 'Docker', 'Puppeteer', 'RESTful APIs', 'Amazon S3', 'Amazon CloudFront'],
    details: [
      {
        en: 'Architected full-stack software solutions using Laravel, Vue.js, and PostgreSQL to handle high-traffic applications and complex business rules.',
        es: 'Diseñé la arquitectura de software backend/frontend con Laravel, Vue.js y PostgreSQL para soportar alto tráfico y reglas de negocio complejas.',
      },
      {
        en: 'Engineered Web Scraping and asynchronous processing pipelines using Node.js (Puppeteer) and Python, automating large-scale data extraction into MongoDB.',
        es: 'Desarrollé pipelines de Web Scraping y procesamiento asíncrono con Node.js (Puppeteer) y Python, automatizando la extracción masiva de datos hacia MongoDB.',
      },
      {
        en: 'Integrated secure RESTful APIs and core modules with external services, ensuring data protection and seamless interoperability.',
        es: 'Integré servicios externos y módulos core mediante APIs RESTful seguras, garantizando la interoperabilidad y protección de datos.',
      },
      {
        en: 'Orchestrated deployments on AWS infrastructure (S3, CloudFront) using Docker.',
        es: 'Orquesté despliegues en infraestructura AWS (S3, CloudFront) utilizando contenedores Docker para optimizar entregas continuas (CI/CD).',
      },
      {
        en: 'Interpreted and implemented technical requirements in English while collaborating with distributed international teams.',
        es: 'Leí e interpreté requisitos técnicos en inglés para proyectos con equipos distribuidos.',
      },
    ],
  },
  {
    id: 'legopstech',
    companyId: 'legopstech',
    title: { en: 'Microsite Development Engineer I', es: 'Ingeniero de desarrollo de micrositios I' },
    titleAccent: { en: 'Microsite Development', es: 'desarrollo de micrositios' },
    period: { en: 'Aug 2022 – Mar 2023', es: 'Ago 2022 – Mar 2023' },
    partTime: true,
    summary: {
      en: 'Dynamic microsites, service availability and product improvements.',
      es: 'Micrositios dinámicos, disponibilidad del servicio y mejoras del producto.',
    },
    highlights: [
      {
        en: 'Dynamic **microsites** with **Laravel, Blade and MongoDB**, prioritising **page speed** and cross-platform compatibility.',
        es: 'Micrositios dinámicos con **Laravel, Blade y MongoDB**, priorizando la **velocidad de carga** y la compatibilidad multiplataforma.',
      },
      {
        en: 'Requirements and issues handled through a **ticketing system** to maintain service availability.',
        es: 'Requerimientos e incidencias atendidos mediante un **sistema de tickets**.',
      },
    ],
    technologies: ['Laravel', 'Blade', 'jQuery', 'MongoDB', 'Bootstrap'],
    details: [
      {
        en: 'Engineered dynamic microsites using Laravel, Blade, and MongoDB, prioritising page load speed and cross-platform compatibility.',
        es: 'Desarrollé y estructuré micrositios dinámicos con Laravel, Blade y MongoDB, priorizando velocidad de carga y compatibilidad multiplataforma.',
      },
      {
        en: 'Handled technical requirements and resolved issues using a ticketing system to maintain service availability.',
        es: 'Atendí requerimientos y resolví incidencias mediante un sistema de tickets.',
      },
      {
        en: 'Collaborated with the development team to drive system optimisations, feature enhancements, and product quality.',
        es: 'Colaboré con el equipo para implementar mejoras, optimizar el rendimiento y mantener la calidad del producto.',
      },
    ],
  },
  {
    id: 'fixu',
    companyId: 'fixu',
    title: { en: 'Full Stack Web Developer', es: 'Desarrollador web full stack' },
    titleAccent: { en: 'Full Stack Web', es: 'web full stack' },
    period: { en: 'Jun 2021 – Feb 2023', es: 'Jun 2021 – Feb 2023' },
    partTime: false,
    summary: {
      en: 'Real-time video conferencing, scheduling and reactive frontend modules.',
      es: 'Videoconferencias en tiempo real, programación de citas y módulos frontend reactivos.',
    },
    highlights: [
      {
        en: '**Real-time video conferencing** modules with **WebRTC (OpenVidu)** and a **Laravel** backend on a scalable web architecture.',
        es: 'Módulos para una plataforma de **videoconferencia en tiempo real** con **WebRTC (OpenVidu)** y backend en **Laravel**.',
      },
      {
        en: 'Optimised the **scheduling system** and shipped features in **Agile/Scrum** sprints.',
        es: 'Optimización del **sistema de agendamientos** y nuevas funcionalidades en sprints **Agile/Scrum**.',
      },
      {
        en: '**Vue.js** frontend modules, collaborating with the core team on **quality and stability**.',
        es: 'Módulos de frontend con **Vue.js**, colaborando con el equipo técnico en **calidad y estabilidad**.',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'OpenVidu', 'WebRTC', 'JavaScript', 'Blade', 'jQuery', 'MongoDB', 'MySQL', 'PostgreSQL', 'Bootstrap', 'Agile / Scrum'],
    details: [
      {
        en: 'Developed software modules for a real-time video conferencing platform, implementing WebRTC media servers (OpenVidu) and a Laravel backend built on scalable web architecture.',
        es: 'Desarrollé módulos de software para una plataforma de videoconferencia, aplicando arquitecturas web escalables en tiempo real, implementando servidores de medios OpenVidu (WebRTC) y backend en Laravel.',
      },
      {
        en: "Optimised the scheduling system's performance and integrated new features under Agile/SCRUM methodologies, consistently meeting sprint deliverables.",
        es: 'Optimicé el rendimiento del sistema de agendamientos e integré funcionalidades y servicios bajo metodologías ágiles (SCRUM), cumpliendo entregas en sprints.',
      },
      {
        en: 'Engineered frontend UI modules using Vue.js to enhance user experience and platform responsiveness.',
        es: 'Implementé y desarrollé módulos en el FrontEnd con VueJS.',
      },
      {
        en: 'Collaborated with the core technical team to drive continuous improvement, software quality, and system stability.',
        es: 'Colaboré activamente con el equipo técnico enfocado en calidad, estabilidad y mejora continua.',
      },
    ],
  },
  {
    id: 'ntics',
    companyId: 'ntics',
    title: { en: 'Software Development Engineer', es: 'Ingeniero de desarrollo de software' },
    titleAccent: { en: 'Software Development', es: 'desarrollo de software' },
    period: { en: 'Sep 2020 – Sep 2021', es: 'Sep 2020 – Sep 2021' },
    partTime: false,
    summary: {
      en: 'Migration and extension of a project management application.',
      es: 'Migración y ampliación de una aplicación de gestión de proyectos.',
    },
    highlights: [
      {
        en: '**Migrated** a project-management application to **Laravel**, improving scalability and performance.',
        es: '**Migración** de una aplicación de gestión de proyectos a **Laravel**, mejorando escalabilidad y rendimiento.',
      },
      {
        en: '**RESTful APIs** integrated with a reactive **Vue.js** frontend, optimising user experience and responsiveness.',
        es: '**API REST** integrada a un frontend reactivo en **Vue.js**, optimizando la experiencia de usuario y la capacidad de respuesta.',
      },
      {
        en: 'Open-source databases (**MySQL**) and additional core modules extending the application.',
        es: 'Bases de datos open source (**MySQL**) y módulos adicionales que amplían la aplicación.',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'PostgreSQL', 'MySQL', 'TypeScript', 'Node.js', 'Amazon S3', 'RESTful APIs'],
    details: [
      {
        en: 'Migrated a project management application to the Laravel framework, significantly enhancing system scalability and overall performance.',
        es: 'Migré una aplicación de gestión de proyectos al framework Laravel, mejorando la escalabilidad y el rendimiento del sistema.',
      },
      {
        en: 'Developed and integrated RESTful APIs with a reactive Vue.js frontend, optimising user experience and interface responsiveness.',
        es: 'Desarrollé e integré una API Rest a un front-end reactivo utilizando Vue.js, optimizando la experiencia de usuario y la capacidad de respuesta.',
      },
      {
        en: 'Leveraged open-source database technologies such as MySQL and supported the development of additional core modules to extend application functionality.',
        es: 'Utilicé tecnologías open source como MySQL para la gestión de bases de datos y apoyé el desarrollo de módulos adicionales para extender la funcionalidad de la aplicación.',
      },
    ],
  },
  {
    id: 'creandosoft',
    companyId: 'creandosoft',
    title: { en: 'Full Stack Web Developer', es: 'Desarrollador web full stack' },
    titleAccent: { en: 'Full Stack Web', es: 'web full stack' },
    period: { en: 'Mar 2020 – Aug 2020', es: 'Mar 2020 – Ago 2020' },
    partTime: false,
    summary: {
      en: 'Healthcare service workflows and reactive interfaces for a Colombian EPS.',
      es: 'Procesos de atención en salud e interfaces reactivas para una EPS colombiana.',
    },
    highlights: [
      {
        en: '**Healthcare service workflows** for a Colombian EPS, improving efficiency and **regulatory compliance**.',
        es: 'Procesos de **gestión de servicios médicos** de una EPS colombiana, con mayor eficiencia y **cumplimiento normativo**.',
      },
      {
        en: 'Reactive **Vue.js** interface connecting providers and members with **real-time** updates.',
        es: 'Interfaz reactiva en **Vue.js** entre prestadores y afiliados, con actualizaciones en **tiempo real**.',
      },
      {
        en: '**MySQL** optimisation for scalability and cost, plus advanced **SQL** analytics for faster, more precise queries.',
        es: 'Optimización de **MySQL** para escalabilidad y costos, y análisis con consultas **SQL** más rápidas y precisas.',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'TypeScript', 'MySQL', 'Amazon S3'],
    details: [
      {
        en: 'Engineered healthcare service workflows for a Colombian EPS, improving operational efficiency and ensuring full compliance with local health regulations.',
        es: 'Rediseñé los procesos de gestión de servicios médicos de un sistema EPS colombiano, mejorando la eficiencia y garantizando el cumplimiento con la normativa local.',
      },
      {
        en: 'Developed an intuitive, reactive interface using Vue.js to streamline interactions between healthcare providers and members, enabling real-time service delivery and updates.',
        es: 'Desarrollé una interfaz intuitiva y reactiva utilizando Vue.js, orientada a optimizar las interacciones entre proveedores de salud y afiliados, facilitando la entrega de servicios y actualizaciones en tiempo real.',
      },
      {
        en: 'Optimized MySQL data storage and management with a focus on scalability and cost efficiency, directly supporting strategic EPS system objectives.',
        es: 'Optimicé el manejo y almacenamiento de datos mediante MySQL, con enfoque en escalabilidad y eficiencia de costos, apoyando los objetivos estratégicos del sistema EPS.',
      },
      {
        en: 'Enhanced data analytics and performance tracking through advanced SQL queries, increasing query speed and precision to support data-driven decision-making.',
        es: 'Mejoré los análisis de datos y métricas de rendimiento mediante consultas SQL, incrementando la velocidad y precisión de las consultas y facilitando la toma de decisiones basada en datos.',
      },
    ],
  },
  {
    id: 'sistemas-inteligentes',
    companyId: 'sistemas-inteligentes',
    title: { en: 'Full Stack Junior Developer', es: 'Desarrollador full stack junior' },
    titleAccent: { en: 'Full Stack Junior', es: 'full stack junior' },
    period: { en: 'Jun 2018 – Feb 2020', es: 'Jun 2018 – Feb 2020' },
    partTime: false,
    summary: {
      en: 'Early development of an enterprise management system for a regional health department.',
      es: 'Desarrollo inicial de un sistema de gestión empresarial para una secretaría de salud regional.',
    },
    highlights: [
      {
        en: '**Greenfield** enterprise management system for a regional health department.',
        es: 'Desarrollo **desde cero** de un software de gestión empresarial para una entidad de salud departamental.',
      },
      {
        en: 'Core **Finance and Authorisations** modules for healthcare and administrative processes.',
        es: 'Módulos de **Finanzas y Autorizaciones** para procesos administrativos y de salud.',
      },
      {
        en: 'First **relational database** design, **Vue.js** interfaces and complex **SQL** queries.',
        es: 'Diseño de la primera **base de datos relacional**, interfaces en **Vue.js** y consultas **SQL**.',
      },
    ],
    technologies: ['Laravel', 'Vue.js', 'PHP', 'MySQL', 'Amazon S3'],
    details: [
      {
        en: 'Contributed to the greenfield development of an enterprise management system for a regional health department.',
        es: 'Participé en el desarrollo desde cero de un software de gestión empresarial para una entidad de salud departamental.',
      },
      {
        en: 'Assisted in designing and building the initial relational database schema, defining data structures and relationships for information management.',
        es: 'Apoyé el diseño y la creación de la primera base de datos del sistema, definiendo estructuras y relaciones para la gestión de la información.',
      },
      {
        en: 'Engineered core functionality for Finance and Authorisations modules to streamline healthcare and administrative processes.',
        es: 'Participé en el desarrollo de los módulos de Finanzas y Autorizaciones, implementando funcionalidades para la gestión de procesos administrativos y de salud.',
      },
      {
        en: 'Developed dynamic user interfaces and features using Vue.js, building an intuitive and efficient application experience.',
        es: 'Desarrollé interfaces y funcionalidades utilizando Vue.js, contribuyendo a la construcción de una aplicación intuitiva y eficiente.',
      },
      {
        en: 'Implemented complex SQL queries for data retrieval and management, supporting system performance and analytics.',
        es: 'Implementé consultas SQL para la gestión y consulta de información, apoyando el rendimiento y los procesos de análisis de datos.',
      },
    ],
  },
];

// The company owns the name and place, so `organization` and `location` are derived from it —
// that keeps older consumers (SEO summary, technology pages) reading the same fields as before.
export const experience = roles.map(role => {
  const { name, location } = companies[role.companyId];
  const place = `${location.city}, ${location.region}`;
  const country = countries[location.country].name;
  return {
    ...role,
    organization: name,
    location: { en: `${place}, ${country.en}`, es: `${place}, ${country.es}` },
  };
});
