/**
 * @file
 * Navigation functionality for Zathaya Soft theme
 */

(function (Drupal, $) {
  'use strict';

  /**
   * Navigation behavior.
   */
  Drupal.behaviors.zathayaSoftNavigation = {
    attach: function (context, settings) {
      const header = document.querySelector('.site-header');
      const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
      const primaryNavigation = document.querySelector('.primary-navigation');
      let isScrolled = false;
      let isMobileMenuOpen = false;

      if (!header || !mobileMenuToggle || !primaryNavigation) {
        return;
      }

      // Sticky header on scroll
      function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeScrolled = scrollTop > 20;

        if (shouldBeScrolled !== isScrolled) {
          isScrolled = shouldBeScrolled;
          
          if (isScrolled) {
            header.classList.add('is-scrolled');
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            header.style.borderBottom = '1px solid rgba(229, 231, 235, 1)';
          } else {
            header.classList.remove('is-scrolled');
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
            header.style.boxShadow = 'none';
            header.style.borderBottom = 'none';
          }
        }
      }

      // Mobile menu toggle
      function toggleMobileMenu() {
        isMobileMenuOpen = !isMobileMenuOpen;
        
        mobileMenuToggle.setAttribute('aria-expanded', isMobileMenuOpen.toString());
        mobileMenuToggle.classList.toggle('is-active', isMobileMenuOpen);
        primaryNavigation.classList.toggle('is-open', isMobileMenuOpen);
        document.body.classList.toggle('mobile-menu-open', isMobileMenuOpen);

        // Animate hamburger lines
        const hamburgerLines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        hamburgerLines.forEach((line, index) => {
          if (isMobileMenuOpen) {
            line.style.transform = index === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                                  index === 1 ? 'opacity: 0' :
                                  'rotate(-45deg) translate(7px, -6px)';
          } else {
            line.style.transform = 'none';
            line.style.opacity = '1';
          }
        });
      }

      // Close mobile menu when clicking on menu links
      function closeMobileMenu() {
        if (isMobileMenuOpen) {
          toggleMobileMenu();
        }
      }

      // Close mobile menu when clicking outside
      function handleOutsideClick(event) {
        if (isMobileMenuOpen && 
            !primaryNavigation.contains(event.target) && 
            !mobileMenuToggle.contains(event.target)) {
          toggleMobileMenu();
        }
      }

      // Smooth scroll for anchor links
      function handleSmoothScroll(event) {
        const target = event.target;
        if (target.tagName === 'A' && target.getAttribute('href').startsWith('#')) {
          event.preventDefault();
          
          const targetId = target.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            closeMobileMenu();
          }
        }
      }

      // Active menu item highlighting
      function updateActiveMenuItem() {
        const currentPath = window.location.pathname;
        const menuLinks = primaryNavigation.querySelectorAll('.menu-link');
        
        menuLinks.forEach(link => {
          link.classList.remove('active');
          
          const linkPath = new URL(link.href).pathname;
          if (linkPath === currentPath || 
              (currentPath === '/' && link.getAttribute('href') === '/') ||
              (currentPath.startsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
          }
        });
      }

      // Keyboard navigation support
      function handleKeyboardNavigation(event) {
        if (event.key === 'Escape' && isMobileMenuOpen) {
          toggleMobileMenu();
          mobileMenuToggle.focus();
        }
        
        if (event.key === 'Tab' && isMobileMenuOpen) {
          const focusableElements = primaryNavigation.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          );
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (!event.shiftKey && document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }

      // Event listeners
      window.addEventListener('scroll', handleScroll, { passive: true });
      mobileMenuToggle.addEventListener('click', toggleMobileMenu);
      document.addEventListener('click', handleOutsideClick);
      primaryNavigation.addEventListener('click', handleSmoothScroll);
      document.addEventListener('keydown', handleKeyboardNavigation);
      
      // Initialize
      handleScroll();
      updateActiveMenuItem();
      
      // Update active menu item on page load and popstate
      window.addEventListener('load', updateActiveMenuItem);
      window.addEventListener('popstate', updateActiveMenuItem);

      // Menu links click handler
      const menuLinks = primaryNavigation.querySelectorAll('.menu-link');
      menuLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
      });

      // Resize handler to close mobile menu on desktop
      let resizeTimer;
      window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
          if (window.innerWidth >= 768 && isMobileMenuOpen) {
            toggleMobileMenu();
          }
        }, 250);
      });

      // Accessibility improvements
      // Add ARIA labels and roles
      mobileMenuToggle.setAttribute('aria-label', Drupal.t('Toggle navigation menu'));
      primaryNavigation.setAttribute('aria-label', Drupal.t('Main navigation'));
      
      // Add focus management
      mobileMenuToggle.addEventListener('focus', function() {
        this.classList.add('focus-visible');
      });
      
      mobileMenuToggle.addEventListener('blur', function() {
        this.classList.remove('focus-visible');
      });

      // Logo click handler for homepage
      const logoLink = document.querySelector('.logo-link, .site-name-link');
      if (logoLink && logoLink.getAttribute('href') === '/') {
        logoLink.addEventListener('click', function(event) {
          if (window.location.pathname === '/') {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        });
      }

      // Search functionality (if search form exists)
      const searchToggle = document.querySelector('.search-toggle');
      const searchForm = document.querySelector('.header-search-form');
      
      if (searchToggle && searchForm) {
        let isSearchOpen = false;
        
        function toggleSearch() {
          isSearchOpen = !isSearchOpen;
          searchToggle.classList.toggle('is-active', isSearchOpen);
          searchForm.classList.toggle('is-open', isSearchOpen);
          
          if (isSearchOpen) {
            const searchInput = searchForm.querySelector('input[type="search"]');
            if (searchInput) {
              searchInput.focus();
            }
          }
        }
        
        searchToggle.addEventListener('click', toggleSearch);
        
        // Close search when clicking outside
        document.addEventListener('click', function(event) {
          if (isSearchOpen && 
              !searchForm.contains(event.target) && 
              !searchToggle.contains(event.target)) {
            toggleSearch();
          }
        });
        
        // Close search on escape
        document.addEventListener('keydown', function(event) {
          if (event.key === 'Escape' && isSearchOpen) {
            toggleSearch();
          }
        });
      }
    }
  };

})(Drupal, jQuery);