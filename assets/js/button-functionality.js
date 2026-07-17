document.addEventListener('DOMContentLoaded', () => {
    const allButtons = document.querySelectorAll('button, a.btn, a.button');
    const allLinks = document.querySelectorAll('a');

    // Create a mapping of keywords to URLs
    const routeMap = {
        'login': 'login.html',
        'log in': 'login.html',
        'register': 'register.html',
        'create account': 'register.html',
        'start free trial': 'register.html',
        'get started': 'pricing.html',
        'pricing': 'pricing.html',
        'view pricing': 'pricing.html',
        'manage subscription': 'pricing.html',
        'get commercial rights': 'pricing.html',
        'license': 'license-center.html',
        'select': 'license-center.html',
        'explore': 'music-library.html',
        'explore music': 'music-library.html',
        'explore catalog': 'music-library.html',
        'browse library': 'music-library.html',
        'browse sfx': 'music-library.html',
        'search catalog': 'music-library.html',
        'view pack': 'music-library.html',
        'view packs': 'music-library.html',
        'discover game assets': 'music-library.html',
        'contact sales': 'contact.html',
        'talk to sales': 'contact.html',
        'contact custom team': 'contact.html',
        'send message': 'contact.html',
        'notify me': 'contact.html',
        'change avatar': 'settings.html',
        'delete account': 'settings.html',
        'link your channel': 'settings.html',
        'view profile': 'settings.html',
        'save changes': 'settings.html',
        'update password': 'settings.html',
        'dashboard': 'dashboard.html'
    };

    function handleInteraction(el, text, isLink) {
        if (el.classList.contains('dropdown-toggle') || el.closest('.dropdown')) {
            return false; // Let existing JS handle dropdowns
        }
        
        if (el.closest('.theme-toggle') || el.classList.contains('theme-toggle')) {
            return false; // Handled by theme JS
        }

        if (el.classList.contains('sidebar-link') || el.closest('.sidebar-link')) {
            return false; // Let dashboard tab JS handle it
        }

        let matched = false;
        for (const [key, url] of Object.entries(routeMap)) {
            // Need a more robust match so 'select' doesn't match 'unselect' etc, but simple includes is fine for our limited vocabulary
            if (text.includes(key)) {
                window.location.href = url;
                matched = true;
                return true;
            }
        }

        if (!matched) {
            if (text.includes('preview')) {
                alert('Previewing track... (Audio playback simulated)');
                return true;
            } else if (text.includes('search')) {
                alert('Search functionality activated.');
                return true;
            } else if (text.includes('clear filters')) {
                alert('Filters cleared.');
                return true;
            } else if (text.includes('forgot password')) {
                alert('Password reset link sent to your email.');
                return true;
            } else if (text.includes('terms')) {
                alert('Opening Terms of Service...');
                return true;
            } else if (text.includes('privacy')) {
                alert('Opening Privacy Policy...');
                return true;
            }
        }
        
        // For buttons that have no specific text match but are still buttons
        if (!isLink && !matched && text) {
             alert('Action successful!');
             return true;
        }

        return false;
    }

    allButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const text = btn.textContent.trim().toLowerCase();
            const isHandled = handleInteraction(btn, text, false);
            if (isHandled) e.preventDefault();
        });
    });

    allLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            link.addEventListener('click', (e) => {
                const text = link.textContent.trim().toLowerCase();
                const isHandled = handleInteraction(link, text, true);
                if (isHandled) e.preventDefault();
            });
        }
    });
});
