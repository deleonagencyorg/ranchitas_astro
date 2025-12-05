// Scripts para el Header
document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconContainer = document.getElementById('menu-icon-container');
  const siteHeader = document.getElementById('site-header');
  const mobileMenuClose = document.getElementById('mobile-menu-close');

  // Definir las variables SVG
  const menuIconSvg = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
    </svg>
  `;
  const closeIconSvg = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  `;

  let isMenuOpen = false;

  // Función para abrir/cerrar el menú
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(isMenuOpen));
    
    if (isMenuOpen) {
      menuIconContainer.innerHTML = closeIconSvg;
      document.body.style.overflow = 'hidden';
      siteHeader.classList.add('bg-transparent');
      siteHeader.classList.remove('bg-black', 'bg-opacity-90', 'bg-gray-900');
    } else {
      menuIconContainer.innerHTML = menuIconSvg;
      document.body.style.overflow = '';
      siteHeader.classList.add('bg-transparent');
      siteHeader.classList.remove('bg-black', 'bg-opacity-90', 'bg-gray-900');
    }
  }

  // Agregar event listener al botón del menú
  if (menuButton && mobileMenu && menuIconContainer && siteHeader) {
    menuButton.addEventListener('click', toggleMenu);
  }
  
  // Agregar event listener al botón de cierre
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMenu);
  }

  // Cerrar menú si se hace clic en un enlace del menú móvil
  if (mobileMenu && menuButton) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (isMenuOpen) {
          menuButton.click(); 
        }
      });
    });
  }
});
