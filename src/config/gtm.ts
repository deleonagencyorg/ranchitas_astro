/** Contenedor público que ya está en ranchitas.com. */
export const GTM_FALLBACK_ID = 'GTM-P3S5R7XT';

const INVALID_IDS = new Set(['GTM-XXXXXX', 'GTM-XXXXXXX', 'GTM-EXAMPLE-ID']);

/**
 * Devuelve un ID de GTM usable.
 * Si la variable falta o es un placeholder, usa el contenedor real
 * para que el snippet no se quede sin cargar.
 */
export function resolveGtmId(raw: string | undefined | null): string {
  const value = (raw ?? '').trim();
  if (/^GTM-[A-Z0-9]+$/.test(value) && !INVALID_IDS.has(value)) {
    return value;
  }
  return GTM_FALLBACK_ID;
}
