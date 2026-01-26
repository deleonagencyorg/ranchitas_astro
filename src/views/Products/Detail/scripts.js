// src/views/Products/Detail/scripts.js

// Exportamos una función para que se pueda importar y ejecutar solo en el cliente
export function initProductDetail() {
  // Manejo de imágenes que fallan al cargar - incluyendo modal
  document.querySelectorAll('.product-detail img, #where-to-buy-modal img').forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        this.onerror = null;
        // Para iconos de stockist, usar un placeholder genérico
        if (this.closest('#where-to-buy-modal')) {
          console.error('Error loading stockist icon:', this.src);
          this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="12">Sin imagen</text></svg>';
        } else {
          this.src = '/images/products/placeholder.jpg';
        }
      });
    }
  });

  // Galería de imágenes simple
  const thumbnails = document.querySelectorAll('.product-gallery .grid img');
  const mainImage = document.querySelector('.product-gallery > div > img');
  
  if (thumbnails && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        const newSrc = thumb.getAttribute('src');
        mainImage.setAttribute('src', newSrc);
      });
    });
  }

  // Mejorar la experiencia de transición al navegar
  setupSmoothTransitions();
}

/**
 * Configura transiciones suaves al navegar entre productos
 */
function setupSmoothTransitions() {
  // Agregar clase de preparación antes de la transición
  document.addEventListener('astro:before-preparation', () => {
    document.documentElement.classList.add('astro-transitioning');
  });

  // Remover clase después de completar la transición
  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.remove('astro-transitioning');
    
    // Re-inicializar después de la transición
    initProductDetail();
  });

  // Agregar efecto de carga suave a las imágenes
  const productImage = document.getElementById('product-image');
  if (productImage && !productImage.complete) {
    productImage.style.opacity = '0';
    productImage.addEventListener('load', function() {
      this.style.transition = 'opacity 300ms ease-out';
      this.style.opacity = '1';
    });
  }
}

