import React, { useState, useEffect, useRef } from 'react';
import './styles.css';

/**
 * A simple 3D-like carousel for products with enhanced mobile touch support
 */
export default function SimpleProductCarousel({ products = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
  
  // Auto-rotate the carousel, but pause on touch
  useEffect(() => {
    const interval = setInterval(() => {
      if (!touchStart) { // Solo avanza automáticamente si no hay un toque activo
        nextSlide();
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [activeIndex, touchStart]);
  
  // Funciones para manejar eventos táctiles
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(null); // Reiniciar touchEnd
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 30; // Umbral mínimo para considerar un swipe
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swipe hacia la izquierda - siguiente slide
        nextSlide();
      } else {
        // Swipe hacia la derecha - slide anterior
        prevSlide();
      }
    }
    
    // Reiniciar valores
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prevIndex) => (prevIndex - 1 + products.length) % products.length);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  if (!products || products.length === 0) {
    return <div className="no-products">No products available</div>;
  }
  
  return (
    <div 
      className="simple-carousel-container"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="carousel-viewport">
        {products.map((product, index) => {
          // Calculate position: -1 = left, 0 = center, 1 = right
          let position = index - activeIndex;
          
          // Handle wrapping for continuous carousel effect
          if (position < -1) {
            position += products.length;
          } else if (position > 1) {
            position -= products.length;
          }
          
          return (
            <div 
              key={product.id || index}
              className={`carousel-slide ${position === 0 ? 'active' : ''}`}
              style={{
                transform: `translateX(${position * 100}%) scale(${position === 0 ? 1 : 0.8})`,
                zIndex: position === 0 ? 2 : 1,
                opacity: Math.abs(position) > 1 ? 0 : 1
              }}
            >
              <div 
                className="product-card"
                onClick={() => {
                  // Si hay un enlace, navegar a él al hacer clic/tap en el producto
                  if (product.link) {
                    window.location.href = product.link;
                  }
                }}
              >
                <div className="product-image-container">
                  <img 
                    src={product.image} 
                    alt={product.title || product.alt || 'Product'} 
                    className="product-image"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="carousel-controls">
        <button 
          className="carousel-arrow carousel-arrow-left" 
          onClick={prevSlide}
          aria-label="Previous product"
        >
          <i className="fa fa-chevron-left"></i>
        </button>
        
        <button 
          className="carousel-arrow carousel-arrow-right" 
          onClick={nextSlide}
          aria-label="Next product"
        >
          <i className="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}
