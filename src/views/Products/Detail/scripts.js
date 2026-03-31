// src/views/Products/Detail/scripts.js

export function initProductDetail() {
  // Fix imágenes que fallan
  document.querySelectorAll('.product-detail img, #where-to-buy-modal img').forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        this.onerror = null;
        if (this.closest('#where-to-buy-modal')) {
          this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%23f3f4f6" width="100" height="100"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="12">Sin imagen</text></svg>';
        } else {
          this.src = '/images/placeholder.jpg';
        }
      });
    }
  });

  // Galería de imágenes
  const thumbnails = document.querySelectorAll('.product-gallery .grid img');
  const mainImage = document.querySelector('.product-gallery > div > img');
  if (thumbnails && mainImage) {
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', (e) => {
        e.preventDefault();
        mainImage.setAttribute('src', thumb.getAttribute('src'));
      });
    });
  }

  // Fade in de imagen principal
  const productImage = document.getElementById('product-image');
  if (productImage && !productImage.complete) {
    productImage.style.opacity = '0';
    productImage.addEventListener('load', function() {
      this.style.transition = 'opacity 300ms ease-out';
      this.style.opacity = '1';
    });
  }
}

// ← Los listeners de Astro van FUERA de initProductDetail
// así solo se registran una vez, no en cada navegación
if (typeof document !== 'undefined') {
  document.addEventListener('astro:before-preparation', () => {
    document.documentElement.classList.add('astro-transitioning');
  });

  document.addEventListener('astro:after-swap', () => {
    document.documentElement.classList.remove('astro-transitioning');
    initProductDetail();
  });
}