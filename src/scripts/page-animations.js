// Animaciones para las páginas principales
document.addEventListener('DOMContentLoaded', () => {
  // Función para aplicar animaciones a elementos específicos
  function applyAnimations() {
    // Home page animations
    const homeElements = {
      // Spotify section
      spotifySection: document.querySelector('#spotify'),
      spotifyTitle: document.querySelector('#spotify .text-4xl'),
      spotifyLogo: document.querySelector('#spotify .w-64'),
      spotifyCards: document.querySelectorAll('#spotify .flex-1'),
      
      // Recipes section
      recipesSection: document.querySelector('#recipes'),
      recipesTitle: document.querySelector('#recipes h2'),
      recipeCards: document.querySelectorAll('.recipe-card'),
      
      // Products section
      productsSection: document.querySelector('#products'),
      productItems: document.querySelectorAll('.product-item'),
      
      // Visit links section
      visitSection: document.querySelector('.md\\:w-full.w-\\[80\\%\\].flex.flex-wrap')
    };
    
    // Recipes detail page animations
    const recipeDetailElements = {
      recipeHero: document.querySelector('.recipe-hero'),
      recipeImage: document.querySelector('.recipe-image'),
      recipeIngredients: document.querySelector('.recipe-ingredients'),
      recipeInstructions: document.querySelector('.recipe-instructions')
    };
    
    // Products detail page animations
    const productDetailElements = {
      productHero: document.querySelector('.product-hero'),
      productImage: document.querySelector('.product-image'),
      productInfo: document.querySelector('.product-info'),
      relatedProducts: document.querySelector('.related-products')
    };
    
    // Aplicar animaciones con IntersectionObserver
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Añadir clase para animar
          entry.target.classList.add('animate-in');
          
          // Dejar de observar después de animar
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Función para configurar animación en un elemento
    function setupAnimation(element, direction = 'up', delay = 0, duration = 500) {
      if (!element) return;
      
      element.classList.add('animate-on-scroll', `animate-from-${direction}`);
      element.style.transitionDuration = `${duration}ms`;
      element.style.transitionDelay = `${delay}ms`;
      observer.observe(element);
    }
    
    // Función para configurar animación en múltiples elementos
    function setupAnimations(elements, direction = 'up', baseDelay = 0, increment = 100, duration = 500) {
      if (!elements || !elements.length) return;
      
      elements.forEach((el, index) => {
        const delay = baseDelay + (index * increment);
        setupAnimation(el, direction, delay, duration);
      });
    }
    
    // Aplicar animaciones a Home
    if (homeElements.spotifySection) {
      setupAnimation(homeElements.spotifySection, 'down', 0, 700);
      setupAnimation(homeElements.spotifyTitle, 'left', 200, 500);
      setupAnimation(homeElements.spotifyLogo, 'right', 200, 500);
      setupAnimations(homeElements.spotifyCards, 'up', 300, 150, 700);
      setupAnimation(homeElements.visitSection, 'up', 200, 600);
    }
    
    if (homeElements.recipesSection) {
      setupAnimation(homeElements.recipesSection, 'down', 0, 700);
      setupAnimation(homeElements.recipesTitle, 'left', 200, 500);
      setupAnimations(homeElements.recipeCards, 'up', 300, 150, 700);
    }
    
    if (homeElements.productsSection) {
      setupAnimation(homeElements.productsSection, 'down', 0, 700);
      setupAnimations(homeElements.productItems, 'up', 300, 150, 700);
    }
    
    // Aplicar animaciones a Recipe Detail
    if (recipeDetailElements.recipeHero) {
      setupAnimation(recipeDetailElements.recipeHero, 'down', 0, 700);
      setupAnimation(recipeDetailElements.recipeImage, 'left', 200, 600);
      setupAnimation(recipeDetailElements.recipeIngredients, 'right', 300, 700);
      setupAnimation(recipeDetailElements.recipeInstructions, 'up', 400, 800);
    }
    
    // Aplicar animaciones a Product Detail
    if (productDetailElements.productHero) {
      setupAnimation(productDetailElements.productHero, 'down', 0, 700);
      setupAnimation(productDetailElements.productImage, 'left', 200, 600);
      setupAnimation(productDetailElements.productInfo, 'right', 300, 700);
      setupAnimation(productDetailElements.relatedProducts, 'up', 400, 800);
    }
  }
  
  // Ejecutar animaciones
  applyAnimations();
});
