// src/views/News/Detail/scripts.js

// Exportamos una función para que se pueda importar y ejecutar solo en el cliente
export function initNewsDetail() {
  // Manejo de imágenes que fallan al cargar (para contenido dinámico)
  document.querySelectorAll('.news-detail img').forEach(img => {
    if (!img.hasAttribute('onerror')) {
      img.addEventListener('error', function() {
        this.onerror = null;
        this.src = '/images/news/placeholder.jpg';
      });
    }
  });
}
