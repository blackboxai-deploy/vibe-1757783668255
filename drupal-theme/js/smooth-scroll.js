/**
 * @file
 * Smooth scrolling and back to top functionality
 */

(function (Drupal) {
  'use strict';

  /**
   * Smooth scroll and back to top behavior.
   */
  Drupal.behaviors.zathayaSoftSmoothScroll = {
    attach: function (context, settings) {
      
      // Back to top button functionality
      const backToTopButton = document.querySelector('.back-to-top');
      
      if (backToTopButton) {
        let isVisible = false;
        
        // Show/hide back to top button based on scroll position
        function toggleBackToTop() {
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const shouldShow = scrollTop > 300;
          
          if (shouldShow !== isVisible) {
            isVisible = shouldShow;
            backToTopButton.classList.toggle('visible', isVisible);
          }
        }
        
        // Smooth scroll to top
        function scrollToTop(event) {
          event.preventDefault();
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
        }
        
        // Event listeners
        window.addEventListener('scroll', toggleBackToTop, { passive: true });
        backToTopButton.addEventListener('click', scrollToTop);
        
        // Initialize
        toggleBackToTop();
      }
      
      // Smooth scrolling for all anchor links
      const anchorLinks = document.querySelectorAll('a[href^="#"]');
      
      anchorLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
          const href = this.getAttribute('href');
          
          // Skip empty anchors
          if (href === '#' || href === '#!') {
            return;
          }
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            event.preventDefault();
            
            // Calculate offset for fixed header
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const offset = 20; // Additional offset
            
            const targetPosition = targetElement.offsetTop - headerHeight - offset;
            
            window.scrollTo({
              top: Math.max(0, targetPosition),
              behavior: 'smooth'
            });
          }
        });
      });
      
      // Scroll indicator functionality (for homepage hero section)
      const scrollIndicator = document.querySelector('.scroll-indicator');
      
      if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
          const nextSection = document.querySelector('.hero-section + section, .hero-section ~ section');
          
          if (nextSection) {
            const header = document.querySelector('.site-header');
            const headerHeight = header ? header.offsetHeight : 0;
            const targetPosition = nextSection.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        });
      }
      
      // Scroll spy functionality for navigation
      function scrollSpy() {
        const sections = document.querySelectorAll('section[id], .section[id]');
        const navLinks = document.querySelectorAll('.menu-link[href^="#"]');
        
        if (sections.length === 0 || navLinks.length === 0) {
          return;
        }
        
        const header = document.querySelector('.site-header');
        const headerHeight = header ? header.offsetHeight : 0;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        let currentSection = '';
        
        sections.forEach(function(section) {
          const sectionTop = section.offsetTop - headerHeight - 50;
          const sectionHeight = section.offsetHeight;
          
          if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
          }
        });
        
        // Update active nav links
        navLinks.forEach(function(link) {
          link.classList.remove('active');
          
          const href = link.getAttribute('href');
          if (href === '#' + currentSection) {
            link.classList.add('active');
          }
        });
      }
      
      // Throttled scroll spy
      let scrollSpyTimeout;
      function throttledScrollSpy() {
        if (scrollSpyTimeout) {
          return;
        }
        
        scrollSpyTimeout = setTimeout(function() {
          scrollSpy();
          scrollSpyTimeout = null;
        }, 100);
      }
      
      window.addEventListener('scroll', throttledScrollSpy, { passive: true });
      
      // Initialize scroll spy
      scrollSpy();
      
      // Parallax scroll effect for hero background
      const heroSection = document.querySelector('.hero-section');
      const heroBackground = document.querySelector('.hero-background');
      
      if (heroSection && heroBackground && window.innerWidth > 768) {
        let rafId;
        
        function parallaxScroll() {
          const scrolled = window.pageYOffset;
          const rate = scrolled * -0.5;
          
          heroBackground.style.transform = `translate3d(0, ${rate}px, 0)`;
          
          rafId = null;
        }
        
        function handleParallax() {
          if (rafId) {
            return;
          }
          
          rafId = requestAnimationFrame(parallaxScroll);
        }
        
        window.addEventListener('scroll', handleParallax, { passive: true });
      }
      
      // Intersection Observer for animations
      if ('IntersectionObserver' in window) {
        const observerOptions = {
          threshold: 0.1,
          rootMargin: '-50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll(
          '.section-header, .feature-card, .service-card, .portfolio-item, .testimonial-card'
        );
        
        animateElements.forEach(function(element) {
          observer.observe(element);
        });
      }
      
      // Progressive enhancement for reduced motion
      if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        // Override smooth scrolling for users who prefer reduced motion
        const style = document.createElement('style');
        style.textContent = `
          * {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `;
        document.head.appendChild(style);
      }
    }
  };

})(Drupal);