document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Theme & RTL Initialization
     ========================================================================== */
  const savedTheme = localStorage.getItem('theme') || 'light';
  const savedDir = localStorage.getItem('dir') || 'ltr';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  document.documentElement.setAttribute('dir', savedDir);

  /* ==========================================================================
     Dark Mode Toggle
     ========================================================================== */
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    // Optionally update icon SVG if using inline icons, here assuming Lucide handles it or we toggle classes
    themeToggles.forEach(t => {
      const icon = t.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.setAttribute('data-lucide', 'sun');
        } else {
          icon.setAttribute('data-lucide', 'moon');
        }
        if (window.lucide) {
          lucide.createIcons();
        }
      }
    });
  }

  // Initial icon set
  updateThemeIcons(savedTheme);

  /* ==========================================================================
     RTL Toggle
     ========================================================================== */
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir');
      const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  /* ==========================================================================
     Sticky Navbar & Scroll Progress
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.querySelector('.scroll-progress');

  window.addEventListener('scroll', () => {
    // Sticky Navbar
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll Progress
    if (scrollProgress) {
      const scrollTotal = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTotal / height) * 100;
      scrollProgress.style.width = scrollPercent + '%';
    }
  });

  /* ==========================================================================
     Hamburger Menu
     ========================================================================== */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-menu');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  }

  /* ==========================================================================
     Ripple Effect for Buttons
     ========================================================================== */
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  /* ==========================================================================
     Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => observer.observe(el));

  /* ==========================================================================
     Dropdown Toggles
     ========================================================================== */
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
  
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const parent = toggle.closest('.nav-dropdown');
      // Close other dropdowns
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        if (dropdown !== parent) {
          dropdown.classList.remove('open');
        }
      });
      parent.classList.toggle('open');
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-dropdown')) {
      document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
        dropdown.classList.remove('open');
      });
    }
  });
});

