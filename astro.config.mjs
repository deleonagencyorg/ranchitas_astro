import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'url';

export default defineConfig({
  site: 'https://www.ranchitas.com',
  trailingSlash: 'always',
  integrations: [
    react(),
    tailwind({
      // Configuración explícita de Tailwind
      config: { path: './tailwind.config.js' },
      // Asegurarse de que Tailwind se aplique a todos los archivos
      applyBaseStyles: true,
    }),
    sitemap({
      filter: (page) => {
        if (/\/(api|yummiesone|ganadores)\//.test(page)) return false;
        if (/\/es\/recipes\/|\/en\/recetas\//.test(page)) return false;
        if (page === 'https://www.ranchitas.com/' || page === 'https://www.ranchitas.com') return false;
        return true;
      },
    }),
  ],
  vite: {
    // Ensure JSON imports work in SSR mode
    ssr: {
      noExternal: ['@astrojs/*'],
    },
    json: {
      stringify: false,
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  },
});