import { useLanguage } from '@/contexts/LanguageContext'
import { Globe } from 'lucide-react';

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();
  
  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 p-2 bg-slate-800/50 hover:bg-slate-700 rounded-lg transition-all duration-200 hover:scale-105"
      title={language === 'es' ? 'Cambiar a inglés' : 'Switch to Spanish'}
    >
      <Globe size={18} />
      <span className="text-sm font-medium">{language.toUpperCase()}</span>
    </button>
  );
};