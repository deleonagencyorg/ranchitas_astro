import i18next from './config';
import { useEffect, useState } from 'react';

/**
 * Hook para usar traducciones en componentes React
 * @param namespace Espacio de nombres opcional (por defecto 'common')
 * @returns Objeto con función t para traducir y lenguaje actual
 */
export const useTranslation = (namespace = 'common') => {
  const [language, setLanguage] = useState(i18next.language);

  useEffect(() => {
    // Asegurarse de que el espacio de nombres esté cargado
    if (!i18next.hasResourceBundle(language, namespace)) {
      i18next.loadNamespaces(namespace);
    }

    // Actualizar el lenguaje cuando cambie
    const handleLanguageChanged = () => {
      setLanguage(i18next.language);
    };

    i18next.on('languageChanged', handleLanguageChanged);

    return () => {
      i18next.off('languageChanged', handleLanguageChanged);
    };
  }, [namespace]);

  return {
    t: (key: string, options?: any) => i18next.t(key, { ns: namespace, ...options }),
    language,
    i18n: i18next
  };
};

/**
 * Función para traducir textos en componentes Astro
 * @param key Clave de traducción
 * @param options Opciones adicionales
 * @returns Texto traducido
 */
export const t = (key: string, options?: any) => {
  return i18next.t(key, options);
};

/**
 * Función para cambiar el idioma
 * @param lng Código de idioma ('es' o 'en')
 */
export const changeLanguage = (lng: string) => {
  return i18next.changeLanguage(lng);
};

/**
 * Obtener el idioma actual
 * @returns Código de idioma actual
 */
export const getCurrentLanguage = () => {
  return i18next.language;
};
