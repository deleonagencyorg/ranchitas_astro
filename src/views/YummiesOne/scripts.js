// src/views/YummiesOne/scripts.js

document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for anchor links
  const smoothScroll = (target) => {
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Add click handlers for buttons
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const text = this.textContent.trim();
      
      switch(text) {
        case 'Únete Ahora':
          // Handle join now action
          console.log('Join now clicked');
          // Add your join logic here
          break;
        case 'Saber Más':
          // Scroll to features section
          smoothScroll('.features-section');
          break;
        case 'Registrarse Gratis':
          // Handle registration action
          console.log('Register clicked');
          // Add your registration logic here
          break;
      }
    });
  });

  // Add hover effects for feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // Add scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.feature-card, .hero-section, .cta-section');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Add parallax effect to hero section
  window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    }
  });
}); 