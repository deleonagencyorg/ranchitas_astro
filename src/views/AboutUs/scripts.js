// Timeline Observer - Optimizado para móviles y escritorio
(function() {
  'use strict';
  
  let observer = null;
  let isInitialized = false;
  let retryCount = 0;
  const MAX_RETRIES = 10;
  
  function initializeTimelineObserver() {
    // Evitar múltiples inicializaciones
    if (isInitialized) {
      return;
    }
    
    // Configuración del Intersection Observer optimizada
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-30% 0px -30% 0px', // Activar cuando el elemento esté en el centro
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1] // Múltiples thresholds para mejor detección
    };

    // Callback optimizado que se ejecuta cuando cambia la intersección
    const observerCallback = (entries) => {
      // Usar requestAnimationFrame para optimizar rendimiento
      requestAnimationFrame(() => {
        entries.forEach(entry => {
          const timelineItem = entry.target;
          
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            // Remover clase active de todos los elementos de forma eficiente
            const activeItems = document.querySelectorAll('.timeline-item.active');
            activeItems.forEach(item => item.classList.remove('active'));
            
            // Agregar clase active al elemento actual
            timelineItem.classList.add('active');
            
            // Log para debugging en desarrollo
            if (process.env.NODE_ENV === 'development') {
              const year = timelineItem.getAttribute('data-year');
              console.log(`Timeline item ${year} is now active`);
            }
          }
        });
      });
    };

    // Verificar que los elementos existen antes de crear el observer
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    if (timelineItems.length === 0) {
      retryCount++;
      if (retryCount < MAX_RETRIES) {
        console.log(`Timeline items not found, retrying ${retryCount}/${MAX_RETRIES}...`);
        setTimeout(initializeTimelineObserver, 100);
        return;
      } else {
        console.warn('Timeline items not found after maximum retries');
        return;
      }
    }

    // Activar el primer elemento por defecto al cargar la página
    if (timelineItems.length > 0) {
      // Usar DocumentFragment para optimizar DOM manipulations
      timelineItems.forEach((item, index) => {
        if (index === 0) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }

    // Crear el observer solo si no existe
    if (!observer) {
      observer = new IntersectionObserver(observerCallback, observerOptions);
    }

    // Observar todos los elementos de la timeline
    timelineItems.forEach(item => {
      observer.observe(item);
    });

    isInitialized = true;
    console.log(`Timeline observer initialized with ${timelineItems.length} items`);

    // Cleanup cuando se navega fuera de la página
    const cleanup = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
        isInitialized = false;
      }
    };

    // Múltiples eventos de cleanup para robustez
    window.addEventListener('beforeunload', cleanup);
    window.addEventListener('pagehide', cleanup);
    
    // Cleanup para navegación SPA (Astro)
    document.addEventListener('astro:before-preparation', cleanup);
    document.addEventListener('astro:before-swap', cleanup);
  }

  // Función de inicialización robusta con múltiples estrategias
  function initWithStrategy() {
    // Estrategia 1: DOM ya está listo
    if (document.readyState === 'complete') {
      initializeTimelineObserver();
      return;
    }
    
    // Estrategia 2: DOM está cargando o interactivo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeTimelineObserver, { once: true });
    } else {
      // DOM está en estado 'interactive'
      initializeTimelineObserver();
    }
    
    // Estrategia 3: Backup con window.load
    window.addEventListener('load', () => {
      if (!isInitialized) {
        console.log('Fallback initialization on window.load');
        initializeTimelineObserver();
      }
    }, { once: true });
    
    // Estrategia 4: Timeout de seguridad para casos extremos
    setTimeout(() => {
      if (!isInitialized && retryCount === 0) {
        console.log('Safety timeout initialization');
        initializeTimelineObserver();
      }
    }, 1000);
  }

  // Inicializar inmediatamente
  initWithStrategy();

  // Soporte para hot reload en desarrollo
  if (process.env.NODE_ENV === 'development') {
    window.reinitializeTimeline = () => {
      isInitialized = false;
      retryCount = 0;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      initializeTimelineObserver();
    };
  }
})();