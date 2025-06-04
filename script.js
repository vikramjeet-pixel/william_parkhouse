// Enhanced navbar functionality
class NavbarController {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.progressBar = document.querySelector('.nav-progress-bar');
        // Remove this line:
        // this.themeToggle = document.getElementById('theme-toggle');
        
        this.lastScrollY = window.scrollY;
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.updateActiveLink();
        this.updateScrollProgress();
    }
    
    setupEventListeners() {
        // Mobile menu toggle
        this.hamburger?.addEventListener('click', () => this.toggleMobileMenu());
        
        // Close mobile menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.toggleMobileMenu();
                }
            });
        });
        
        // Scroll behavior
        window.addEventListener('scroll', () => {
            this.handleScroll();
            this.updateScrollProgress();
            this.updateActiveLink();
        });
        
        // Remove this line:
        // this.themeToggle?.addEventListener('click', () => this.toggleTheme());
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && !this.navbar.contains(e.target)) {
                this.toggleMobileMenu();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.toggleMobileMenu();
            }
        });
    }
    
    toggleMobileMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
    }
    
    handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class
        if (currentScrollY > 100) {
            this.navbar.classList.add('scrolled');
        } else {
            this.navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
            this.navbar.classList.add('hidden');
        } else {
            this.navbar.classList.remove('hidden');
        }
        
        this.lastScrollY = currentScrollY;
    }
    
    updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        this.progressBar.style.transform = `scaleX(${scrollPercent / 100})`;
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Remove the entire toggleTheme method:
    // toggleTheme() {
    //     const body = document.body;
    //     const isDark = body.classList.toggle('dark-theme');
    //     
    //     // Update theme toggle icon
    //     const icon = this.themeToggle.querySelector('i');
    //     icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    //     
    //     // Store theme preference
    //     localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // }
}

// Initialize navbar controller
document.addEventListener('DOMContentLoaded', () => {
    new NavbarController();
    
    // Remove this entire theme loading block:
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme === 'dark') {
    //     document.body.classList.add('dark-theme');
    //     const themeIcon = document.querySelector('#theme-toggle i');
    //     if (themeIcon) themeIcon.className = 'fas fa-sun';
    // }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.step, .option-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Waitlist API integration
async function joinWaitlist() {
    const emailInput = document.getElementById('waitlist-email');
    const messageDiv = document.getElementById('waitlist-message');
    const email = emailInput.value.trim();
    
    if (!email) {
        showMessage('Please enter your email address.', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    try {
        const response = await fetch(`https://recapa.app/api/waitlist?email=${encodeURIComponent(email)}`);
        const data = await response.json();
        
        if (response.ok) {
            showMessage('Thank you! You\'ve been added to our waitlist.', 'success');
            emailInput.value = '';
        } else {
            showMessage(data.error || 'Something went wrong. Please try again.', 'error');
        }
    } catch (error) {
        console.error('Waitlist API error:', error);
        showMessage('Network error. Please check your connection and try again.', 'error');
    }
}

// Calendly integration
function scheduleChat() {
    window.open('https://calendly.com/wjdparkhouse/chat', '_blank');
}

// Helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, type) {
    const messageDiv = document.getElementById('waitlist-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    
    // Clear message after 5 seconds
    setTimeout(() => {
        messageDiv.textContent = '';
        messageDiv.className = 'form-message';
    }, 5000);
}

// Video fallback handling
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-video');
    const fallbackImg = document.querySelector('.hero-fallback');
    
    if (video) {
        video.addEventListener('error', () => {
            console.log('Video failed to load, showing fallback image');
            if (fallbackImg) {
                fallbackImg.style.display = 'block';
                video.style.display = 'none';
            }
        });
        
        // Ensure video plays on mobile devices
        video.addEventListener('loadeddata', () => {
            video.play().catch(e => {
                console.log('Autoplay prevented:', e);
                // Show fallback image if autoplay is blocked
                if (fallbackImg) {
                    fallbackImg.style.display = 'block';
                    video.style.display = 'none';
                }
            });
        });
    }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        if (!this.style.transform.includes('translateY')) {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Loading optimization
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Handle email input on Enter key
document.addEventListener('DOMContentLoaded', () => {
    const emailInput = document.getElementById('waitlist-email');
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                joinWaitlist();
            }
        });
    }
});

// Cookie Consent Management - Updated for modal popup
class CookieConsent {
    constructor() {
        this.cookieConsent = document.getElementById('cookieConsent');
        this.acceptBtn = document.getElementById('acceptCookies');
        this.declineBtn = document.getElementById('declineCookies');
        this.settingsBtn = document.getElementById('cookieSettings');
        this.closeBtn = document.querySelector('.cookie-close');
        this.cookieName = 'recapa_cookie_consent';
        this.cookieExpiry = 365; // days
        
        this.init();
    }
    
    init() {
        // Check if user has already made a choice
        if (!this.getCookie(this.cookieName)) {
            this.showCookieConsent();
        }
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        this.acceptBtn?.addEventListener('click', () => this.acceptCookies());
        this.declineBtn?.addEventListener('click', () => this.declineCookies());
        this.settingsBtn?.addEventListener('click', () => this.showCookieSettings());
        this.closeBtn?.addEventListener('click', () => this.hideCookieConsent());
        
        // Close modal when clicking outside the content
        this.cookieConsent?.addEventListener('click', (e) => {
            if (e.target === this.cookieConsent) {
                this.hideCookieConsent();
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.cookieConsent?.classList.contains('show')) {
                this.hideCookieConsent();
            }
        });
    }
    
    showCookieConsent() {
        setTimeout(() => {
            this.cookieConsent?.classList.add('show');
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }, 1500); // Show after 1.5 seconds
    }
    
    hideCookieConsent() {
        this.cookieConsent?.classList.remove('show');
        // Restore body scroll
        document.body.style.overflow = '';
    }
    
    acceptCookies() {
        this.setCookie(this.cookieName, 'accepted', this.cookieExpiry);
        this.hideCookieConsent();
        
        // Enable analytics, tracking, etc.
        this.enableAllCookies();
        
        // Show success message (optional)
        this.showNotification('Cookies accepted. Thank you!', 'success');
    }
    
    declineCookies() {
        this.setCookie(this.cookieName, 'declined', this.cookieExpiry);
        this.hideCookieConsent();
        
        // Only enable essential cookies
        this.enableEssentialCookies();
        
        // Show info message (optional)
        this.showNotification('Only essential cookies will be used.', 'info');
    }
    
    showCookieSettings() {
        // This could open a modal with detailed cookie settings
        // For now, we'll just show an alert
        alert('Cookie settings would open here. You can customize this to show a detailed settings modal.');
    }
    
    enableAllCookies() {
        // Enable Google Analytics, Facebook Pixel, etc.
        console.log('All cookies enabled');
        
        // Example: Enable Google Analytics
        // gtag('consent', 'update', {
        //     'analytics_storage': 'granted'
        // });
    }
    
    enableEssentialCookies() {
        // Only enable essential cookies for site functionality
        console.log('Only essential cookies enabled');
    }
    
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    }
    
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
    
    showNotification(message, type = 'info') {
        // Create a simple notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add notification styles if not already present
        if (!document.querySelector('.notification-styles')) {
            const style = document.createElement('style');
            style.className = 'notification-styles';
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: var(--primary-dark);
                    color: var(--text-white);
                    padding: 1rem 1.5rem;
                    border-radius: 10px;
                    border-left: 4px solid var(--primary-peach);
                    box-shadow: 0 4px 15px var(--black-30);
                    z-index: 10002;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                }
                .notification.show {
                    transform: translateX(0);
                }
                .notification-success {
                    border-left-color: var(--text-success);
                }
                .notification i {
                    color: var(--primary-peach);
                }
                .notification-success i {
                    color: var(--text-success);
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize existing navbar controller
    new NavbarController();
    
    // Initialize cookie consent
    new CookieConsent();
    
    // Smooth scroll function
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Alternative: Scroll to next section function
    function scrollToNextSection() {
        const currentScrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const nextSectionY = currentScrollY + windowHeight;
        
        window.scrollTo({
            top: nextSectionY,
            behavior: 'smooth'
        });
    }
    
    // Setup scroll arrow functionality (moved inside the same DOMContentLoaded)
    const scrollArrow = document.getElementById('scroll-arrow');
    if (scrollArrow) {
        scrollArrow.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Arrow clicked!'); // For debugging
            scrollToSection('how-it-works');
        });
    }
    
    // Make scrollToSection available globally for onclick handlers
    window.scrollToSection = scrollToSection;
});

// Add page transition functionality
function initPageTransitions() {
    // Add loading overlay to body
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'page-loading';
    loadingOverlay.innerHTML = '<div class="loading-spinner"></div>';
    document.body.appendChild(loadingOverlay);
    
    // Fade out loading overlay when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingOverlay.classList.add('fade-out');
            setTimeout(() => {
                loadingOverlay.remove();
            }, 500);
        }, 200);
    });
    
    // Add transition class to body
    document.body.classList.add('page-transition');
    
    // Add content section animations
    const sections = document.querySelectorAll('section, .section, main > div, .container > div');
    sections.forEach((section, index) => {
        section.classList.add('content-section');
        section.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Handle link clicks for smooth transitions
    const links = document.querySelectorAll('a[href$=".html"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.includes('.html')) {
                e.preventDefault();
                
                // Add exit animation
                document.body.classList.add('page-exit');
                
                // Navigate after animation
                setTimeout(() => {
                    window.location.href = href;
                }, 400);
            }
        });
    });
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPageTransitions);
} else {
    initPageTransitions();
}