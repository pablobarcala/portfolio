"use client"

import { image } from "framer-motion/client";
import { createContext, useContext, useState } from "react";

const translations = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre mí',
      projects: 'Proyectos',
      // contact: 'Contacto'
    },
    hero: {
      title: 'Desarrollador',
      subtitle: 'Full Stack Jr.',
      description: 'Desarrollador de software con enfoque en tecnologías web y experiencia enseñando robótica y programación. Apasionado por la resolución de problemas y el aprendizaje continuo.',
      viewProjects: 'Ver mis proyectos',
      downloadCV: 'Descargar CV'
    },
    about: {
      title: 'Sobre mí',
      subtitle: 'Pasión por la tecnología y la educación',
      description1: 'Soy un desarrollador full-stack junior especializado en tecnologías web como React, Node.js y MongoDB. Actualmente cursando Técnico en Desarrollo y Calidad de Software en UNSTA y con formación complementaria en Argentina Programa.',
      description2: 'Mi experiencia incluye tanto desarrollo de software como enseñanza de programación y robótica a niños, lo que me ha permitido desarrollar habilidades de comunicación, liderazgo y empatía. También tengo experiencia empresarial como cofundador de una cervecería artesanal.',
      stats: {
        projects: 'Proyectos desarrollados',
        experience: 'Años de experiencia'
      },
      skills: {
        frontend: 'Frontend',
        backend: 'Backend',
        design: 'Diseño',
        mobile: 'Mobile',
        devops: "DevOps",
        testing: "Testing"
      }
    },
    projects: {
      title: 'Mis Proyectos',
      subtitle: 'Proyectos destacados que demuestran mis habilidades técnicas y creatividad',
      viewProject: 'Ver proyecto',
      viewCode: 'Ver código',
      items: [
        {
          title: 'RoboTeach',
          description: 'Plataforma educativa gamificada para enseñar programación a niños con IA integrada',
          tech: ['Angular', '.NET', 'Python', 'MongoDB'],
          image: "images/roboteach.png",
          link: 'https://www.roboteach.io',
        },
        {
          title: 'NutriCheck',
          description: 'Plataforma para nutricionistas que unifica el seguimiento de pacientes y planes alimentarios',
          tech: ['Next.js', '.NET', 'MongoDB'],
          image: "images/nutricheck.png",
          link: "https://nutricheck-front.vercel.app/login", 
          github: 'https://github.com/pablobarcala/nutricheck-front'
        },
        {
          title: 'Portfolio Personal',
          description: 'Sitio web personal desarrollado con tecnologías modernas y diseño responsivo',
          tech: ['Next.js', 'TailwindCSS'],
          image: "images/portfolio.png",
          link: 'https://www.pablobarcala.com.ar',
          github: 'https://github.com/pablobarcala/portfolio'
        }
      ]
    },
    contact: {
      title: 'Trabajemos juntos',
      subtitle: '¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas y ayudarte a hacerlas realidad.',
      info: {
        email: 'pablo.d.barcala@gmail.com',
        phone: '+54 381-5465017',
        location: 'Tucumán, Argentina',
        website: 'www.pablobarcala.com.ar'
      },
      form: {
        name: 'Nombre',
        namePlaceholder: 'Tu nombre',
        email: 'Email',
        emailPlaceholder: 'tu@email.com',
        subject: 'Asunto',
        subjectPlaceholder: '¿En qué puedo ayudarte?',
        message: 'Mensaje',
        messagePlaceholder: 'Cuéntame sobre tu proyecto...',
        submit: 'Enviar mensaje',
        success: '¡Mensaje enviado! Te responderé pronto.'
      }
    },
    footer: {
      rights: '© 2025 Pablo Barcala. Todos los derechos reservados.'
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      // contact: 'Contact'
    },
    hero: {
      title: 'Full Stack',
      subtitle: 'Developer Jr.',
      description: 'Software developer focused on web technologies with experience teaching robotics and programming. Passionate about problem-solving and continuous learning.',
      viewProjects: 'View my projects',
      downloadCV: 'Download CV'
    },
    about: {
      title: 'About Me',
      subtitle: 'Passion for technology and education',
      description1: 'I am a junior full-stack developer specialized in web technologies like React, Node.js and MongoDB. Currently studying Technical Degree in Software Development and Quality at UNSTA with complementary training from Argentina Programa.',
      description2: 'My experience includes both software development and teaching programming and robotics to children, which has allowed me to develop communication, leadership and empathy skills. I also have business experience as co-founder of a craft brewery.',
      stats: {
        projects: 'Developed projects',
        experience: 'Years of experience'
      },
      skills: {
        frontend: 'Frontend',
        backend: 'Backend',
        design: 'Design',
        mobile: 'Mobile',
        devops: "DevOps",
        testing: "Testing"
      }
    },
    projects: {
      title: 'My Projects',
      subtitle: 'Featured projects that demonstrate my technical skills and creativity',
      viewProject: 'View project',
      viewCode: 'View code',
      items: [
        {
          title: 'RoboTeach',
          description: 'Gamified educational platform to teach programming to children with integrated AI',
          tech: ['Angular', '.NET', 'Python', 'MongoDB'],
          image: "images/roboteach.png",
          link: 'https://www.roboteach.io',
        },
        {
          title: 'NutriCheck',
          description: 'Platform for nutritionists that unifies patient tracking and meal plans',
          tech: ['Next.js', '.NET', 'MongoDB'],
          image: "images/nutricheck.png",
          link: "https://nutricheck-front.vercel.app/login", 
          github: 'https://github.com/pablobarcala/nutricheck-front'
        },
        {
          title: 'Personal Portfolio',
          description: 'Personal website developed with modern technologies and responsive design',
          tech: ['React', 'CSS', 'JavaScript'],
          image: "images/portfolio.png",
          link: 'https://www.pablobarcala.com.ar',
          github: 'https://github.com/pablobarcala/portfolio'
        }
      ]
    },
    contact: {
      title: 'Let\'s work together',
      subtitle: 'Do you have a project in mind? I\'d love to hear your ideas and help you make them a reality.',
      info: {
        email: 'pablo.d.barcala@gmail.com',
        phone: '+54 381-5465017',
        location: 'Tucumán, Argentina',
        website: 'www.pablobarcala.com.ar'
      },
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        subject: 'Subject',
        subjectPlaceholder: 'How can I help you?',
        message: 'Message',
        messagePlaceholder: 'Tell me about your project...',
        submit: 'Send message',
        success: 'Message sent! I\'ll respond soon.'
      }
    },
    footer: {
      rights: '© 2025 Pablo Barcala. All rights reserved.'
    }
  }
};

// Language Context
const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('es');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };
  
  const t = translations[language];
  
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};