// Main Application Module
const App = (() => {
  'use strict';

  // Configuration
  const config = {
    animationObserverThreshold: 0.1,
    lazyLoadOffset: 50
  };

  // Initialize Application
  const init = () => {
    console.log('🎉 Ozark Events Hub initialized');

    // Setup features
    setupIntersectionObserver();
    setupLazyLoading();
    setupAccessibility();
    setupPerformanceOptimizations();

    // Log performance metrics in development
    if (window.location.hostname === 'localhost') {
      logPerformanceMetrics();
    }
  };

  // Setup Intersection Observer for animations
  const setupIntersectionObserver = () => {
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll('.section, .hero-content');

    const observerOptions = {
      threshold: config.animationObserverThreshold,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animatedElements.forEach(element => {
      observer.observe(element);
    });
  };

  // Setup Lazy Loading for images
  const setupLazyLoading = () => {
    if (!('IntersectionObserver' in window)) return;

    const lazyImages = document.querySelectorAll('img[data-src]');
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: `${config.lazyLoadOffset}px`
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  };

  // Setup Accessibility Features
  const setupAccessibility = () => {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#events';
    skipLink.className = 'skip-to-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.innerHTML = '<span class="sr-only">Skip to main content</span>';
    document.body.insertBefore(skipLink, document.body.firstChild);

    // Announce page changes for screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.className = 'sr-only';
    announcer.id = 'announcer';
    document.body.appendChild(announcer);

    // Keyboard navigation improvements
    document.addEventListener('keydown', (e) => {
      // Press '/' to focus search (when implemented)
      if (e.key === '/' && !isInputFocused()) {
        e.preventDefault();
        // Focus search input when implemented
      }

      // Press 'Escape' to close mobile menu
      if (e.key === 'Escape') {
        const mobileNav = document.getElementById('main-nav');
        if (mobileNav && mobileNav.classList.contains('active')) {
          document.getElementById('mobile-menu-toggle').click();
        }
      }
    });
  };

  // Setup Performance Optimizations
  const setupPerformanceOptimizations = () => {
    // Preload critical resources
    const preloadLink = document.createElement('link');
    preloadLink.rel = 'preload';
    preloadLink.as = 'image';
    preloadLink.href = 'assets/images/hero.jpg';
    document.head.appendChild(preloadLink);

    // Prefetch event sites on hover
    document.addEventListener('mouseover', (e) => {
      const link = e.target.closest('a[href^="http"]');
      if (link && !link.dataset.prefetched) {
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = link.href;
        document.head.appendChild(prefetchLink);
        link.dataset.prefetched = 'true';
      }
    });
  };

  // Utility: Check if input is focused
  const isInputFocused = () => {
    const activeElement = document.activeElement;
    return activeElement && (
      activeElement.tagName === 'INPUT' ||
      activeElement.tagName === 'TEXTAREA' ||
      activeElement.tagName === 'SELECT'
    );
  };

  // Log Performance Metrics (Development)
  const logPerformanceMetrics = () => {
    if (!window.performance || !window.performance.getEntriesByType) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.getEntriesByType('navigation')[0];
        if (perfData) {
          console.log('⚡ Performance Metrics:');
          console.log(`  DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
          console.log(`  Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
          console.log(`  Total Time: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
        }
      }, 0);
    });
  };

  // Public API
  return {
    init,
    announce: (message) => {
      const announcer = document.getElementById('announcer');
      if (announcer) {
        announcer.textContent = message;
      }
    }
  };
})();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', App.init);
} else {
  App.init();
}

// Service Worker Registration (for PWA support)
if ('serviceWorker' in navigator && window.location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, app will still work normally
    });
  });
}