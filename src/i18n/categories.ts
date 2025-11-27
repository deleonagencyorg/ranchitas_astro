// src/i18n/categories.ts
import { type Locale } from './i18n';

const categoryMap = {
  es: {
    'news': 'Noticias',
    'promotions': 'Promociones',
    'recipes': 'Recetas',
    'other': 'Otros',
    // Add more spanish translations here
  },
  en: {
    'news': 'News',
    'promotions': 'Promotions',
    'recipes': 'Recipes',
    'other': 'Other',
    // Add more english translations here
  },
};

/**
 * Gets the translated category name for a given category key and locale.
 * Falls back to the key itself if no translation is found.
 * @param key The category key (e.g., 'news', 'promotions').
 * @param lang The current locale ('es' or 'en').
 * @returns The translated category name.
 */
export function getCategoryName(key: string, lang: Locale): string {
  const lowerKey = (key || 'other').toLowerCase();
  return categoryMap[lang]?.[lowerKey] || key;
}
