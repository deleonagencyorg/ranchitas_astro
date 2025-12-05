// Función para manejar las animaciones de entrada
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar todos los elementos que queremos animar
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  // Configuración del Intersection Observer
  const observerOptions = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% del elemento debe ser visible
  };
  
  // Callback que se ejecuta cuando un elemento entra en el viewport
  const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Obtener la dirección de la animación desde el atributo data
        const direction = entry.target.dataset.animateDirection || 'up';
        const delay = entry.target.dataset.animateDelay || '0';
        
        // Añadir la clase de animación según la dirección
        entry.target.classList.add('animate-in', `animate-from-${direction}`);
        entry.target.style.animationDelay = `${delay}ms`;
        
        // Dejar de observar el elemento una vez animado
        observer.unobserve(entry.target);
      }
    });
  };
  
  // Crear el observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  
  // Observar cada elemento
  animatedElements.forEach(element => {
    observer.observe(element);
  });
});
