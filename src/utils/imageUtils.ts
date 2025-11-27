/**
 * Utilidades para optimización de imágenes
 */

/**
 * Genera un conjunto de URLs para diferentes tamaños de imagen
 * @param baseUrl URL base de la imagen
 * @param extension Extensión de la imagen
 * @returns Array de URLs con diferentes tamaños
 */
export function generateImageSizes(baseUrl: string, extension: string): string[] {
  // Tamaños comunes para imágenes responsivas
  const sizes = [320, 640, 768, 1024, 1280];
  
  // Verificar si la URL ya tiene parámetros
  const hasParams = baseUrl.includes('?');
  
  return sizes.map(size => {
    // Para URLs externas que soportan parámetros de tamaño (como CDNs)
    if (baseUrl.includes('assets.doguiygatiprincipal.com')) {
      const separator = hasParams ? '&' : '?';
      return `${baseUrl}${separator}w=${size} ${size}w`;
    }
    
    // Para URLs locales, asumimos que podemos agregar dimensiones al nombre del archivo
    return `${baseUrl.replace(`.${extension}`, '')}-${size}w.${extension} ${size}w`;
  });
}

/**
 * Determina el tamaño óptimo para una imagen basado en su contexto de uso
 * @param context Contexto donde se usa la imagen (hero, thumbnail, etc.)
 * @returns String de tamaños para el atributo sizes
 */
export function getOptimalSizes(context: string = 'default'): string {
  switch (context) {
    case 'hero':
      return '(max-width: 768px) 100vw, 100vw';
    case 'banner':
      return '(max-width: 768px) 100vw, 100vw';
    case 'thumbnail':
      return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'gallery':
      return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'logo':
      return '(max-width: 640px) 50vw, 150px';
    case 'icon':
      return '(max-width: 640px) 24px, 32px';
    default:
      return '(max-width: 768px) 100vw, 50vw';
  }
}

/**
 * Determina si una imagen debe cargarse con prioridad alta
 * @param src URL de la imagen
 * @param context Contexto donde se usa la imagen
 * @returns Boolean indicando si debe tener prioridad alta
 */
export function shouldPrioritize(src?: string, context: string = 'default'): boolean {
  // Si src no está definido, no priorizar
  if (!src) return false;
  
  // Imágenes de banner o hero generalmente son LCP
  if (context === 'hero' || context === 'banner') {
    return true;
  }
  
  // Imágenes específicas que sabemos que son importantes
  const criticalImages = [
    'mobilebanner.webp',
    'imagen-magiamicrobioma.webp',
    'imagen-postbioticos.webp'
  ];
  
  return criticalImages.some(img => src.includes(img));
}
