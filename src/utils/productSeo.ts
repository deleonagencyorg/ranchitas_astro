export interface ProductSeoInput {
  id: string;
  name: string;
  description?: string;
  short_description?: string;
  image?: string;
  nutrition?: {
    serving?: string;
    rows?: Array<{ label: string; value: string }>;
  };
}

const NUTRITION_FIELDS: Array<[RegExp, string]> = [
  [/^(energ[ií]a|energy)$/i, 'calories'],
  [/^(grasa total|total fat)$/i, 'fatContent'],
  [/^(grasa saturada|saturated fat)$/i, 'saturatedFatContent'],
  [/^(grasa trans|trans fat)$/i, 'transFatContent'],
  [/^(colesterol|cholesterol)$/i, 'cholesterolContent'],
  [/^(sodio|sodium)$/i, 'sodiumContent'],
  [/^(carbohidratos|total carbohydrate)/i, 'carbohydrateContent'],
  [/^(fibra|dietary fiber)/i, 'fiberContent'],
  [/az[uú]cares|sugars?$/i, 'sugarContent'],
  [/^(prote[ií]nas|protein)$/i, 'proteinContent'],
];

function flavorName(name: string): string {
  return name.replace(/^Ranchitas\s+/i, '').trim();
}

function shortText(product: ProductSeoInput): string {
  return (product.short_description || product.description || '').trim().replace(/\.+$/, '');
}

export function productPageSeo(lang: 'es' | 'en', product: ProductSeoInput): { title: string; description: string } {
  const flavor = flavorName(product.name);
  const short = shortText(product);

  if (lang === 'en') {
    const title = `Ranchitas ${flavor} | Ranchitas corn snacks`;
    const description = `Ranchitas ${flavor}: ${short}. See sizes, nutrition facts, and Ranchitas recipes.`;
    return {
      title: title.length <= 60 ? title : `Ranchitas ${flavor}`,
      description,
    };
  }

  const title = `Ranchitas ${flavor} | Snacks de maíz Ranchitas`;
  const description = `Ranchitas ${flavor}: ${short}. Conoce tamaños, información nutricional y recetas con Ranchitas.`;
  return {
    title: title.length <= 60 ? title : `Ranchitas ${flavor}`,
    description,
  };
}

export function productJsonLd(
  lang: 'es' | 'en',
  product: ProductSeoInput,
  pageUrl: string,
): Record<string, unknown> {
  const { description } = productPageSeo(lang, product);
  const nutrition: Record<string, string> = {
    '@type': 'NutritionInformation',
    servingSize: '1 oz (28 g)',
  };

  for (const row of product.nutrition?.rows ?? []) {
    const field = NUTRITION_FIELDS.find(([pattern]) => pattern.test(row.label.trim()));
    if (field && row.value) nutrition[field[1]] = row.value;
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: shortText(product) || description,
    brand: { '@type': 'Brand', name: 'Ranchitas' },
    manufacturer: {
      '@type': 'Organization',
      name: 'Snacks Yummies',
      url: 'https://www.snacksyummies.com/',
    },
    image: product.image ? [product.image] : [],
    url: pageUrl,
    nutrition,
  };
}
