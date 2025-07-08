// Toggle mobile menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.getElementById('menu-button');
    const primaryNav = document.getElementById('primary-nav');
    
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        
        // Toggle aria-expanded attribute
        menuButton.setAttribute('aria-expanded', !isExpanded);
        
        // Toggle mobile menu visibility
        primaryNav.classList.toggle('active');
        
        // Animate hamburger icon
        const hamburgerIcon = menuButton.querySelector('.hamburger-icon');
        hamburgerIcon.textContent = isExpanded ? '☰' : '✕';
    });
    
    // Close menu when clicking on a link (for mobile)
    document.querySelectorAll('#primary-nav a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 768) {
                primaryNav.classList.remove('active');
                menuButton.setAttribute('aria-expanded', 'false');
                menuButton.querySelector('.hamburger-icon').textContent = '☰';
            }
        });
    });
});