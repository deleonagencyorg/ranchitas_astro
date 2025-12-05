// Cliente-side geo service para detección de país
// Basado en geoService.ts pero adaptado para funcionar en el navegador

// Listas de países compartidas con geoService
export const ENGLISH_SPEAKING_COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'NZ', 'IE', 'ZA', 'JM', 'BZ', 'BS', 
  'BB', 'AG', 'DM', 'GD', 'KN', 'LC', 'VC', 'TT', 'GY'
] as const;

export const SPANISH_SPEAKING_COUNTRIES = [
  'HN', 'ES', 'MX', 'AR', 'BO', 'CL', 'CO', 'CR', 'CU', 'DO', 
  'EC', 'SV', 'GT', 'NI', 'PA', 'PY', 'PE', 'PR', 'UY', 'VE'
] as const;

// Mapeo de códigos de país a nombres completos
export const COUNTRY_CODE_TO_NAME: Record<string, string> = {
  'HN': 'Honduras',
  'GT': 'Guatemala',
  'SV': 'El Salvador',
  'NI': 'Nicaragua',
  'CR': 'Costa Rica',
  'DO': 'República Dominicana',
  'US': 'United States',
  'MX': 'México',
  'ES': 'España'
};

export interface GeoDetectionResult {
  country: string | null;
  countryCode: string | null;
  source: 'ipapi' | 'country-is' | 'cloudflare' | 'fallback';
  success: boolean;
}

/**
 * Detecta el país del usuario usando múltiples APIs externas
 */
export async function detectUserCountry(): Promise<GeoDetectionResult> {
  console.log('🌍 Iniciando detección de país del lado del cliente...');
  
  // Intentar con ipapi.co primero
  try {
    console.log('🔍 Intentando con ipapi.co...');
    const response = await fetch('https://ipapi.co/json/', {
      timeout: 5000
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ ipapi.co response:', data);
      
      if (data.country_code && data.country_name) {
        return {
          country: data.country_name,
          countryCode: data.country_code,
          source: 'ipapi',
          success: true
        };
      }
    }
  } catch (error) {
    console.log('❌ ipapi.co falló:', error);
  }

  // Intentar con api.country.is
  try {
    console.log('🔍 Intentando con api.country.is...');
    const response = await fetch('https://api.country.is/', {
      timeout: 5000
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ api.country.is response:', data);
      
      if (data.country) {
        const countryName = COUNTRY_CODE_TO_NAME[data.country] || data.country;
        return {
          country: countryName,
          countryCode: data.country,
          source: 'country-is',
          success: true
        };
      }
    }
  } catch (error) {
    console.log('❌ api.country.is falló:', error);
  }

  // Intentar con Cloudflare headers (si están disponibles)
  try {
    console.log('🔍 Intentando con headers de Cloudflare...');
    const response = await fetch('/api/geo-headers');
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Cloudflare headers response:', data);
      
      if (data.country) {
        const countryName = COUNTRY_CODE_TO_NAME[data.country] || data.country;
        return {
          country: countryName,
          countryCode: data.country,
          source: 'cloudflare',
          success: true
        };
      }
    }
  } catch (error) {
    console.log('❌ Cloudflare headers falló:', error);
  }

  console.log('❌ Todas las APIs de detección fallaron');
  return {
    country: null,
    countryCode: null,
    source: 'fallback',
    success: false
  };
}

/**
 * Determina si un país es de habla hispana
 */
export function isSpanishSpeakingCountry(countryCode: string | null): boolean {
  if (!countryCode) return true; // Default a español
  return SPANISH_SPEAKING_COUNTRIES.includes(countryCode as any);
}

/**
 * Determina si un país es de habla inglesa
 */
export function isEnglishSpeakingCountry(countryCode: string | null): boolean {
  if (!countryCode) return false;
  return ENGLISH_SPEAKING_COUNTRIES.includes(countryCode as any);
}

/**
 * Obtiene el idioma predeterminado basado en el país detectado
 */
export function getDefaultLocaleByCountry(countryCode: string | null): 'es' | 'en' {
  if (isEnglishSpeakingCountry(countryCode)) {
    return 'en';
  }
  return 'es'; // Default a español para Centroamérica
}

/**
 * Función de conveniencia para detectar país y obtener información completa
 */
export async function detectCountryWithLocale(): Promise<GeoDetectionResult & { locale: 'es' | 'en' }> {
  const result = await detectUserCountry();
  const locale = getDefaultLocaleByCountry(result.countryCode);
  
  return {
    ...result,
    locale
  };
}
