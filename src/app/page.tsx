"use client"

import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail, ExternalLink, Code, Palette, Database, Smartphone, Globe, TestTube, TestTube2, CheckCircle, AlertCircle, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageToggle } from '@/components/LanguageToggle';
import ProjectImage from '@/components/ProjectImage';

export default function Home() {
  const { t, language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const skills = [
    { 
      name: t.about.skills.frontend, 
      icon: Code, 
      color: 'from-blue-500 to-cyan-500', 
      items: ['React / Next.js', 'Angular', 'JavaScript / TypeScript', 'TailwindCSS'] 
    },
    { 
      name: t.about.skills.backend, 
      icon: Database, 
      color: 'from-green-500 to-emerald-500', 
      items: ['Express.js', 'Node.js', 'C# (.NET)', 'MySQL', 'MongoDB'] 
    },
    {
      name: t.about.skills.testing,
      icon: TestTube2,
      color: 'from-yellow-500 to-amber-500',
      items: ['Postman', 'Cypress', 'Katalon', 'Mocha', 'Chai']
    },
    {
      name: t.about.skills.devops,
      icon: Globe,
      color: 'from-gray-500 to-gray-700',
      items: ['Docker', 'Git', 'CI/CD', 'AWS']
    },
    { 
      name: t.about.skills.design, 
      icon: Palette, 
      color: 'from-purple-500 to-pink-500', 
      items: ['UI/UX', 'Figma', 'Canva'] 
    },
    { 
      name: t.about.skills.mobile, 
      icon: Smartphone, 
      color: 'from-orange-500 to-red-500', 
      items: ['React Native'] 
    },
  ];

  const navItems = [
    { key: 'home', label: t.nav.home, href: '#inicio' },
    { key: 'about', label: t.nav.about, href: '#sobre-mi' },
    { key: 'projects', label: t.nav.projects, href: '#proyectos' },
    { key: 'contact', label: t.nav.contact, href: '#contacto' }
  ];

  const contactItems = [
    { 
      key: 'github', 
      label: "GitHub", 
      href: 'https://github.com/pablobarcala',
      icon: <Github size={24} />
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      href: 'https://www.linkedin.com/in/pablo-dami%C3%A1n-barcala-60a1a923a/',
      icon: <Linkedin size={24} />
    },
    {
      key: "email",
      label: "Email",
      href: 'mailto:pablo.d.barcala@gmail.com',
      icon: <Mail size={24} />
    }
  ]

  const downloadCV = () => {
    const cvFiles = {
      es: 'cv/Pablo_Barcala_CV_ES.pdf',
      en: '/cv/Pablo_Barcala_CV_EN.pdf'
    };
    
    const cvUrl = cvFiles[language as keyof typeof cvFiles] || cvFiles.es;
    const fileName = language === 'en' ? 'Pablo_Barcala_CV_EN.pdf' : 'Pablo_Barcala_CV_ES.pdf';
    
    // Crear un enlace temporal para la descarga
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validación básica
      if (!formData.name || !formData.email || !formData.message) {
        throw new Error(language === 'es' ? 'Por favor completa todos los campos requeridos' : 'Please fill in all required fields');
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error(language === 'es' ? 'Por favor ingresa un email válido' : 'Please enter a valid email address');
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: language
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || (language === 'es' ? 'Error al enviar el mensaje' : 'Error sending message'));
      }

      setSubmitStatus('success');
      setSubmitMessage(language === 'es' ? '¡Mensaje enviado con éxito! Te responderé pronto.' : 'Message sent successfully! I\'ll get back to you soon.');
      
      // Limpiar el formulario
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : (language === 'es' ? 'Error desconocido' : 'Unknown error'));
    } finally {
      setIsSubmitting(false);
      
      // Limpiar el mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle');
        setSubmitMessage('');
      }, 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Pablo Barcala
            </div>
            
            <div className="flex items-center gap-6">
              <div className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                  <a 
                    key={item.key} 
                    href={item.href}
                    className="hover:text-blue-400 transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
              
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* <img src="https://api.microlink.io/screenshot?url=https://www.feeadvisor.io&viewport.width=1200&viewport.height=800&type=png&quality=90&waitFor=2000" alt="" /> */}

      {/* Hero Section */}
      <section id="inicio" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            {/* <img 
              src="images/retrato1.jpeg" 
              alt="Imagen personal" 
              className='w-32 h-32 rounded-full mx-auto mb-8 object-fill shadow-lg transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl' 
            /> */}
            <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-8 flex items-center justify-center text-4xl font-bold shadow-lg transition-transform duration-300 transform hover:scale-110 hover:shadow-2xl">
              PB
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {t.hero.title}
            </span>
            <br />
            <span className="text-white">{t.hero.subtitle}</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
              {t.hero.viewProjects}
            </button>
            <button onClick={downloadCV} className="border-2 border-gray-400 hover:border-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:bg-white hover:text-gray-900">
              {t.hero.downloadCV}
            </button>
          </div>
          
          <div className="flex justify-center space-x-6">
            {contactItems.map((item, index) => (
              <a key={index} href={item.href} title={item.label} target='_blank' className="p-3 bg-slate-800/50 hover:bg-slate-700 rounded-full transition-all duration-200 hover:scale-110">
                {item.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown size={32} className="text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.about.title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-blue-400">{t.about.subtitle}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.about.description1}
              </p>
              <p className="text-gray-300 mb-6 leading-relaxed">
                {t.about.description2}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">3+</div>
                  <div className="text-gray-400">{t.about.stats.projects}</div>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">1+</div>
                  <div className="text-gray-400">{t.about.stats.experience}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={index} className="bg-slate-700/30 backdrop-blur-sm p-6 rounded-xl hover:bg-slate-700/50 transition-all duration-300 group">
                    <div className={`w-12 h-12 bg-gradient-to-r ${skill.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <h4 className="font-bold mb-2 text-white">{skill.name}</h4>
                    <div className="space-y-1">
                      {skill.items.map((item, i) => (
                        <div key={i} className="text-sm text-gray-400">{item}</div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.projects.title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.projects.items.map((project: any, index: any) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <ProjectImage project={project} className={''} />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <div className="flex gap-2">
                      {/* Botón para ver proyecto */}
                      {(project.link || project.url) && (
                        <a
                          href={project.link || project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <ExternalLink size={16} />
                          {t.projects.viewProject}
                        </a>
                      )}
                      
                      {/* Botón para código (opcional) */}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                        >
                          <Github size={16} />
                          Código
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech: any, i: any) => (
                      <span key={i} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* <div className="text-center mt-12">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 px-8 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105">
              {t.projects.viewAll}
            </button>
          </div> */}
        </div>
      </section>

      {/* Contact Section */}
      {/* <section id="contacto" className="py-20 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.contact.title}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div> */}
          
          {/* <div className="max-w-2xl mx-auto">
            <div className="bg-slate-700/30 backdrop-blur-sm p-8 rounded-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.form.name}
                    </label>
                    <input 
                      onChange={handleInputChange}
                      type="text" 
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder={t.contact.form.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {t.contact.form.email}
                    </label>
                    <input 
                      onChange={handleInputChange}
                      type="email" 
                      className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                      placeholder={t.contact.form.emailPlaceholder}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.subject}
                  </label>
                  <input 
                    onChange={handleInputChange}
                    type="text" 
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                    placeholder={t.contact.form.subjectPlaceholder}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    {t.contact.form.message}
                  </label>
                  <textarea 
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 text-white resize-none"
                    placeholder={t.contact.form.messagePlaceholder}
                  ></textarea>
                </div>

                {submitStatus !== 'idle' && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/20 text-red-400 border border-red-500/30'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <span>{submitMessage}</span>
                  </div>
                )}
                
                <button 
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full px-8 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2 ${
                    isSubmitting
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {language === 'es' ? 'Enviando...' : 'Sending...'}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t.contact.form.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div> */}
        {/* </div>
      </section> */}

      {/* Footer */}
      <footer className="py-12 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              {t.footer.rights}
            </div>
            <div className="flex space-x-6">
              {contactItems.map((item, index) => (
                <a key={index} href={item.href} className="text-gray-400 hover:text-white transition-colors duration-200">
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};