export interface ProjectItem {
  id: string;
  title: string;
  category: "all" | "client_b2b" | "saas_ai" | "labs";
  tag: { es: string; en: string };
  folderColor: "yellow" | "green" | "cyan" | "orange" | "purple" | "pink";
  problem: { es: string; en: string };
  solution: { es: string; en: string };
  impact: { es: string; en: string };
  stack: string[];
  image: string;
  link?: string;
  github?: string;
  confidential?: boolean;
}

export interface ServiceItem {
  id: string;
  title: { es: string; en: string };
  deliverables: { es: string; en: string };
  description: { es: string; en: string };
  folderColor: "yellow" | "green" | "cyan" | "orange" | "purple" | "pink";
  iconName: "Rocket" | "Sparkles" | "LayoutGrid" | "ShieldCheck";
}

export interface TimelineItem {
  period: string;
  role: { es: string; en: string };
  organization: { es: string; en: string };
  description: { es: string; en: string };
  bullets: { es: string[]; en: string[] };
  type: "education" | "experience";
  accentColor: "yellow" | "green" | "cyan" | "orange" | "purple";
}

export interface SkillCategory {
  category: { es: string; en: string };
  accentColor: "yellow" | "green" | "cyan" | "orange" | "purple";
  skills: string[];
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Pablo Barcala",
    role: {
      es: "Full Stack Engineer & AI Solutions Builder",
      en: "Full Stack Engineer & AI Solutions Builder",
    },
    location: "Tucumán, Argentina",
    email: "pablo.d.barcala@gmail.com",
    whatsappNumber: "+543815465017",
    whatsappMessage: {
      es: "Hola Pablo! Vi tu portfolio y me gustaría conversar sobre un proyecto...",
      en: "Hi Pablo! I saw your portfolio and would like to discuss a project...",
    },
    github: "https://github.com/pablobarcala",
    linkedin: "https://www.linkedin.com/in/pablo-dami%C3%A1n-barcala-60a1a923a/",
    statusBadge: {
      es: "Disponible para proyectos freelance y roles full-time",
      en: "Available for freelance projects & full-time roles",
    },
    bio: {
      es: "Desarrollador Full Stack con visión de negocio y producto. Combino ingeniería de software sólida (Next.js, .NET, TypeScript, TDD) con integraciones de Inteligencia Artificial para crear herramientas rápidas, confiables y con alto impacto comercial.",
      en: "Full Stack Developer with a strong product and business mindset. I combine solid software engineering (Next.js, .NET, TypeScript, TDD) with AI integrations to build fast, reliable, and high-impact digital solutions.",
    },
  },

  metrics: [
    {
      value: "+3",
      label: { es: "Años creando software", en: "Years building software" },
      badge: "Exp",
      color: "yellow" as const,
    },
    {
      value: "Full Stack",
      label: { es: "Next.js, .NET, Node, Python", en: "Next.js, .NET, Node, Python" },
      badge: "Stack",
      color: "green" as const,
    },
    {
      value: "TDD & Calidad",
      label: { es: "Graduado UNSTA", en: "UNSTA Degree" },
      badge: "Quality",
      color: "cyan" as const,
    },
    {
      value: "Visión Producto",
      label: { es: "Ex-Cofundador & Lead", en: "Ex-Co-Founder & Lead" },
      badge: "Business",
      color: "orange" as const,
    },
  ],

  services: [
    {
      id: "mvps",
      title: {
        es: "Desarrollo de MVPs & Productos Web",
        en: "MVP & Web Product Development",
      },
      deliverables: {
        es: "De la idea a producción en 2 a 4 semanas",
        en: "From idea to production in 2 to 4 weeks",
      },
      description: {
        es: "Construcción rápida de productos digitales con Next.js 15, TypeScript y TailwindCSS. Arquitecturas preparadas para validar con usuarios reales y escalar sin reescribir.",
        en: "Rapid building of digital products with Next.js 15, TypeScript, and TailwindCSS. Architectures ready to validate with real users and scale without rewrites.",
      },
      folderColor: "yellow" as const,
      iconName: "Rocket" as const,
    },
    {
      id: "ai-solutions",
      title: {
        es: "Integración de Inteligencia Artificial",
        en: "AI Integration & Automation",
      },
      deliverables: {
        es: "Agentes, Chatbots & Automatizaciones",
        en: "Agents, Chatbots & Automations",
      },
      description: {
        es: "Implementación de IA aplicada a negocios: extracción de datos estructurados, flujos de trabajo inteligentes y asistentes contextuales usando Gemini y OpenAI.",
        en: "Applied AI for business: structured data extraction, intelligent workflows, and context-aware assistants powered by Gemini and OpenAI.",
      },
      folderColor: "green" as const,
      iconName: "Sparkles" as const,
    },
    {
      id: "saas-systems",
      title: {
        es: "Sistemas a Medida & Plataformas SaaS",
        en: "Custom Software & SaaS Platforms",
      },
      deliverables: {
        es: "Dashboards, Auth, Pagos & APIs",
        en: "Dashboards, Auth, Payments & APIs",
      },
      description: {
        es: "Paneles de control, sistemas de gestión interna, integración de pasarelas de pago (MercadoPago/Stripe) y APIs robustas con .NET y bases de datos relacionales/NoSQL.",
        en: "Control panels, internal management systems, payment gateway integration (MercadoPago/Stripe), and robust APIs with .NET and SQL/NoSQL databases.",
      },
      folderColor: "cyan" as const,
      iconName: "LayoutGrid" as const,
    },
    {
      id: "quality-refactor",
      title: {
        es: "Calidad de Software & Testing",
        en: "Software Quality & Testing",
      },
      deliverables: {
        es: "TDD, Cypress, CI/CD & Performance",
        en: "TDD, Cypress, CI/CD & Performance",
      },
      description: {
        es: "Auditoría de código, refactorización de aplicaciones existentes, implementación de suites de tests automatizados y optimización de velocidad de carga y SEO.",
        en: "Code audit, legacy refactoring, automated testing suites (TDD, Cypress, Postman), and performance & SEO optimization.",
      },
      folderColor: "orange" as const,
      iconName: "ShieldCheck" as const,
    },
  ] as ServiceItem[],

  projects: [
    {
      id: "roboteach",
      title: "RoboTeach",
      category: "saas_ai",
      folderColor: "green",
      tag: {
        es: "Plataforma EdTech con IA",
        en: "AI EdTech Platform",
      },
      problem: {
        es: "La enseñanza tradicional de programación para niños suele ser abstracta y desmotiva a los alumnos.",
        en: "Traditional programming education for kids is often abstract, causing high drop-off and boredom.",
      },
      solution: {
        es: "Plataforma gamificada con tutoría inteligente guiada por IA, feedback en tiempo real y ejercicios por niveles.",
        en: "Gamified learning platform with AI-guided tutoring, real-time feedback, and tiered challenges.",
      },
      impact: {
        es: "Plataforma multi-módulo con arquitectura desacoplada en frontend y backend en .NET.",
        en: "Multi-module platform with decoupled frontend and .NET backend for high responsiveness.",
      },
      stack: ["Angular", ".NET 8", "Python", "MongoDB", "AI Engine"],
      image: "/images/roboteach.png",
      link: "https://www.roboteach.io",
    },
    {
      id: "nutricheck",
      title: "NutriCheck",
      category: "client_b2b",
      folderColor: "cyan",
      tag: {
        es: "Sistema Clínico & Nutricional B2B",
        en: "B2B Clinical & Nutrition System",
      },
      problem: {
        es: "Nutricionistas perdían horas redactando planes manuales y gestionando el seguimiento de pacientes por chats dispersos.",
        en: "Nutritionists spent hours manually drafting plans and tracking patient progress across scattered chats.",
      },
      solution: {
        es: "Dashboard integral para gestión de fichas clínicas, cálculo automatizado de métricas y planes nutricionales dinámicos.",
        en: "All-in-one dashboard for medical records, automated nutritional calculations, and dynamic meal plans.",
      },
      impact: {
        es: "Reducción estimada del 60% en tiempo administrativo por paciente. Lideré el equipo como Scrum Master y Full Stack Lead.",
        en: "Estimated 60% reduction in administrative time per patient. Acted as Scrum Master and Full Stack Lead.",
      },
      stack: ["Next.js", ".NET", "MongoDB", "TailwindCSS", "Scrum"],
      image: "/images/nutricheck.png",
      link: "https://nutricheck-front.vercel.app/login",
      github: "https://github.com/pablobarcala/nutricheck-front",
    },
    {
      id: "client-ecommerce",
      title: "E-Commerce & Gestión Operativa",
      category: "client_b2b",
      folderColor: "yellow",
      confidential: true,
      tag: {
        es: "Solución a Medida para Cliente",
        en: "Custom Client Solution",
      },
      problem: {
        es: "Un negocio local gestionaba ventas y stock en planillas manuales, generando quiebres de inventario y demoras en entregas.",
        en: "A local business handled orders and stock on manual spreadsheets, causing stockouts and delivery delays.",
      },
      solution: {
        es: "Plataforma web con catálogo sincronizado en tiempo real, checkout integrado con pasarelas de pago y panel de administración.",
        en: "Web platform with real-time synchronized catalog, integrated checkout, and admin operations portal.",
      },
      impact: {
        es: "Automatización total de confirmaciones y cobros, eliminando errores de stock y agilizando despachos.",
        en: "Full automation of orders and payments, eliminating inventory errors and speeding up order dispatch.",
      },
      stack: ["React", "Node.js / Express", "PostgreSQL", "TailwindCSS", "MercadoPago"],
      image: "/images/portfolio.png",
    },
    {
      id: "portfolio-neo",
      title: "Portfolio Neo-Brutalist",
      category: "labs",
      folderColor: "purple",
      tag: {
        es: "Arquitectura & UI Design",
        en: "Architecture & UI Design",
      },
      problem: {
        es: "Necesidad de comunicar valor comercial a clientes y solidez técnica a reclutadores sin fricción.",
        en: "Need to clearly convey business value to clients and technical depth to engineering leads with zero friction.",
      },
      solution: {
        es: "Sitio web de alto rendimiento con diseño Neo-Brutalist, soporte bilingüe nativo, Light/Dark mode y 100% de puntuación en Lighthouse.",
        en: "High-performance website with Neo-Brutalist design, native dual language, Light/Dark theme, and 100 Lighthouse score.",
      },
      impact: {
        es: "Carga instantánea < 100ms, diseño memorable y navegación fluida orientada a conversión.",
        en: "Instant load < 100ms, memorable branding, and conversion-focused user flow.",
      },
      stack: ["Next.js 15", "TypeScript", "TailwindCSS v4", "Framer Motion"],
      image: "/images/portfolio.png",
      github: "https://github.com/pablobarcala/portfolio",
    },
  ] as ProjectItem[],

  skillCategories: [
    {
      category: { es: "Frontend & UI", en: "Frontend & UI" },
      accentColor: "yellow",
      skills: ["React / Next.js 15", "TypeScript", "TailwindCSS v4", "Angular", "HTML5 & Modern CSS", "Figma"],
    },
    {
      category: { es: "Backend & Datos", en: "Backend & Databases" },
      accentColor: "green",
      skills: [".NET 8 (C#)", "Node.js / Express", "Python (Flask)", "PostgreSQL", "MongoDB", "MySQL", "Supabase"],
    },
    {
      category: { es: "IA & Automatización", en: "AI & Automation" },
      accentColor: "purple",
      skills: ["Google Gemini API", "OpenAI / Claude", "Structured Outputs", "Prompt Engineering", "Copilots & Agentes"],
    },
    {
      category: { es: "Calidad, Testing & DevOps", en: "Quality, Testing & DevOps" },
      accentColor: "cyan",
      skills: ["TDD (Test-Driven Dev)", "Cypress", "Postman", "Docker", "Git / GitHub Actions", "Clean Architecture", "Scrum"],
    },
  ] as SkillCategory[],

  timeline: [
    {
      period: "2023 — 2025",
      role: {
        es: "Técnico en Desarrollo y Calidad de Software",
        en: "Associate Degree in Software Development & Quality",
      },
      organization: {
        es: "UNSTA (Universidad del Norte Santo Tomás de Aquino)",
        en: "UNSTA University",
      },
      description: {
        es: "Carrera técnica enfocada en desarrollo full stack, metodologías ágiles, estándares de calidad de software y patrones de arquitectura limpia.",
        en: "Technical degree focused on full stack development, agile methodologies, software quality standards, and clean architecture.",
      },
      bullets: {
        es: [
          "Especialización en arquitecturas web modernas y buenas prácticas de ingeniería",
          "Rol de Scrum Master en proyectos integradores universitarios",
          "Énfasis en testing y aseguramiento de calidad (QA)"
        ],
        en: [
          "Specialization in modern web architectures and software engineering standards",
          "Acted as Scrum Master on capstone university team projects",
          "Strong focus on testing and quality assurance (QA)"
        ],
      },
      type: "education",
      accentColor: "cyan",
    },
    {
      period: "2023 — Presente",
      role: {
        es: "Desarrollador Full Stack Freelance",
        en: "Freelance Full Stack Developer",
      },
      organization: {
        es: "Proyectos Independientes & Clientes",
        en: "Independent Projects & Clients",
      },
      description: {
        es: "Diseño y desarrollo de aplicaciones web a medida, landing pages de alta conversión, integración de pasarelas de pago y automatizaciones.",
        en: "Design and development of custom web applications, high-converting landing pages, payment gateway integrations, and automations.",
      },
      bullets: {
        es: [
          "Desarrollo end-to-end con Next.js, React, Node.js y .NET",
          "Integración de pasarelas de pago (MercadoPago) y APIs de terceros",
          "Trato directo con clientes y traducción de necesidades de negocio a software"
        ],
        en: [
          "End-to-end development with Next.js, React, Node.js, and .NET",
          "Payment gateway (MercadoPago) and third-party API integrations",
          "Direct client collaboration translating business goals into functioning software"
        ],
      },
      type: "experience",
      accentColor: "green",
    },
    {
      period: "2023",
      role: {
        es: "Pasantía: Profesor de Robótica y Programación",
        en: "Teaching Internship: Robotics & Programming",
      },
      organization: {
        es: "Educación Tecnológica Infantil y Juvenil",
        en: "Tech Education for Children & Teens",
      },
      description: {
        es: "Enseñanza de lógica computacional, robótica y programación mediante proyectos prácticos y didácticos.",
        en: "Taught computational thinking, robotics, and coding to children and teenagers using hands-on projects.",
      },
      bullets: {
        es: [
          "Desarrollo de habilidades de comunicación asertiva, paciencia y liderazgo",
          "Adaptación de conceptos técnicos complejos a lenguaje simple y visual"
        ],
        en: [
          "Strengthened clear communication, leadership, and empathy",
          "Adapted complex technical concepts into accessible, engaging formats"
        ],
      },
      type: "experience",
      accentColor: "orange",
    },
    {
      period: "2021 — 2023",
      role: {
        es: "Cofundador & Operaciones",
        en: "Co-Founder & Operations",
      },
      organization: {
        es: "Guazú Cerveza Artesanal",
        en: "Guazú Craft Brewery",
      },
      description: {
        es: "Emprendimiento productivo propio donde gestioné producto, canales de venta directa, logística y estrategia comercial.",
        en: "Co-founded and operated a craft beer brand, managing product development, direct sales channels, logistics, and branding.",
      },
      bullets: {
        es: [
          "Experiencia directa en finanzas, producto, ventas y resolución de problemas bajo presión",
          "Visión integral del impacto del negocio más allá del código"
        ],
        en: [
          "Hands-on experience in unit economics, operations, product management, and high-pressure problem solving",
          "Gained deep empathy for business realities and ROI"
        ],
      },
      type: "experience",
      accentColor: "yellow",
    },
  ] as TimelineItem[],
};
