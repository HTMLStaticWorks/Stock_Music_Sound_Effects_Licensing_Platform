document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     Sidebar Mobile Toggle
     ========================================================================== */
  const sidebar = document.getElementById('sidebar');
  const openSidebarBtn = document.getElementById('openSidebar');
  const closeSidebarBtn = document.getElementById('closeSidebar');

  if (openSidebarBtn && sidebar) {
    openSidebarBtn.addEventListener('click', () => {
      sidebar.classList.add('open');
    });
  }

  if (closeSidebarBtn && sidebar) {
    closeSidebarBtn.addEventListener('click', () => {
      sidebar.classList.remove('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (sidebar && openSidebarBtn && window.innerWidth <= 992) {
      if (!sidebar.contains(e.target) && !openSidebarBtn.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }
  });

  /* ==========================================================================
     Logout Logic
     ========================================================================== */
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // Clear any session info if needed, then redirect
      window.location.href = 'index.html';
    });
  }

  /* ==========================================================================
     Animated Counters for Dashboard Widgets
     ========================================================================== */
  const counters = document.querySelectorAll('.counter');
  const speed = 200; // Lower is faster

  counters.forEach(counter => {
    const updateCount = () => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;

      // Calculate increment
      const inc = target / speed;

      if (count < target) {
        counter.innerText = Math.ceil(count + inc);
        setTimeout(updateCount, 10);
      } else {
        counter.innerText = target;
      }
    };
    
    // Slight delay for animation effect
    setTimeout(updateCount, 300);
  });
});
