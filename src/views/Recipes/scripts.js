// ============================================
// SISTEMA DE ANIMACIONES FLUIDAS Y AGRADABLES
// PARA RECETAS - REINGENIERÍA COMPLETA
// ============================================

/**
 * Inicializa todas las animaciones de recetas
 * - Animaciones de entrada con stagger
 * - Observador de intersección para scroll
 * - Gestión de imágenes con fallback
 */

let recipeAnimationState = {
  isFiltering: false,
  observedCards: new Set(),
  animationQueue: []
};

// Inicialización múltiple para compatibilidad con Astro
document.addEventListener('DOMContentLoaded', initRecipes);
document.addEventListener('astro:page-load', initRecipes);

function initRecipes() {
  // Pequeño delay para asegurar que el DOM esté completamente listo
  requestAnimationFrame(() => {
    initRecipeImages();
    initRecipeAnimations();
  });
}

/**
 * Gestiona las imágenes con fallback automático
 */
function initRecipeImages() {
  const images = document.querySelectorAll('.recipe-card img');
  
  images.forEach(img => {
    // Remover listeners previos si existen
    img.removeEventListener('error', handleImageError);
    img.addEventListener('error', handleImageError);
    
    // Si la imagen ya falló, aplicar placeholder inmediatamente
    if (img.complete && img.naturalHeight === 0) {
      img.src = '/images/recipes/placeholder.jpg';
    }
  });
}

function handleImageError(e) {
  if (e.target.src !== '/images/recipes/placeholder.jpg') {
    e.target.src = '/images/recipes/placeholder.jpg';
  }
}

/**
 * Sistema de animaciones mejorado con Intersection Observer
 */
function initRecipeAnimations() {
  const cards = document.querySelectorAll('.recipe-card');
  
  // Limpiar estado previo
  recipeAnimationState.observedCards.clear();
  
  // Si no hay Intersection Observer, simplemente hacer las cards visibles
  if (!('IntersectionObserver' in window)) {
    cards.forEach(card => card.classList.add('visible'));
    return;
  }
  
  // Configurar observador de intersección optimizado
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting && !recipeAnimationState.observedCards.has(entry.target)) {
          // Agregar a observados
          recipeAnimationState.observedCards.add(entry.target);
          
          // Aplicar clase de animación primero
          entry.target.classList.add('animating-in');
          
          // Aplicar animación con delay ligero para efecto natural
          requestAnimationFrame(() => {
            setTimeout(() => {
              entry.target.classList.remove('animating-in');
              entry.target.classList.add('visible');
            }, index * 30);
          });
          
          // Dejar de observar después de animar
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '100px 0px'
    }
  );
  
  // Observar todas las cards
  cards.forEach(card => {
    observer.observe(card);
  });
}

/**
 * Animación fluida al filtrar recetas
 * Esta función es llamada desde el script inline de filtrado
 */
window.animateRecipeFilters = function(visibleCards, hiddenCards) {
  // Marcar que estamos filtrando
  const container = document.querySelector('.container');
  if (container) {
    container.classList.add('filtering');
  }
  
  // Primero ocultar las cards que no coinciden
  hiddenCards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.remove('filter-show', 'visible');
      card.classList.add('filter-hide');
    }, index * 20);
  });
  
  // Luego mostrar las cards visibles con stagger
  setTimeout(() => {
    visibleCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.remove('filter-hide');
        card.classList.add('filter-show', 'visible');
      }, index * 50);
    });
    
    // Remover clase de filtrado después de que termine
    setTimeout(() => {
      if (container) {
        container.classList.remove('filtering');
      }
    }, visibleCards.length * 50 + 500);
  }, hiddenCards.length * 20 + 100);
};

/**
 * Función auxiliar para refrescar animaciones
 * Útil cuando se agregan dinámicamente nuevas cards
 */
window.refreshRecipeAnimations = function() {
  initRecipeAnimations();
};


