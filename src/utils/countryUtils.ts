// src/utils/countryUtils.ts

const countryData: Record<string, { name: string; flag: string }> = {
  guatemala: { name: 'Guatemala', flag: '🇬🇹' },
  el_salvador: { name: 'El Salvador', flag: '🇸🇻' },
  honduras: { name: 'Honduras', flag: '🇭🇳' },
  nicaragua: { name: 'Nicaragua', flag: '🇳🇮' },
  costa_rica: { name: 'Costa Rica', flag: '🇨🇷' },
  republica_dominicana: { name: 'República Dominicana', flag: '🇩🇴' },
  // Agrega más países si es necesario
};

/**
 * Obtiene el nombre capitalizado y el emoji de la bandera para un país.
 * @param countryCode - El código del país (ej. 'guatemala').
 * @returns Un objeto con el nombre y la bandera, o valores por defecto si no se encuentra.
 */
export function getCountryInfo(countryCode: string | null | undefined): { name: string; flag: string } {
  if (!countryCode) {
    return { name: 'Desconocido', flag: '🌎' };
  }

  const lowerCaseCode = countryCode.toLowerCase().replace(/ /g, '_');
  const info = countryData[lowerCaseCode];

  if (info) {
    return info;
  }

  // Fallback si el país no está en el mapa
  const capitalized = countryCode.charAt(0).toUpperCase() + countryCode.slice(1).replace(/_/g, ' ');
  return { name: capitalized, flag: '🌎' };
}
