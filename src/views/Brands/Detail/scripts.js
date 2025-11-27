// Fix para las imágenes que no cargan
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      this.src = '/images/brands/placeholder.jpg';
    });
  });
  
  // Animación para las imágenes de chips
  const brandChips = document.querySelectorAll('.brand-chip');
  
  if (brandChips.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Añadir un retraso escalonado para una animación secuencial
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in');
          }, index * 150);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    brandChips.forEach(chip => {
      observer.observe(chip);
    });
  }
  
  // Zoom en las imágenes de chips al hacer clic
  brandChips.forEach(chip => {
    chip.addEventListener('click', function() {
      const img = this.querySelector('img');
      if (img) {
        // Crear un modal para mostrar la imagen ampliada
        const modal = document.createElement('div');
        modal.classList.add('fixed', 'inset-0', 'bg-black', 'bg-opacity-75', 'flex', 'items-center', 'justify-center', 'z-50');
        
        const modalImg = document.createElement('img');
        modalImg.src = img.src;
        modalImg.classList.add('max-w-[90%]', 'max-h-[90vh]', 'object-contain');
        
        modal.appendChild(modalImg);
        document.body.appendChild(modal);
        
        // Cerrar el modal al hacer clic
        modal.addEventListener('click', function() {
          document.body.removeChild(modal);
        });
      }
    });
  });
});
