// TechShala Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initStickyNavbar();
    initSmoothScrolling();
    initContactForm();
    initScrollReveal();
    initDemoButtons();
    initModal();
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking on a nav link
        const navLinkItems = navLinks.querySelectorAll('.nav-link');
        navLinkItems.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Sticky Navbar Functionality
function initStickyNavbar() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Contact Form Functionality
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const institution = formData.get('institution');
            const message = formData.get('message');
            
            // Basic validation
            if (!name || !email || !message) {
                showModal('Please fill in all required fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showModal('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate API call delay
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Show success message
                showModal(`Thank you, ${name}! Your message has been sent successfully. We'll get back to you soon.`, 'success');
                
                // Track form submission (analytics would go here)
                console.log('Form submitted:', { name, email, institution, message });
            }, 2000);
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Demo Button Functionality - Fixed to handle all demo buttons
function initDemoButtons() {
    // Function to scroll to contact form
    function scrollToContact() {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = contactSection.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Focus on the name input after scrolling
            setTimeout(() => {
                const nameInput = document.getElementById('name');
                if (nameInput) {
                    nameInput.focus();
                }
            }, 800);
        }
    }

    // Handle all demo buttons - navigation demo button, hero demo button, and CTA button
    const allDemoButtons = document.querySelectorAll('.demo-btn, .cta-button');
    allDemoButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToContact();
            trackEvent('demo_button_clicked', { 
                location: button.classList.contains('demo-btn') ? 'navigation' : 'cta_section'
            });
        });
    });

    // Handle hero section demo buttons specifically
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        if (button.textContent.includes('Book a Demo')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                scrollToContact();
                trackEvent('demo_button_clicked', { location: 'hero' });
            });
        }
    });

    // Handle "Learn More" button
    const learnMoreButtons = document.querySelectorAll('.btn--outline');
    learnMoreButtons.forEach(button => {
        if (button.textContent.includes('Learn More')) {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const navbarHeight = document.getElementById('navbar').offsetHeight;
                    const targetPosition = aboutSection.offsetTop - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    trackEvent('learn_more_clicked', { location: 'hero' });
                }
            });
        }
    });
}

// Modal Functionality
function initModal() {
    const modal = document.getElementById('messageModal');
    const modalClose = document.querySelector('.modal-close');
    
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideModal();
        });
    }
    
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            hideModal();
        }
    });
}

// Show Modal
function showModal(message, type = 'info') {
    const modal = document.getElementById('messageModal');
    const modalMessage = document.getElementById('modalMessage');
    
    if (modal && modalMessage) {
        // Set message content
        modalMessage.innerHTML = `
            <div class="status status--${type === 'error' ? 'error' : type === 'success' ? 'success' : 'info'}">
                ${message}
            </div>
        `;
        
        // Show modal
        modal.classList.remove('hidden');
        
        // Auto-hide success messages after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                hideModal();
            }, 5000);
        }
    }
}

// Hide Modal
function hideModal() {
    const modal = document.getElementById('messageModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Scroll Reveal Animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Add fade-in class to elements and observe them
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card, .process-step, .about-card');
    animateElements.forEach((element, index) => {
        element.classList.add('fade-in');
        element.style.transitionDelay = `${index * 100}ms`;
        observer.observe(element);
    });
}

// Utility Functions

// Debounce function for performance optimization
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

// Throttle function for scroll events
function throttle(func, limit) {
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
}

// Enhanced scroll handling with throttling
window.addEventListener('scroll', throttle(function() {
    // Update navbar state
    const navbar = document.getElementById('navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
}, 100));

// Handle form input focus effects
document.addEventListener('focus', function(e) {
    if (e.target.classList.contains('form-control')) {
        e.target.parentNode.classList.add('focused');
    }
}, true);

document.addEventListener('blur', function(e) {
    if (e.target.classList.contains('form-control')) {
        e.target.parentNode.classList.remove('focused');
        
        // Add validation styling
        if (e.target.hasAttribute('required') && !e.target.value.trim()) {
            e.target.classList.add('error');
        } else {
            e.target.classList.remove('error');
        }
    }
}, true);

// Handle input changes for real-time validation
document.addEventListener('input', function(e) {
    if (e.target.classList.contains('form-control')) {
        // Remove error class when user starts typing
        e.target.classList.remove('error');
        
        // Email validation for email inputs
        if (e.target.type === 'email' && e.target.value) {
            if (!isValidEmail(e.target.value)) {
                e.target.classList.add('error');
            } else {
                e.target.classList.remove('error');
            }
        }
    }
});

// Enhanced button interactions
document.addEventListener('mouseenter', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('feature-card')) {
        e.target.style.transform = 'translateY(-2px)';
    }
}, true);

document.addEventListener('mouseleave', function(e) {
    if (e.target.classList.contains('btn') || e.target.classList.contains('feature-card')) {
        e.target.style.transform = 'translateY(0)';
    }
}, true);

// Performance optimization: Preload critical images
function preloadImages() {
    const imageUrls = [
        // Add any image URLs that need to be preloaded
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // Here you would integrate with your analytics service
    // Example: gtag('event', eventName, properties);
}

// Track important user interactions
document.addEventListener('click', function(e) {
    // Track all demo button clicks with better targeting
    if (e.target.classList.contains('demo-btn') || 
        e.target.classList.contains('cta-button') ||
        (e.target.classList.contains('btn') && e.target.textContent.includes('Book a Demo'))) {
        
        let location = 'unknown';
        if (e.target.classList.contains('demo-btn')) {
            location = 'navigation';
        } else if (e.target.classList.contains('cta-button')) {
            location = 'cta_section';
        } else if (e.target.closest('.hero-buttons')) {
            location = 'hero';
        }
        
        trackEvent('demo_button_clicked', { location: location });
    }
    
    if (e.target.type === 'submit') {
        trackEvent('form_submitted', { form_type: 'contact' });
    }
});

// Handle page visibility changes for analytics
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'hidden') {
        trackEvent('page_hidden');
    } else {
        trackEvent('page_visible');
    }
});

// Track time spent on page
let pageLoadTime = Date.now();
window.addEventListener('beforeunload', function() {
    const timeSpent = Math.round((Date.now() - pageLoadTime) / 1000);
    trackEvent('time_on_page', { seconds: timeSpent });
});

// Console message for developers
console.log('🎓 TechShala Landing Page Loaded Successfully!');
console.log('Built with modern web technologies for optimal performance and user experience.');
console.log('For technical support, contact: info@techshala.edu');
