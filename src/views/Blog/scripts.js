// Fix para las imágenes que no cargan
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('error', function() {
      // Ensure this placeholder path is correct and accessible
      this.src = '/images/news/placeholder.jpg'; 
    });
  });
});
