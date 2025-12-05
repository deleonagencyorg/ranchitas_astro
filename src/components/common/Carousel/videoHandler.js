// Script para manejar la reproducción automática de videos en el carrusel
document.addEventListener('DOMContentLoaded', () => {
  // Obtener todos los videos del carrusel
  const videos = document.querySelectorAll('.video-slide');
  if (!videos.length) return;
  
  // Función para iniciar la reproducción de un video específico
  function playVideo(video) {
    if (!video) return;
    
    // Usar una promesa para manejar la carga del video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // La reproducción automática comenzó con éxito
          console.log('Video playback started successfully');
        })
        .catch(error => {
          // La reproducción automática fue impedida
          console.warn('Video playback was prevented:', error);
          // En dispositivos móviles, puede requerir interacción del usuario
        });
    }
  }
  
  // Función para pausar todos los videos
  function pauseAllVideos() {
    videos.forEach(video => {
      video.pause();
    });
  }
  
  // Integración con Swiper para reproducir el video del slide activo
  function setupSwiperVideoHandling() {
    // Esperar a que Swiper esté inicializado
    const checkSwiper = setInterval(() => {
      const swiperInstance = document.querySelector('.swiper-container.main-carousel')?.swiper;
      
      if (swiperInstance) {
        clearInterval(checkSwiper);
        
        // Reproducir el video del slide inicial si es visible
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const activeVideo = activeSlide?.querySelector('.video-slide');
        if (activeVideo) {
          // Pequeño retraso para asegurar que el slide esté visible
          setTimeout(() => playVideo(activeVideo), 300);
        }
        
        // Manejar cambios de slide
        swiperInstance.on('slideChange', () => {
          // Pausar todos los videos primero
          pauseAllVideos();
          
          // Obtener el nuevo slide activo
          const newActiveSlide = swiperInstance.slides[swiperInstance.activeIndex];
          const newActiveVideo = newActiveSlide?.querySelector('.video-slide');
          
          // Reproducir el video si existe
          if (newActiveVideo) {
            // Pequeño retraso para asegurar que el slide esté visible
            setTimeout(() => playVideo(newActiveVideo), 300);
          }
        });
      }
    }, 200);
    
    // Limpiar el intervalo después de 5 segundos si Swiper no se inicializa
    setTimeout(() => clearInterval(checkSwiper), 5000);
  }
  
  // Optimización para dispositivos móviles
  function optimizeForMobile() {
    // Detectar si es un dispositivo móvil
    const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
      // En móviles, usar calidad más baja y precargar solo metadata
      videos.forEach(video => {
        // Asegurar que solo se precarga metadata
        video.preload = 'metadata';
        
        // Usar poster para mostrar una imagen mientras se carga el video
        if (!video.poster) {
          const src = video.querySelector('source')?.src;
          if (src) {
            const posterUrl = src.split('.').slice(0, -1).join('.') + '.jpg';
            video.poster = posterUrl;
          }
        }
      });
    } else {
      // En desktop, podemos ser más agresivos con la precarga
      const firstVideo = videos[0];
      if (firstVideo) {
        firstVideo.preload = 'auto';
      }
    }
  }
  
  // Inicializar todo
  optimizeForMobile();
  setupSwiperVideoHandling();
  
  // Manejar cambios de visibilidad de la página
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pausar todos los videos cuando la página no está visible
      pauseAllVideos();
    } else {
      // Al volver a la página, intentar reproducir el video activo
      const swiperInstance = document.querySelector('.swiper-container.main-carousel')?.swiper;
      if (swiperInstance) {
        const activeSlide = swiperInstance.slides[swiperInstance.activeIndex];
        const activeVideo = activeSlide?.querySelector('.video-slide');
        if (activeVideo) {
          playVideo(activeVideo);
        }
      }
    }
  });
});
