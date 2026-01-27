import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import { fileURLToPath } from 'url';

export default defineConfig({
  integrations: [
    react(),
    tailwind({
      // Configuración explícita de Tailwind
      config: { path: './tailwind.config.js' },
      // Asegurarse de que Tailwind se aplique a todos los archivos
      applyBaseStyles: true,
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