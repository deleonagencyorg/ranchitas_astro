import { expect, test } from '@playwright/test';
import { GTM_FALLBACK_ID, resolveGtmId } from '../src/config/gtm';

test('resuelve un ID real aunque la variable sea un placeholder', () => {
  expect(resolveGtmId('GTM-XXXXXXX')).toBe(GTM_FALLBACK_ID);
  expect(resolveGtmId('')).toBe(GTM_FALLBACK_ID);
  expect(resolveGtmId('GTM-EXAMPLE-ID')).toBe(GTM_FALLBACK_ID);
  expect(resolveGtmId('GTM-ABC123')).toBe('GTM-ABC123');
});

test('Google Tag Manager se dispara en la carga y sigue activo al navegar', async ({ page }) => {
  const gtmRequests: string[] = [];
  const pageErrors: string[] = [];

  page.on('request', (request) => {
    const url = request.url();
    if (url.includes('googletagmanager.com/gtm.js')) {
      gtmRequests.push(url);
    }
  });
  page.on('pageerror', (error) => {
    pageErrors.push(error.message);
  });

  await page.goto('/es/', { waitUntil: 'domcontentloaded' });

  await expect.poll(() => gtmRequests.length).toBeGreaterThan(0);
  expect(gtmRequests[0]).toContain(`id=${GTM_FALLBACK_ID}`);
  expect(gtmRequests.some((url) => url.includes('GTM-XXXXXXX'))).toBe(false);

  const initial = await page.evaluate(() => {
    const layer = window.dataLayer ?? [];
    return {
      hasScript: Boolean(document.querySelector('script[src*="googletagmanager.com/gtm.js"]')),
      events: layer.map((entry) => entry?.event).filter((event): event is string => Boolean(event)),
    };
  });

  expect(initial.hasScript).toBe(true);
  expect(initial.events).toContain('gtm.js');

  const requestsBeforeNav = gtmRequests.length;
  await page.locator('#desktop-menu-items a[href="/es/contacto"]').click();
  await page.waitForURL('**/es/contacto**');

  await expect.poll(async () => {
    const tracked = await page.evaluate(() => {
      const layer = window.dataLayer ?? [];
      return layer.some(
        (entry) => entry?.event === 'page_view' && String(entry.page_path ?? '').includes('/es/contacto'),
      );
    });
    return tracked || gtmRequests.length > requestsBeforeNav;
  }).toBe(true);

  await expect.poll(async () => {
    return page.evaluate(() => Boolean(document.querySelector('script[src*="googletagmanager.com/gtm.js"]') || window.google_tag_manager));
  }).toBe(true);

  expect(pageErrors.join('\n')).not.toMatch(/parentNode|GTM no inicializado/i);
});
