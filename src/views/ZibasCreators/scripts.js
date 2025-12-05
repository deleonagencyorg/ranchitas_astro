// src/views/ZibasCreators/scripts.js

document.addEventListener('DOMContentLoaded', function() {
  // Inicializar animaciones de scroll
  initScrollAnimations();
  
  // Inicializar interacciones de botones
  initButtonInteractions();
  
  // Inicializar efectos de hover
  initHoverEffects();
  
  // Inicializar contador de likes (simulado)
  initLikeCounters();
});

/**
 * Inicializar animaciones de scroll
 */
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observar elementos para animación
  const animatedElements = document.querySelectorAll('.step-card, .category-card, .community-card');
  animatedElements.forEach(el => {
    observer.observe(el);
  });
}

/**
 * Inicializar interacciones de botones
 */
function initButtonInteractions() {
  // Botón "REVISAR A LOS JURADOS"
  const judgesButton = Array.from(document.querySelectorAll('button, a'))
    .find(el => (el.textContent || '').trim().includes('REVISAR A LOS JURADOS'));
  if (judgesButton) {
    judgesButton.addEventListener('click', function() {
      // Simular apertura de modal o navegación
      showNotification('¡Próximamente! Los jurados serán anunciados.', 'info');
    });
  }

  // Botón "SUBIR CONTENIDO"
  const uploadButton = Array.from(document.querySelectorAll('button, a'))
    .find(el => (el.textContent || '').trim().includes('SUBIR CONTENIDO'));
  if (uploadButton) {
    uploadButton.addEventListener('click', function() {
      // Simular apertura de formulario de subida
      showNotification('Sistema de subida de contenido en desarrollo.', 'info');
    });
  }

  // Enlaces de descarga PDF
  const pdfLinks = document.querySelectorAll('a[href*="PDF"], a[href*="pdf"]');
  pdfLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      showNotification('Descarga de reglas próximamente disponible.', 'info');
    });
  });
}

/**
 * Inicializar efectos de hover
 */
function initHoverEffects() {
  // Efectos para las tarjetas de comunidad
  const communityCards = document.querySelectorAll('.community-card');
  communityCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Efectos para las tarjetas de categorías
  const categoryCards = document.querySelectorAll('.category-card');
  categoryCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
}

/**
 * Inicializar contadores de likes (simulado)
 */
function initLikeCounters() {
  const likeElements = document.querySelectorAll('[class*="Likes"]');
  
  likeElements.forEach(element => {
    const currentLikes = parseInt(element.textContent.match(/\d+/)[0]);
    
    // Simular incremento de likes al hacer clic
    element.addEventListener('click', function() {
      const newLikes = currentLikes + Math.floor(Math.random() * 10) + 1;
      element.textContent = element.textContent.replace(/\d+/, newLikes);
      
      // Efecto visual
      element.style.color = '#10B981';
      setTimeout(() => {
        element.style.color = '';
      }, 1000);
    });
  });
}

/**
 * Mostrar notificación
 */
function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
  
  // Estilos según tipo
  switch(type) {
    case 'success':
      notification.className += ' bg-green-500 text-white';
      break;
    case 'error':
      notification.className += ' bg-red-500 text-white';
      break;
    case 'warning':
      notification.className += ' bg-yellow-500 text-black';
      break;
    default:
      notification.className += ' bg-blue-500 text-white';
  }
  
  notification.textContent = message;
  
  // Agregar al DOM
  document.body.appendChild(notification);
  
  // Animar entrada
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 100);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.classList.add('translate-x-full');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

/**
 * Efecto de partículas para el fondo (opcional)
 */
function initParticleEffect() {
  const sections = document.querySelectorAll('section');
  
  sections.forEach(section => {
    const colors = {
      'bg-orange-500': '#F97316',
      'bg-blue-600': '#2563EB',
      'bg-yellow-400': '#FACC15',
      'bg-pink-500': '#EC4899',
      'bg-red-600': '#DC2626'
    };
    
    // Determinar color basado en las clases de la sección
    let sectionColor = '#F97316'; // default
    for (const [className, color] of Object.entries(colors)) {
      if (section.classList.contains(className)) {
        sectionColor = color;
        break;
      }
    }
    
    // Crear partículas flotantes
    for (let i = 0; i < 5; i++) {
      createFloatingParticle(section, sectionColor);
    }
  });
}

/**
 * Crear partícula flotante
 */
function createFloatingParticle(container, color) {
  const particle = document.createElement('div');
  particle.className = 'absolute w-2 h-2 rounded-full opacity-20 pointer-events-none';
  particle.style.backgroundColor = color;
  particle.style.left = Math.random() * 100 + '%';
  particle.style.top = Math.random() * 100 + '%';
  particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
  
  container.appendChild(particle);
}

/**
 * Smooth scroll para enlaces internos
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  
  internalLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

/**
 * Efecto de parallax suave para elementos de fondo
 */
function initParallaxEffect() {
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.pixel-art');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Inicializar efectos adicionales
document.addEventListener('DOMContentLoaded', function() {
  initParticleEffect();
  initSmoothScroll();
  initParallaxEffect();
  initCategoriesInteraction();
});

/**
 * Inicializar interacción de categorías con hover
 */
function initCategoriesInteraction() {
  const categoryCards = document.querySelectorAll('.category-card');
  const container = document.querySelector('.categories-container');
  
  if (!container || categoryCards.length === 0) return;
  
  categoryCards.forEach((card, index) => {
    // Reset all cards on mouse leave
    card.addEventListener('mouseleave', function() {
      categoryCards.forEach(c => {
        c.style.opacity = '1';
        c.style.transform = 'scale(1)';
        c.style.minWidth = '310px';
        c.style.maxWidth = '310px';
        c.style.zIndex = '1';
      });
    });
    
    // Expand card on mouse enter
    card.addEventListener('mouseenter', function() {
      categoryCards.forEach((c, i) => {
        if (i === index) {
          // Expand the hovered card
          c.style.opacity = '1';
          c.style.transform = 'scale(1)';
          c.style.minWidth = '641px';
          c.style.maxWidth = '641px';
          c.style.zIndex = '20';
        } else {
          // Reduce opacity for other cards
          c.style.opacity = '0.3';
          c.style.transform = 'scale(0.9)';
          c.style.zIndex = '1';
        }
      });
    });
    
    // Add click handler for navigation
    card.addEventListener('click', function() {
      const categoryIndex = this.getAttribute('data-category-index');
      const categoryData = window.categoryData || [];
      
      if (categoryData[categoryIndex] && categoryData[categoryIndex].url) {
        window.location.href = categoryData[categoryIndex].url;
      }
    });
  });
  
  // Make category data available globally for click handlers
  window.categoryData = Array.from(categoryCards).map(card => {
    const title = card.querySelector('h4')?.textContent || '';
    const description = card.querySelector('p')?.textContent || '';
    return { title, description };
  });
}

// Agregar estilos CSS dinámicos para animaciones
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
  
  .animate-in {
    animation: fadeInUp 0.8s ease-out forwards;
  }
  
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);
