# Guía de Internacionalización (i18n)

Este proyecto implementa un sistema personalizado de internacionalización que permite que la aplicación esté disponible en español e inglés.

## Estructura de archivos

- `/public/locales/es/common.json` - Traducciones en español
- `/public/locales/en/common.json` - Traducciones en inglés
- `/src/i18n/i18n.ts` - Sistema de internacionalización personalizado
- `/src/components/i18n/LanguageSwitcher.astro` - Componente para cambiar entre idiomas

## Cómo usar las traducciones

### En componentes Astro

```astro
---
import { t } from '../i18n/i18n';
---

<h1>{t('welcome')}</h1>
<p>{t('form_validation.required')}</p>
```

### En componentes React

```tsx
import React, { useState, useEffect } from 'react';
import { t, getLocale } from '../i18n/i18n';
import type { Locale } from '../i18n/i18n';

const MyComponent = () => {
  const [language, setLanguage] = useState<Locale>(getLocale());
  
  // Actualizar cuando cambie el idioma
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(getLocale());
    };
    
    window.addEventListener('storage', handleLanguageChange);
    return () => {
      window.removeEventListener('storage', handleLanguageChange);
    };
  }, []);
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('form_validation.required')}</p>
    </div>
  );
};
```

## Cambiar entre idiomas

Puedes usar el componente `LanguageSwitcher.astro` para permitir a los usuarios cambiar entre idiomas:

```astro
---
import LanguageSwitcher from '../components/i18n/LanguageSwitcher.astro';
---

<header>
  <nav>
    <!-- Otros elementos de navegación -->
    <LanguageSwitcher />
  </nav>
</header>
```

## Añadir nuevas traducciones

1. Añade la nueva clave y valor en `/public/locales/es/common.json`
2. Añade la misma clave con su traducción en `/public/locales/en/common.json`
3. Usa la clave en tus componentes con `t('mi_nueva_clave')`

### Traducciones anidadas

Puedes usar notación de puntos para acceder a traducciones anidadas:

```json
// common.json
{
  "form": {
    "submit": "Enviar",
    "cancel": "Cancelar"
  }
}
```

```astro
<button>{t('form.submit')}</button>
<button>{t('form.cancel')}</button>
```

## Añadir un nuevo idioma

1. Crea un nuevo archivo de traducciones en `/public/locales/[codigo_idioma]/common.json`
2. Actualiza el tipo `Locale` en `/src/i18n/i18n.ts` para incluir el nuevo código de idioma
3. Añade el nuevo idioma a la estructura de traducciones en el mismo archivo

## API del sistema de i18n

- `t(key: string, options?: object)`: Obtiene una traducción
- `setLocale(locale: 'es' | 'en')`: Cambia el idioma actual
- `getLocale()`: Obtiene el idioma actual

## Ejemplos

Revisa los componentes de ejemplo para ver cómo implementar i18n en tu código:

- `/src/components/i18n/TranslationExample.astro` - Ejemplo en Astro
- `/src/components/i18n/ReactTranslationExample.tsx` - Ejemplo en React
