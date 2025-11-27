// Inicialización de AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar AOS con configuración personalizada
  AOS.init({
    // Configuración global
    duration: 800,           // duración de las animaciones en ms
    easing: 'ease-out-cubic', // tipo de easing
    once: true,              // animación solo ocurre una vez
    mirror: false,           // no espejear las animaciones cuando se hace scroll hacia arriba
    offset: 120,             // offset (en px) desde el punto original donde la animación debe comenzar
    delay: 0,                // valores en ms
    anchorPlacement: 'top-bottom', // define qué posición del elemento respecto a la ventana debe activar la animación
    
    // Desactivar en dispositivos móviles pequeños para mejor rendimiento
    disable: window.innerWidth < 768 ? true : false,
  });
});
