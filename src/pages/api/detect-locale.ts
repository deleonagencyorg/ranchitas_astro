import type { APIRoute } from 'astro';
import { detectLocale } from '../../services/geoService';

export const GET: APIRoute = async ({ request }) => {
  try {
    const { locale, ip, country } = detectLocale(request);
    
    return new Response(JSON.stringify({
      ip,
      country,
      defaultLocale: locale
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error detecting locale:', error);
    return new Response(JSON.stringify({
      error: 'Error detecting locale',
      defaultLocale: 'es'
    }), { status: 500 });
  }
};
