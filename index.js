/**
 * Ramseier Verlag - Interactive Features
 * Handles FAQ toggles, form validation, and smooth scrolling
 */

// ─── FAQ Toggle ────────────────────────────────────────────
function toggleFaq(button) {
    const answer = button.nextElementSibling;
    const toggle = button.querySelector('.faq-toggle');
    
    // Close other open FAQs
    document.querySelectorAll('.faq-answer.active').forEach(el => {
        if (el !== answer) {
            el.classList.remove('active');
            el.previousElementSibling.querySelector('.faq-toggle').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    toggle.classList.toggle('active');
}

// ─── Form Validation & Submission ────────────────────────────
function initializeForm() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: form.querySelector('input[placeholder="Max Muster"]').value,
            company: form.querySelector('input[placeholder="Muster AG"]').value,
            email: form.querySelector('input[placeholder="info@musterfirma.ch"]').value,
            phone: form.querySelector('input[placeholder="+41 79 123 45 67"]').value || 'Nicht angegeben',
            abo: form.querySelector('select').value,
            message: form.querySelector('textarea').value || 'Keine Nachricht'
        };
        
        // Validate required fields
        if (!formData.name || !formData.company || !formData.email) {
            showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
            return;
        }
        
        // Validate email
        if (!isValidEmail(formData.email)) {
            showNotification('Bitte geben Sie eine gültige E-Mail-Adresse ein.', 'error');
            return;
        }
        
        // Show success message
        showNotification('✓ Vielen Dank! Wir melden uns innerhalb von 24 Stunden.', 'success');
        
        // Log form data (in production, send to server)
        console.log('Form submitted:', formData);
        
        // Reset form
        form.reset();
    });
}

// ─── Email Validation ────────────────────────────────────────
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ─── Notification System ────────────────────────────────────
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#d42b2b' : type === 'error' ? '#d42b2b' : '#1a1a1a'};
        color: white;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 100;
        animation: slideIn 300ms ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 300ms ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ─── Mobile Menu Toggle ────────────────────────────────────
function initializeMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (!menuToggle) return;
    
    menuToggle.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks.style.display === 'flex') {
            navLinks.style.display = 'none';
        } else {
            navLinks.style.display = 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '64px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.flexDirection = 'column';
            navLinks.style.gap = '0';
            navLinks.style.backgroundColor = 'rgba(247,245,240,0.98)';
            navLinks.style.borderBottom = '1px solid #d9d5cc';
            navLinks.style.padding = '1rem';
        }
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            document.querySelector('.nav-links').style.display = 'none';
        });
    });
}

// ─── Smooth Scroll Behavior ────────────────────────────────
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ─── Scroll Animation for Elements ────────────────────────
function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe feature cards and price cards
    document.querySelectorAll('.feature-card, .price-card, .process-step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
        observer.observe(el);
    });
}

// ─── Button Ripple Effect ────────────────────────────────
function initializeButtonEffects() {
    document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
        button.addEventListener('mousedown', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255,255,255,0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple 600ms ease-out;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// ─── Add CSS Animations ────────────────────────────────────
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes slideOut {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
        
        @keyframes ripple {
            to {
                opacity: 0;
                transform: scale(4);
            }
        }
        
        @media (prefers-reduced-motion: reduce) {
            * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// ─── Initialize All Features ────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    initializeForm();
    initializeMobileMenu();
    initializeSmoothScroll();
    initializeScrollAnimations();
    initializeButtonEffects();
    
    console.log('✓ Ramseier Verlag - All interactive features initialized');
});

// ─── Accessibility: Keyboard Navigation ────────────────────
document.addEventListener('keydown', function(e) {
    // Close mobile menu on Escape
    if (e.key === 'Escape') {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) navLinks.style.display = 'none';
    }
});
