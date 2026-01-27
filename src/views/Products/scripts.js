// Fix para las imágenes que no cargan
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = '/images/products/placeholder.jpg';
    });
  });
  
  // Filtro de categorías
  const filterButtons = document.querySelectorAll('.category-filter');
  const productCards = document.querySelectorAll('.product-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Actualizar estado activo de los botones
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      // Filtrar productos con animación
      productCards.forEach((card, index) => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
          card.style.animation = `fade-in-up 400ms cubic-bezier(0.4, 0, 0.2, 1) ${index * 100}ms backwards`;
        } else {
          card.style.animation = 'fade-out 200ms ease forwards';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // Mejorar la animación al hacer clic en un producto
  productCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Agregar efecto visual al hacer clic
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });
});

// Observador de intersección para animaciones al hacer scroll
const observeProducts = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '50px'
  });

  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });
};

// Inicializar el observador cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', observeProducts);
} else {
  observeProducts();
}

// Re-inicializar después de transiciones de Astro
document.addEventListener('astro:page-load', observeProducts);

