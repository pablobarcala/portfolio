"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const UI_STRINGS: Record<Language, Record<string, string>> = {
  es: {
    // Nav
    "nav.home": "Inicio",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.stack": "Tech Stack",
    "nav.experience": "Trayectoria",
    "nav.contact": "Contacto",
    "nav.downloadCv": "Descargar CV",

    // Hero
    "hero.badge": "Disponible para proyectos & roles",
    "hero.cta.project": "🚀 Iniciar un Proyecto",
    "hero.cta.cv": "📄 Ver Casos & CV",
    "hero.cta.whatsapp": "💬 Charlemos por WhatsApp",

    // Services
    "services.tag": "SOLUCIONES PARA CLIENTES",
    "services.title": "Cómo puedo ayudarte a crecer",
    "services.subtitle": "Combino velocidad de desarrollo, solidez técnica y visión de negocio para entregar productos listos para generar resultados.",

    // Projects
    "projects.tag": "CASOS DE ESTUDIO & LABS",
    "projects.title": "Proyectos Destacados",
    "projects.subtitle": "Una selección de soluciones reales para clientes, plataformas SaaS con IA y experimentos de ingeniería.",
    "projects.filter.all": "Todos",
    "projects.filter.client_b2b": "Clientes & B2B",
    "projects.filter.saas_ai": "SaaS & IA",
    "projects.filter.labs": "Arquitectura & UI",
    "projects.label.problem": "El Desafío:",
    "projects.label.solution": "La Solución:",
    "projects.label.impact": "Impacto / Resultado:",
    "projects.label.stack": "Stack Técnico:",
    "projects.btn.live": "Ver en Vivo",
    "projects.btn.github": "Código Fuente",
    "projects.badge.confidential": "Proyecto de Cliente B2B",

    // Tech Stack
    "stack.tag": "ESTÁNDARES DE INGENIERÍA",
    "stack.title": "Stack Tecnológico & Calidad",
    "stack.subtitle": "Herramientas y metodologías que utilizo para construir aplicaciones escalables, mantenibles y veloces.",
    "stack.principles.title": "Mis Estándares de Desarrollo",
    "stack.principle.tdd": "Test-Driven Development (TDD) para código predecible y sin regresiones",
    "stack.principle.arch": "Arquitectura Limpia y código autodocumentado",
    "stack.principle.ai": "Integraciones de IA pragmáticas con retornos de inversión claros",
    "stack.principle.agile": "Metodología Ágil (Scrum) y comunicación transparente",

    // Timeline / Experience
    "timeline.tag": "BACKGROUND & FORMACIÓN",
    "timeline.title": "Trayectoria & Experiencia",
    "timeline.subtitle": "De la formación académica y la docencia a la cofundación de un negocio y el desarrollo de software profesional.",

    // Contact
    "contact.tag": "HABLEMOS DE TU PRÓXIMO PASO",
    "contact.title": "¿Listo para hacer realidad tu proyecto?",
    "contact.subtitle": "Ya sea que necesites construir un MVP, integrar IA en tu flujo de trabajo o sumar un desarrollador full stack a tu equipo.",
    "contact.email.copied": "¡Email copiado al portapapeles!",
    "contact.whatsapp.cta": "Enviar mensaje directo por WhatsApp",
    "contact.email.cta": "Copiar Email",
    "contact.openCvModal": "Descargar Curriculum Vitae (PDF)",

    // CV Modal
    "cvModal.title": "Descargar Curriculum Vitae",
    "cvModal.subtitle": "Selecciona el idioma del CV que deseas descargar en PDF:",
    "cvModal.es": "Versión en Español (PDF)",
    "cvModal.en": "English Version (PDF)",
    "cvModal.footer": "Actualizado regularmente • Formato profesional ATS friendly",

    // Footer
    "footer.rights": "Diseñado y desarrollado por Pablo Barcala. Construido con Next.js 15, TailwindCSS v4 y Neo-Brutalism UI.",
  },
  en: {
    // Nav
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.stack": "Tech Stack",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.downloadCv": "Download CV",

    // Hero
    "hero.badge": "Available for projects & roles",
    "hero.cta.project": "🚀 Start a Project",
    "hero.cta.cv": "📄 View Cases & CV",
    "hero.cta.whatsapp": "💬 Chat on WhatsApp",

    // Services
    "services.tag": "CLIENT SOLUTIONS",
    "services.title": "How I can help you scale",
    "services.subtitle": "Combining rapid execution, technical rigor, and product mindset to deliver solutions ready to generate real business impact.",

    // Projects
    "projects.tag": "CASE STUDIES & LABS",
    "projects.title": "Featured Projects",
    "projects.subtitle": "A selection of real-world client solutions, AI-powered SaaS platforms, and engineering experiments.",
    "projects.filter.all": "All",
    "projects.filter.client_b2b": "Client & B2B",
    "projects.filter.saas_ai": "SaaS & AI",
    "projects.filter.labs": "Architecture & UI",
    "projects.label.problem": "The Challenge:",
    "projects.label.solution": "The Solution:",
    "projects.label.impact": "Impact / Result:",
    "projects.label.stack": "Tech Stack:",
    "projects.btn.live": "Live Demo",
    "projects.btn.github": "Source Code",
    "projects.badge.confidential": "B2B Client Project",

    // Tech Stack
    "stack.tag": "ENGINEERING STANDARDS",
    "stack.title": "Tech Stack & Quality",
    "stack.subtitle": "Tools and methodologies I use to build scalable, maintainable, and fast web applications.",
    "stack.principles.title": "My Engineering Principles",
    "stack.principle.tdd": "Test-Driven Development (TDD) for predictable, regression-free code",
    "stack.principle.arch": "Clean Architecture and self-documenting codebases",
    "stack.principle.ai": "Pragmatic AI integrations focused on real ROI",
    "stack.principle.agile": "Agile Methodologies (Scrum) with clear, proactive communication",

    // Timeline / Experience
    "timeline.tag": "BACKGROUND & EDUCATION",
    "timeline.title": "Experience & Journey",
    "timeline.subtitle": "From formal engineering education and teaching to co-founding a business and building full-stack software.",

    // Contact
    "contact.tag": "LET'S TALK ABOUT YOUR NEXT STEP",
    "contact.title": "Ready to bring your project to life?",
    "contact.subtitle": "Whether you need to launch an MVP, automate workflows with AI, or hire a solid Full Stack Engineer for your team.",
    "contact.email.copied": "Email copied to clipboard!",
    "contact.whatsapp.cta": "Send direct message via WhatsApp",
    "contact.email.cta": "Copy Email",
    "contact.openCvModal": "Download Resume (PDF)",

    // CV Modal
    "cvModal.title": "Download Resume / CV",
    "cvModal.subtitle": "Select your preferred PDF language version:",
    "cvModal.es": "Spanish Version (PDF)",
    "cvModal.en": "English Version (PDF)",
    "cvModal.footer": "Regularly updated • ATS-friendly professional format",

    // Footer
    "footer.rights": "Designed & built by Pablo Barcala. Crafted with Next.js 15, TailwindCSS v4, and Neo-Brutalism UI.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  useEffect(() => {
    const stored = localStorage.getItem("pb_lang") as Language | null;
    if (stored === "es" || stored === "en") {
      setLanguageState(stored);
    } else {
      const browserLang = navigator.language.startsWith("es") ? "es" : "en";
      setLanguageState(browserLang);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("pb_lang", lang);
  };

  const toggleLanguage = () => {
    const next = language === "es" ? "en" : "es";
    setLanguage(next);
  };

  const t = (key: string): string => {
    return UI_STRINGS[language]?.[key] || UI_STRINGS["es"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
