"use client"

import { useState } from 'react';
import { EyeOff } from 'lucide-react';

// Función mejorada para validar y construir URL de screenshot
const getScreenshotUrl = (url: any) => {
  // Validaciones más estrictas
  if (!url || 
      url === '#' || 
      url === '' || 
      url === null || 
      url === undefined ||
      typeof url !== 'string') {
    return null;
  }
  
  // Asegurar que la URL tenga protocolo
  let validUrl = url.trim();
  if (!validUrl.startsWith('http://') && !validUrl.startsWith('https://')) {
    validUrl = 'https://' + validUrl;
  }
  
  // Validar formato básico de URL
  try {
    new URL(validUrl);
  } catch (e) {
    console.warn('URL inválida:', url);
    return null;
  }
  
  // Construir URL del screenshot con parámetros más conservadores
  const params = new URLSearchParams({
    url: validUrl,
    'viewport.width': '1200',
    'viewport.height': '800',
    type: 'jpeg', // JPEG es más compatible que PNG
    quality: '80', // Reducir calidad para mejor performance
    waitFor: '1000' // Reducir tiempo de espera
  });
  
  return `https://api.microlink.io/screenshot?${params.toString()}`;
};

const ProjectImage = ({ project, className = '' }: {project: any, className: any}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  
  const screenshotUrl = getScreenshotUrl(project.link || project.url);
  const fallbackImage = project.image;
  
  // Debug: mostrar la URL que se está intentando usar
  console.log('Project:', project.title, 'URL:', project.link || project.url, 'Screenshot URL:', screenshotUrl);
  
  const handleImageError = () => {
    console.warn('Error cargando screenshot para:', project.title);
    
    // Intentar una vez más antes de dar up
    if (retryCount < 1) {
      setRetryCount(prev => prev + 1);
      setImageLoaded(false);
      // Forzar recarga después de un delay
      setTimeout(() => {
        const img = document.querySelector(`img[alt="${project.title}"]`) as HTMLImageElement | null;
        if (img && screenshotUrl) {
          img.src = screenshotUrl + '&retry=' + Date.now();
        }
      }, 1000);
    } else {
      setImageError(true);
      setImageLoaded(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {screenshotUrl && !imageError ? (
        <>
          {/* Loading state */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-slate-700 flex items-center justify-center z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                <span className="text-gray-400 text-xs">Generando preview...</span>
                {retryCount > 0 && (
                  <span className="text-gray-500 text-xs">Reintentando...</span>
                )}
              </div>
            </div>
          )}
          
          {/* Screenshot automático */}
          <img 
            src={screenshotUrl}
            alt={project.title}
            className={`w-full h-48 object-cover object-top group-hover:scale-110 transition-all duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => {
              setImageLoaded(true);
              console.log('Screenshot cargado exitosamente para:', project.title);
            }}
            onError={handleImageError}
            loading="lazy"
          />
        </>
      ) : (
        // Fallback: imagen estática o placeholder
        fallbackImage ? (
          <img 
            src={fallbackImage}
            alt={project.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
            onLoad={() => setImageLoaded(true)}
          />
        ) : (
          // Placeholder cuando no hay imagen ni URL válida
          <div className="w-full h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
            <div className="text-center">
              <EyeOff className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <span className="text-gray-500 text-sm">Preview no disponible</span>
              {project.link && (
                <p className="text-gray-600 text-xs mt-1">URL: {project.link}</p>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProjectImage;