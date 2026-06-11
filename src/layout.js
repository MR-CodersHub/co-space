(function() {
    // 1. Initialize theme immediately to prevent flashing of light mode on dark pages
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.classList.toggle('dark', isDark);
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // 2. Determine directory level prefix (subpages inside pages/ need '../')
    const isSubPage = window.location.pathname.includes('/pages/') || window.location.pathname.includes('\\pages\\');
    const prefix = isSubPage ? '../' : './';

    // 3. Identify active page to highlight the corresponding menu item
    const pathname = window.location.pathname.toLowerCase();
    let currentPage = 'home';
    if (pathname.includes('home.html')) {
        currentPage = 'home2';
    } else if (pathname.includes('about.html')) {
        currentPage = 'about';
    } else if (pathname.includes('services.html') || pathname.includes('/service') || pathname.includes('\\service')) {
        currentPage = 'services';
    } else if (pathname.includes('blog')) {
        currentPage = 'blog';
    } else if (pathname.includes('contact.html')) {
        currentPage = 'contact';
    } else if (pathname.includes('index.html') || pathname === '/' || pathname.endsWith('/')) {
        currentPage = 'home';
    } else {
        currentPage = ''; // dashboard, pricing, etc.
    }

    // 4. Unified Header/Navbar Template
    const navHtml = `
    <nav class="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 shadow-sm"
        aria-label="Main navigation">
        <div class="container-custom flex items-center justify-between h-16">
            <!-- Logo -->
            <a href="${prefix}index.html" class="flex items-center gap-2 focus-ring rounded-lg px-2 py-1">
                <div class="w-12 h-12 rounded-lg flex items-center justify-center">
                    <img src="${prefix}assets/images/brand-logo.png" alt="brand-logo">
                </div>
                <span class="font-heading font-bold text-xl sm:block text-black dark:text-white">CoSpace</span>
            </a>

            <!-- Desktop Menu -->
            <div class="hidden md:flex items-center gap-8">
                <a href="${prefix}index.html"
                    class="${currentPage === 'home' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">Home</a>
                <a href="${prefix}pages/home.html"
                    class="${currentPage === 'home2' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">Home 2</a>
                <a href="${prefix}pages/about.html"
                    class="${currentPage === 'about' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">About</a>
                <a href="${prefix}pages/services.html"
                    class="${currentPage === 'services' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">Services</a>
                <a href="${prefix}pages/blog.html"
                    class="${currentPage === 'blog' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">Blog</a>
                <a href="${prefix}pages/contact.html"
                    class="${currentPage === 'contact' ? 'text-primary font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-primary'} transition-colors">Contact</a>
            </div>

            <!-- Right Side Actions -->
            <div class="flex items-center gap-4">
                <!-- RTL Toggle -->
                <button id="rtl-toggle"
                    class="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                    aria-label="Toggle RTL direction" title="Toggle RTL">
                    <i data-lucide="align-right" class="w-5 h-5 text-slate-600 dark:text-slate-300"></i>
                </button>

                <!-- Theme Toggle -->
                <button id="theme-toggle"
                    class="hidden md:flex p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                    aria-label="Toggle dark mode" title="Toggle theme">
                    <i data-lucide="moon" class="w-5 h-5 hidden dark:block text-slate-600 dark:text-slate-300"></i>
                    <i data-lucide="sun" class="w-5 h-5 dark:hidden text-slate-600 dark:text-slate-300"></i>
                </button>

                <!-- Profile Dropdown -->
                <div class="relative inline-block text-left" id="profile-dropdown-container">
                    <button id="profile-btn"
                        class="flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors focus-ring"
                        aria-label="User profile menu" aria-haspopup="true" aria-expanded="false">
                        <i data-lucide="user" class="w-5 h-5 text-slate-600 dark:text-slate-300"></i>
                    </button>
                    <!-- Dropdown Menu -->
                    <div id="profile-dropdown"
                        class="hidden absolute right-0 mt-2 w-56 sm:w-64 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-xl z-50 overflow-hidden transform opacity-0 scale-95 transition-all duration-200 origin-top-right">
                        <div
                            class="p-3 border-b border-gray-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
                            <p class="text-sm text-slate-500 dark:text-slate-400">Welcome to CoSpace</p>
                        </div>
                        <div class="py-1.5">
                            <a href="${prefix}pages/login.html"
                                class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors whitespace-nowrap">
                                <i data-lucide="log-in" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
                                <span class="font-medium">Login / Sign Up</span>
                            </a>
                            <a href="${prefix}pages/admin-dashboard.html"
                                class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors whitespace-nowrap">
                                <i data-lucide="shield" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
                                <span class="font-medium">Admin Dashboard</span>
                            </a>
                            <a href="${prefix}pages/user-dashboard.html"
                                class="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors whitespace-nowrap">
                                <i data-lucide="layout-dashboard" class="w-4 h-4 text-slate-400 flex-shrink-0"></i>
                                <span class="font-medium">User Dashboard</span>
                            </a>
                        </div>
                    </div>
                </div>

                <!-- Mobile Menu Button -->
                <button id="mobile-menu-btn"
                    class="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 focus-ring"
                    aria-label="Toggle menu" aria-expanded="false">
                    <svg class="w-6 h-6 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu"
            class="hidden absolute top-full left-0 w-full md:hidden border-t border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 shadow-xl z-40">
            <div class="container-custom py-4 space-y-2">
                <a href="${prefix}index.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'home' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">Home</a>
                <a href="${prefix}pages/home.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'home2' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">Home 2</a>
                <a href="${prefix}pages/about.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'about' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">About</a>
                <a href="${prefix}pages/services.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'services' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">Services</a>
                <a href="${prefix}pages/blog.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'blog' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">Blog</a>
                <a href="${prefix}pages/contact.html"
                    class="block px-4 py-2 rounded-lg ${currentPage === 'contact' ? 'bg-gray-200 dark:bg-slate-700 text-primary font-medium' : 'hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'} transition-colors">Contact</a>

                <div class="border-t border-gray-200 dark:border-slate-700 my-2 pt-2">
                    <p class="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Preferences</p>
                    <button id="mobile-rtl-toggle" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <i data-lucide="align-right" class="w-4 h-4 text-slate-400"></i> Toggle RTL
                    </button>
                    <button id="mobile-theme-toggle" class="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center gap-2 text-slate-700 dark:text-slate-300">
                        <i data-lucide="moon" class="w-4 h-4 hidden dark:block text-slate-400"></i>
                        <i data-lucide="sun" class="w-4 h-4 dark:hidden text-slate-400"></i>Toggle Mode
                        <span class="hidden dark:inline">Light Mode</span>
                        <span class="inline dark:hidden">Dark Mode</span>
                    </button>
                </div>

                <div class="border-t border-gray-200 dark:border-slate-700 my-2 pt-2">
                    <p class="px-4 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</p>
                    <a href="${prefix}pages/login.html"
                        class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-2"><i
                            data-lucide="log-in" class="w-4 h-4 text-slate-400"></i> Login / Sign Up</a>
                    <a href="${prefix}pages/admin-dashboard.html"
                        class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-2"><i
                            data-lucide="shield" class="w-4 h-4 text-slate-400"></i> Admin Dashboard</a>
                    <a href="${prefix}pages/user-dashboard.html"
                        class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-2"><i
                            data-lucide="layout-dashboard" class="w-4 h-4 text-slate-400"></i> User Dashboard</a>
                </div>
            </div>
        </div>
    </nav>
    `;

    // 5. Unified Footer Template
    const footerHtml = `
    <footer class="bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 pt-16 pb-8 border-t border-gray-200 dark:border-slate-800 animate-fade-in" role="contentinfo">
        <div class="container-custom">
            <!-- Main Grid (4 Equal Columns) -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                
                <!-- 1. Brand -->
                <div class="flex flex-col space-y-6">
                    <a href="${prefix}index.html" class="flex items-center gap-2 px-1">
                        <div class="w-12 h-12 rounded-lg flex items-center justify-center">
                            <img src="${prefix}assets/images/brand-logo.png" alt="brand-logo">
                        </div>
                        <span class="font-heading font-extrabold text-2xl text-black dark:text-white tracking-tight">CoSpace</span>
                    </a>
                    <p class="text-sm leading-relaxed">
                        An effective workplace ecosystem for your business needs.
                    </p>
                  
                </div>

                <!-- 2. Company Links -->
                <div class="flex flex-col space-y-6">
                    <h4 class="font-heading font-bold text-black dark:text-white text-base tracking-wide mb-2">Company</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="${prefix}index.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Home</a></li>
                        <li><a href="${prefix}pages/home.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Home 2</a></li>
                        <li><a href="${prefix}pages/about.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> About Us</a></li>
                        <li><a href="${prefix}pages/blog.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Blog</a></li>
                    </ul>
                </div>

                <!-- 3. Support Links -->
                <div class="flex flex-col space-y-6">
                    <h4 class="font-heading font-bold text-black dark:text-white text-base tracking-wide mb-2">Support</h4>
                    <ul class="space-y-3 text-sm">
                        <li><a href="${prefix}pages/contact.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Contact Sales</a></li>
                        <li><a href="${prefix}pages/services.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Services</a></li>
                        <li><a href="${prefix}pages/pricing.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Pricing Plans</a></li>
                        <li><a href="${prefix}pages/faq.html" class="hover:text-primary transition-colors flex items-center gap-2"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-primary"></i> Help & FAQ</a></li>
                    </ul>
                </div>

                <!-- 4. Contact Details -->
                <div class="flex flex-col space-y-6">
                    <h4 class="font-heading font-bold text-black dark:text-white text-base tracking-wide mb-2">Headquarters</h4>
                    <ul class="space-y-4 text-sm">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-primary flex-shrink-0 mt-0.5"></i>
                            <span class="leading-relaxed">123 Creative Plaza, Floor 4,<br>New York, NY 10001</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="phone" class="w-4 h-4 text-primary flex-shrink-0"></i>
                            <span>+1 (800) 555-DESK</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="mail" class="w-4 h-4 text-primary flex-shrink-0"></i>
                            <a href="mailto:hello@cospace.com" class="hover:text-primary transition-colors">hello@cospace.com</a>
                        </li>
                    </ul>
                </div>

            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-gray-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                <p>&copy; 2026 CoSpace. All rights reserved.</p>
                <div class="flex gap-6 font-medium">
                    <a href="${prefix}pages/privacy.html" class="hover:text-primary transition-colors">Privacy Policy</a>
                    <a href="${prefix}pages/terms.html" class="hover:text-primary transition-colors">Terms of Service</a>
                </div>
            </div>
        </div>
    </footer>
    `;

    // 6 & 7. Replace Navbar and Footer if not a dashboard
    const isDashboard = window.location.pathname.includes('dashboard');
    if (!isDashboard) {
        const navContainer = document.querySelector('body > nav') || document.querySelector('nav');
        if (navContainer) {
            navContainer.outerHTML = navHtml;
        } else {
            document.body.insertAdjacentHTML('afterbegin', navHtml);
        }

        const footerContainer = document.querySelector('body > footer') || document.querySelector('footer:last-of-type');
        if (footerContainer && !footerContainer.closest('.card') && !footerContainer.closest('.testimonial')) {
            footerContainer.outerHTML = footerHtml;
        } else if (document.body) {
            document.body.insertAdjacentHTML('beforeend', footerHtml);
        }
    }

    // 8. Bind interactive events
    initLayoutEvents();
});

function initLayoutEvents() {
    // Theme Toggle Logic
    const themeToggles = [document.getElementById('theme-toggle'), document.getElementById('mobile-theme-toggle')];
    const html = document.documentElement;

    themeToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                html.classList.toggle('dark');
                const isDark = html.classList.contains('dark');
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            });
        }
    });

    // RTL Toggle Logic
    const rtlToggles = [document.getElementById('rtl-toggle'), document.getElementById('mobile-rtl-toggle')];
    
    // Init RTL from local storage
    const savedDir = localStorage.getItem('dir');
    if (savedDir) {
        html.setAttribute('dir', savedDir);
    }

    rtlToggles.forEach(toggle => {
        if (toggle) {
            toggle.addEventListener('click', () => {
                const currentDir = html.getAttribute('dir') || 'ltr';
                const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
                html.setAttribute('dir', newDir);
                localStorage.setItem('dir', newDir);
            });
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !mobileMenu.classList.contains('hidden');
            mobileMenu.classList.toggle('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
        });

        // Close mobile menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Profile Dropdown Toggle
    const profileBtn = document.getElementById('profile-btn');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileBtn && profileDropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isHidden = profileDropdown.classList.contains('hidden');
            if (isHidden) {
                profileDropdown.classList.remove('hidden');
                // Small delay to allow CSS transitions to trigger
                setTimeout(() => {
                    profileDropdown.classList.remove('opacity-0', 'scale-95');
                    profileDropdown.classList.add('opacity-100', 'scale-100');
                }, 10);
                profileBtn.setAttribute('aria-expanded', 'true');
            } else {
                closeDropdown();
            }
        });

        function closeDropdown() {
            profileDropdown.classList.remove('opacity-100', 'scale-100');
            profileDropdown.classList.add('opacity-0', 'scale-95');
            profileBtn.setAttribute('aria-expanded', 'false');
            setTimeout(() => {
                profileDropdown.classList.add('hidden');
            }, 200);
        }

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileDropdown.contains(e.target) && e.target !== profileBtn) {
                if (!profileDropdown.classList.contains('hidden')) {
                    closeDropdown();
                }
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        if (anchor.getAttribute('href') === '#' || anchor.classList.contains('sr-only')) return;
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 9. Load Lucide Icons dynamically if not loaded, or simply create icons
    if (typeof lucide === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/lucide@latest';
        script.onload = () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };
        document.head.appendChild(script);
    } else {
        lucide.createIcons();
    }
}
