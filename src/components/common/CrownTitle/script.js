// Add animation when crown title enters viewport
document.addEventListener('astro:page-load', () => {
  const crownTitles = document.querySelectorAll('.crown-title-container');
  
  // Animate crown when title enters viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelector('.crown-icon').style.transform = 'rotate(-15deg)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  crownTitles.forEach(title => {
    observer.observe(title);
  });
});
