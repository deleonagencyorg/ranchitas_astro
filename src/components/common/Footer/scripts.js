// Scripts para el Footer
document.addEventListener('DOMContentLoaded', () => {
  // Aquí se pueden agregar interacciones específicas para el footer
  // Por ejemplo, animaciones al hacer scroll, validación de formularios, etc.
  
  // Ejemplo: Detectar cuando el footer es visible en viewport
  const footer = document.querySelector('footer');
  
  if (footer) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // El footer es visible
          footer.classList.add('footer-visible');
        }
      });
    }, {
      threshold: 0.1 // Visible cuando al menos 10% del footer está en viewport
    });
    
    observer.observe(footer);
  }
});
