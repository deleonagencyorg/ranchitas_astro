// src/i18n/badges.ts

export function getNewBadge(lang: string) {
  return {
    src: lang === 'es'
      ? 'https://snack.yummiespromociones.com/SnacksyummiesAssets/NUEVO.webp'
      : 'https://snack.yummiespromociones.com/SnacksyummiesAssets/NEW.webp',
    alt: lang === 'es' ? 'Nuevo' : 'New',
  };
}