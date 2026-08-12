export interface SlideWithRegion {
  desktop: string;
  mobile: string;
  alt: string;
  title: string;
  subtitle: string;
  link?: string;
  regions?: string[]; // Lista de códigos de país donde se muestra
}

/**
 * @param slides - Array de slides a filtrar
 * @param countryCode - Código de país del usuario
 * @returns Array de slides filtrados
 */
export function filterSlidesByCountry(
  slides: SlideWithRegion[],
  countryCode: string | null
): SlideWithRegion[] {
  // Si no se detectó país o es null mostrar
  if (!countryCode) {
    return slides.filter(slide => !slide.regions || slide.regions.length === 0);
  }
     return slides.filter(slide => {
    // Si el slide no tiene restricción de regiones, mostrarlo
    if (!slide.regions || slide.regions.length === 0) {
      return true;
    }
    // Si el slide tiene restricción de regiones y  mostrar solo si el país está en la lista
    return slide.regions.includes(countryCode);
  });
}
/**
 * @param slides - Array de slides
 * @returns Array de slides con información de región
 */
export function enrichSlidesWithRegions(slides: any[]): SlideWithRegion[] {
  return slides.map((slide, index) => ({
    ...slide,
    regions: index === 2 ? ['CR'] : [] // Slide 3 con indice 2 solo para Costa Rica
  }));
}
