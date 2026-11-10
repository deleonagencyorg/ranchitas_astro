export const SITE_ORIGIN = 'https://www.ranchitas.com';

export function ensureTrailingSlash(pathname: string): string {
  if (!pathname || pathname === '/') return '/';
  const withLeading = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const [pathOnly, query] = withLeading.split('?');
  const slashed = pathOnly.endsWith('/') ? pathOnly : `${pathOnly}/`;
  return query ? `${slashed}?${query}` : slashed;
}

export function absoluteUrl(pathname: string): string {
  return new URL(ensureTrailingSlash(pathname), SITE_ORIGIN).href;
}

const STATIC_PAIRS: Array<[string, string]> = [
  ['/es/', '/en/'],
  ['/es/productos/', '/en/products/'],
  ['/es/recetas/', '/en/recipes/'],
  ['/es/contacto/', '/en/contact/'],
  ['/es/blog/', '/en/blog/'],
  ['/es/nosotros/', '/en/about-us/'],
  ['/es/promociones/', '/en/promotions/'],
  ['/es/politica-de-privacidad/', '/en/privacy-policy/'],
];

const RECIPE_ES_TO_EN: Record<string, string> = {
  'nachos-con-carne-con-ranchitas-nacho-queso': 'nachos-con-carne-con-ranchitas-nacho-queso',
  'guacamole-con-ranchitas-naturales': 'guacamole-with-ranchitas-naturales',
  'monster-sandwich-con-ranchitas-nacho-excitante': 'monster-sandwich-with-ranchitas-nacho-excitante',
  'ranchitas-caldosas-con-ranchitas-nacho-excitante': 'ranchitas-caldosas-with-ranchitas-nacho-excitante',
  'dip-cremoso-frijol-chipotle': 'bean-and-chipotledip',
  'dip-de-elote-cremoso-con-puro-crunch': 'creamy-corn-casserole',
  'cheese-dip-ranchitas': 'loaded-cheese-dip',
  'nachos-rancheros-con-ranchitas-nacho-excitante': 'ranchero-nachos-with-ranchitas-nacho-excitante',
  'dip-de-pollo-picante-y-queso-ranchitas-buffalo-ranch': 'spicy-chicken-cheese-dip',
};

const RECIPE_EN_TO_ES: Record<string, string> = Object.fromEntries(
  Object.entries(RECIPE_ES_TO_EN).map(([es, en]) => [en, es]),
);

export interface HreflangAlternate {
  lang: string;
  path: string;
}

export function getHreflangAlternates(pathname: string): HreflangAlternate[] {
  const path = ensureTrailingSlash(pathname.split('?')[0] || '/');

  const esProduct = path.match(/^\/es\/productos\/([^/]+)\/$/);
  if (esProduct) {
    return [
      { lang: 'es', path },
      { lang: 'en', path: `/en/products/${esProduct[1]}/` },
    ];
  }

  const enProduct = path.match(/^\/en\/products\/([^/]+)\/$/);
  if (enProduct) {
    return [
      { lang: 'es', path: `/es/productos/${enProduct[1]}/` },
      { lang: 'en', path },
    ];
  }

  const esRecipe = path.match(/^\/es\/recetas\/([^/]+)\/$/);
  if (esRecipe) {
    const enId = RECIPE_ES_TO_EN[esRecipe[1]];
    return enId
      ? [
          { lang: 'es', path },
          { lang: 'en', path: `/en/recipes/${enId}/` },
        ]
      : [{ lang: 'es', path }];
  }

  const enRecipe = path.match(/^\/en\/recipes\/([^/]+)\/$/);
  if (enRecipe) {
    const esId = RECIPE_EN_TO_ES[enRecipe[1]];
    return esId
      ? [
          { lang: 'es', path: `/es/recetas/${esId}/` },
          { lang: 'en', path },
        ]
      : [{ lang: 'en', path }];
  }

  for (const [es, en] of STATIC_PAIRS) {
    if (path === es || path === en) {
      return [
        { lang: 'es', path: es },
        { lang: 'en', path: en },
      ];
    }
  }

  const lang = path.startsWith('/en/') ? 'en' : 'es';
  return [{ lang, path }];
}
