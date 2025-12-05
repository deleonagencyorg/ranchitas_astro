import geoip from 'geoip-lite';
import { setLocale, getLocale, type Locale } from '../i18n/i18n';

// Listas compartidas de países
export const ENGLISH_SPEAKING_COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'JM', 'BZ', 'BS', 
  'BB', 'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'TT', 'GY'
] as const;

export const SPANISH_SPEAKING_COUNTRIES = [
  'HN', 'ES', 'MX', 'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 
  'EC', 'SV', 'GT', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'
] as const;

/**
 * Detecta el país del usuario basado en su dirección IP
 */
export function detectCountry(ip: string): string | null {
  try {
    const geo = geoip.lookup(ip);
    return geo?.country || null;
  } catch (error) {
    console.error('Error detecting country:', error);
    return null;
  }
}

/**
 * Determina el idioma predeterminado basado en código de país
 */
export function getDefaultLocaleByCountry(countryCode: string | null): Locale {
  if (!countryCode) return 'es';
  
  if (ENGLISH_SPEAKING_COUNTRIES.includes(countryCode)) {
    return 'en';
  }
  
  if (SPANISH_SPEAKING_COUNTRIES.includes(countryCode)) {
    return 'es';
  }
  
  return 'es';
}

/**
 * Maneja toda la lógica de detección de locale (IP + headers + fallbacks)
 */
export function detectLocale(request: Request): {locale: Locale; ip: string; country: string | null} {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : 
            request.headers.get('cf-connecting-ip') || '127.0.0.1';
  
  const countryCode = detectCountry(ip);
  const locale = getDefaultLocaleByCountry(countryCode);
  
  return {locale, ip, country: countryCode};
}

/**
 * Establece el idioma predeterminado basado en la IP del usuario
 * @param ip Dirección IP del usuario
 * @returns El idioma establecido
 */
export function setLocaleByIp(ip: string): Locale {
  // Si ya hay un idioma establecido en localStorage, respetarlo
  const currentLocale = getLocale();
  if (currentLocale) return currentLocale;
  
  const { locale } = detectLocale({ headers: { get: () => ip } } as unknown as Request);
  
  setLocale(locale);
  return locale;
}
