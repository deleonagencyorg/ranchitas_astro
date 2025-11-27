export interface ProductSize {
  value: string;
  image: string;
}

export interface Product {
  id: string;
  name: string;
  image: string;
  available?: string;
  background_image: string;
  sizes: ProductSize[];
  description?: string;
  short_description?: string;
  presentaciones?: Array<{
    value: string;
    icono: string;
  }>;
  price?: number;
  category?: string;
  features?: string[];
  relatedProducts?: Product[];
  nutritional_info?: {
    serving_size: string;
    calories: number;
    fat: string;
    carbs: string;
    protein: string;
    sodium: string;
  };
  tags?: string[];
  serving_suggestion?: string;
}
