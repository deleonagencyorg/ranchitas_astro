import { defineConfig, devices } from '@playwright/test';

const PORT = 4321;
const baseURL = `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  expect: { timeout: 20_000 },
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL,
    ...devices['Desktop Chrome'],
    viewport: { width: 1440, height: 900 },
  },
  webServer: {
    command: `pnpm exec astro dev --host 127.0.0.1 --port ${PORT}`,
    url: `${baseURL}/es/`,
    reuseExistingServer: false,
    timeout: 180_000,
    env: {
      ...process.env,
      // Placeholder a propósito: el sitio debe caer al contenedor real.
      PUBLIC_GTM_ID: 'GTM-XXXXXXX',
    },
  },
});
