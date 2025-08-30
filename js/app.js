// JavaScript untuk INTEGRAL - Inovasi Terpadu untuk Edukasi Matematika Digital

document.addEventListener('DOMContentLoaded', function() {
    console.log('INTEGRAL Platform loaded successfully!');
    
    // Initialize all functionality
    initNavigation();
    initBabTabs();
    initSmoothScroll();
    initAnimations();
    initFormValidation();
    initMobileMenu();
});

// Navigation Functions
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Highlight active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Bab Tabs Navigation
function initBabTabs() {
    const babTabs = document.querySelectorAll('.bab-tab');
    const babContents = document.querySelectorAll('.bab-content');
    
    babTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const babId = this.getAttribute('data-bab');
            
            // Remove active class from all tabs and contents
            babTabs.forEach(t => t.classList.remove('active'));
            babContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(babId + '-content').classList.add('active');
            
            // Smooth scroll to materi section
            scrollToSection('materi', 1000);
        });
    });
}

// Smooth Scroll Function
function initSmoothScroll() {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Adjust for header height
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll to specific section
function scrollToSection(sectionId, offset = 80) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - offset;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animations
function initAnimations() {
    const animateElements = document.querySelectorAll('.materi-card, .fitur-card, .info-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Form Validation
function initFormValidation() {
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const formValues = Object.fromEntries(formData);
            
            // Basic validation
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = 'red';
                } else {
                    field.style.borderColor = '';
                }
            });
            
            if (isValid) {
                // Simulate form submission
                showNotification('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.', 'success');
                this.reset();
            } else {
                showNotification('Harap lengkapi semua field yang wajib diisi.', 'error');
            }
        });
    }
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navSearch = document.querySelector('.nav-search');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('visible');
            navSearch.classList.toggle('visible');
            
            // Toggle icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('visible')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${getNotificationColor(type)};
        color: white;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || 'fa-info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || '#17a2b8';
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        font-size: 1.2rem;
    }
    
    /* Mobile menu styles */
    @media (max-width: 768px) {
        .nav-menu.visible {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
            padding: 1rem;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .nav-search.visible {
            display: block !important;
            position: absolute;
            top: calc(100% + 200px);
            left: 0;
            right: 0;
            padding: 1rem;
            background: var(--white);
        }
    }
`;
document.head.appendChild(style);

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for global access
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;

// Initialize math symbols animation in hero section
function initMathSymbolsAnimation() {
    const mathSymbols = document.querySelectorAll('.math-symbols i');
    if (mathSymbols.length > 0) {
        mathSymbols.forEach((symbol, index) => {
            symbol.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
        });
        
        // Add float animation
        const floatAnimation = document.createElement('style');
        floatAnimation.textContent = `
            @keyframes float {
                0%, 100% {
                    transform: translateY(0px) rotate(0deg);
                }
                50% {
                    transform: translateY(-10px) rotate(180deg);
                }
            }
        `;
        document.head.appendChild(floatAnimation);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initMathSymbolsAnimation);