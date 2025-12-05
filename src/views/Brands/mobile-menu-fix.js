// Mobile Menu Fix for Brands section
document.addEventListener('DOMContentLoaded', () => {
  // Ensure mobile menu has highest z-index and proper event handling
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  
  if (mobileMenu && mobileMenuButton) {
    // Ensure mobile menu has highest z-index
    mobileMenu.style.zIndex = '2147483647'; // Maximum z-index value
    
    // Re-initialize mobile menu button functionality
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      if (!mobileMenu.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
      const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
      mobileMenuButton.setAttribute('aria-expanded', (!isExpanded).toString());
      
      // Update icon
      const menuIconContainer = document.getElementById('menu-icon-container');
      if (menuIconContainer) {
        if (isExpanded) {
          menuIconContainer.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>`;
        } else {
          menuIconContainer.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>`;
        }
      }
    });
    
    // Re-initialize close button functionality
    if (mobileMenuClose) {
      mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Update button state
        if (mobileMenuButton) {
          mobileMenuButton.setAttribute('aria-expanded', 'false');
          const menuIconContainer = document.getElementById('menu-icon-container');
          if (menuIconContainer) {
            menuIconContainer.innerHTML = `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>`;
          }
        }
      });
    }
    
    // Re-initialize submenu toggles
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach((toggle) => {
      toggle.addEventListener('click', (e) => {
        e.preventDefault();
        const parentDiv = toggle.closest('.w-full');
        const submenuContainer = parentDiv?.querySelector('.submenu-container');
        
        if (submenuContainer) {
          submenuContainer.classList.toggle('hidden');
          const svg = toggle.querySelector('svg');
          if (svg) {
            if (submenuContainer.classList.contains('hidden')) {
              // Show down arrow
              svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>';
            } else {
              // Show up arrow
              svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path>';
            }
          }
        }
      });
    });
  }
});
