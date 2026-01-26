// src/views/Recipes/Detail/scripts.js
// Animaciones limpias para el detalle de recetas

export function initRecipeDetailScripts() {
  // Manejo de imágenes que fallan al cargar
  document.querySelectorAll('.recipe-detail img').forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        this.onerror = null;
        this.src = '/images/recipes/placeholder.jpg';
      });
    }
  });

  // Smooth scroll para enlaces internos con offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Setup transiciones suaves entre recetas
if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-preparation', () => {
    document.documentElement.classList.add('astro-transitioning');
  });

  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.remove('astro-transitioning');
    initRecipeDetailScripts();
  });
}

