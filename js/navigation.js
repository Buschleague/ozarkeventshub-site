// Navigation Module
const Navigation = (() => {
  'use strict';

  // DOM Elements
  const header = document.getElementById('header');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  // Configuration
  const config = {
    scrollThreshold: 50,
    smoothScrollOffset: 80
  };

  // Initialize
  const init = () => {
    if (!header || !mobileMenuToggle || !mainNav) return;

    setupEventListeners();
    updateActiveNavLink();
  };

  // Setup Event Listeners
  const setupEventListeners = () => {
    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    // Close mobile menu when clicking nav links
    navLinks.forEach(link => {
      link.addEventListener('click', handleNavLinkClick);
    });

    // Scroll events
    window.addEventListener('scroll', throttle(handleScroll, 100));

    // Resize events
    window.addEventListener('resize', debounce(handleResize, 250));

    // Click outside to close mobile menu
    document.addEventListener('click', handleClickOutside);
  };

  // Toggle Mobile Menu
  const toggleMobileMenu = () => {
    mobileMenuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  };

  // Handle Navigation Link Click
  const handleNavLinkClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    // Close mobile menu
    if (mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }

    // Smooth scroll to section
    if (href.startsWith('#')) {
      e.preventDefault();
      smoothScrollToSection(href);
    }
  };

  // Smooth Scroll to Section
  const smoothScrollToSection = (selector) => {
    const target = document.querySelector(selector);
    if (!target) return;

    const targetPosition = target.offsetTop - config.smoothScrollOffset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  // Handle Scroll Events
  const handleScroll = () => {
    // Add/remove scrolled class
    if (window.scrollY > config.scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link
    updateActiveNavLink();
  };

  // Update Active Navigation Link
  const updateActiveNavLink = () => {
    const scrollPosition = window.scrollY + config.smoothScrollOffset + 100;

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href.startsWith('#')) return;

      const section = document.querySelector(href);
      if (!section) return;

      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  };

  // Handle Window Resize
  const handleResize = () => {
    // Close mobile menu on desktop resize
    if (window.innerWidth > 768 && mainNav.classList.contains('active')) {
      toggleMobileMenu();
    }
  };

  // Handle Click Outside Mobile Menu
  const handleClickOutside = (e) => {
    if (!mainNav.classList.contains('active')) return;

    const isClickInsideNav = mainNav.contains(e.target);
    const isClickOnToggle = mobileMenuToggle.contains(e.target);

    if (!isClickInsideNav && !isClickOnToggle) {
      toggleMobileMenu();
    }
  };

  // Utility: Throttle Function
  const throttle = (func, limit) => {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  // Utility: Debounce Function
  const debounce = (func, delay) => {
    let timeoutId;
    return function() {
      const args = arguments;
      const context = this;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
  };

  // Public API
  return {
    init
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', Navigation.init);
} else {
  Navigation.init();
}