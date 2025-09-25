"use client"

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Smartphone, Globe, TestTube, TestTube2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import ProjectImage from '@/components/ProjectImage';
import HiComponent from '@/components/HiComponent';
import SideNav from '@/components/SideNav';
import HomeBtns from '@/components/HomeBtns';
import ChatPanel, { ChatMessage } from '@/components/ChatPanel';
import { callAiOnce } from '@/utils/ui-payload';
import { fixEducationTimeline } from '@/utils/fixers';

type Topic = "me" | "projects" | "stack" | "experience" | "education";

export default function Home() {
  // const { t, language } = useLanguage();
  const [chatOpen, setChatOpen] = useState(false)
  const [topic, setTopic] = useState<Topic | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [thinking, setThinking] = useState(false)
  const chatRef = useRef<{ focusInput: () => void } | null>(null) 

  // const skills = [
  //   { 
  //     name: t.about.skills.frontend, 
  //     icon: Code, 
  //     color: 'from-blue-500 to-cyan-500', 
  //     items: ['React / Next.js', 'Angular', 'JavaScript / TypeScript', 'TailwindCSS'] 
  //   },
  //   { 
  //     name: t.about.skills.backend, 
  //     icon: Database, 
  //     color: 'from-green-500 to-emerald-500', 
  //     items: ['Express.js', 'Node.js', 'C# (.NET)', 'MySQL', 'MongoDB'] 
  //   },
  //   {
  //     name: t.about.skills.testing,
  //     icon: TestTube2,
  //     color: 'from-yellow-500 to-amber-500',
  //     items: ['Postman', 'Cypress', 'Katalon', 'Mocha', 'Chai']
  //   },
  //   {
  //     name: t.about.skills.devops,
  //     icon: Globe,
  //     color: 'from-gray-500 to-gray-700',
  //     items: ['Docker', 'Git', 'CI/CD', 'AWS']
  //   },
  //   { 
  //     name: t.about.skills.design, 
  //     icon: Palette, 
  //     color: 'from-purple-500 to-pink-500', 
  //     items: ['UI/UX', 'Figma', 'Canva'] 
  //   },
  //   { 
  //     name: t.about.skills.mobile, 
  //     icon: Smartphone, 
  //     color: 'from-orange-500 to-red-500', 
  //     items: ['React Native'] 
  //   },
  // ];

  // const navItems = [
  //   { key: 'home', label: t.nav.home, href: '#inicio' },
  //   { key: 'about', label: t.nav.about, href: '#sobre-mi' },
  //   { key: 'projects', label: t.nav.projects, href: '#proyectos' },
  //   { key: 'contact', label: t.nav.contact, href: '#contacto' }
  // ];

  // const downloadCV = () => {
  //   const cvFiles = {
  //     es: 'cv/Pablo_Barcala_CV_ES.pdf',
  //     en: '/cv/Pablo_Barcala_CV_EN.pdf'
  //   };
    
  //   const cvUrl = cvFiles[language as keyof typeof cvFiles] || cvFiles.es;
  //   const fileName = language === 'en' ? 'Pablo_Barcala_CV_EN.pdf' : 'Pablo_Barcala_CV_ES.pdf';
    
  //   // Crear un enlace temporal para la descarga
  //   const link = document.createElement('a');
  //   link.href = cvUrl;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };

  // Lógica inicial al seleccionar un botón/tema
  // Cuando seleccionás un topic
  // al seleccionar un topic
  const handleSelectTopic = async (t: Topic) => {
    setTopic(t);
    setChatOpen(true);

    const userPrompt = topicToPrompt(t);
    const uMsg = { id: crypto.randomUUID(), role: "user" as const, content: userPrompt };
    setMessages(prev => [...prev, uMsg]);

    const aId = crypto.randomUUID();
    setThinking(true);

    try {
      const { text: aiText, ui } = await callAiOnce(userPrompt);
      const cleaned = ui?.type === "timeline" ? fixEducationTimeline(ui) : ui;
      const aId = crypto.randomUUID();
      setMessages(prev => [
        ...prev,
        { id: aId, role: "assistant" as const, content: JSON.stringify({ text: aiText, ui: cleaned }) }
      ]);
    } catch {
      setMessages(prev => prev.map(m => m.id === aId ? { ...m, content: "Hubo un error al responder." } : m));
    } finally {
      setThinking(false);
    }
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const uMsg = { id: crypto.randomUUID(), role: "user" as const, content: text };
    setMessages(prev => [...prev, uMsg]);

    setThinking(true);

    try {
      const { text: aiText, ui } = await callAiOnce(text);
      const cleaned = ui?.type === "timeline" ? fixEducationTimeline(ui) : ui;
      // Guardamos todo en content como JSON para que el renderer lo entienda
      const aId = crypto.randomUUID();
      setMessages(prev => [
        ...prev,
        { id: aId, role: "assistant" as const, content: JSON.stringify({ text: aiText, ui: cleaned }) }
      ]);
    } catch {
      const aId = crypto.randomUUID();
      setMessages(prev => [...prev, { id: aId, role: "assistant" as const, content: "Oops, algo falló. Intenta de nuevo." }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="relative min-h-screen">
      <SideNav onHomeClick={() => (
            setChatOpen(false), setTopic(null)
          )} />

      {/* Contenedor central */}
      <div className="md:pl-24 pl-0">
        
        {/* Imagen y saludo */}
        <motion.div
          initial={false}
          animate={chatOpen ? { y: -10, scale: 0.8 } : { y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="sticky top-0 z-30"
        >
          <HiComponent compact={chatOpen} onHomeClick={() => (
            setChatOpen(false), setTopic(null)
          )} />
        </motion.div>

        {/* Contenido principal */}
        <div className="max-w-4xl mx-auto px-4">
          <AnimatePresence mode="popLayout">
            {!chatOpen ? (
              <motion.div
                key="home-cta"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="py-6"
              >
                <HomeBtns onSelectTopic={handleSelectTopic} dock="center" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-area"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid grid-rows-[1fr_auto_auto] gap-3 md:gap-4 h-[calc(100vh-240px)] md:h-[calc(100vh-220px)] pb-16 md:pb-4"
              >
                {/* Panel del chat (scroll interno) */}
                <ChatPanel
                  ref={chatRef as any}
                  messages={messages}
                  onSend={handleSend}
                  header={topicToHeader(topic)}
                  thinking={thinking}
                />

                {/* Botones se reubican ABAJO del input */}
                <HomeBtns onSelectTopic={handleSelectTopic} dock="bottom" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

function topicToPrompt(t: Topic) {
  switch (t) {
    case "me":
      return "Who are you? What do you do?"
    case "stack":
      return "What tech stack do you use and prefer?"
    case "projects":
      return "Share a few favorite projects and why they matter."
    case "experience":
      return "Summarize your work experience and top achievements."
    case "education":
      return "List your education and relevant certifications."
    default:
      return "Tell me about yourself."
  }
}

function topicToHeader(t: Topic | null) {
  switch (t) {
    case "me": return "Ask about Pablo"
    case "stack": return "Tech & Code"
    case "projects": return "Projects"
    case "experience": return "Experience"
    case "education": return "Education"
    default: return "Chat"
  }
}