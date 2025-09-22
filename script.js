// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    setupNavbarScroll();
    setupSmoothScrolling();
    setupScrollProgress();
    setupBackToTop();
    setupAnimations();
    setupNewsletterForm();
    setupMobileMenu();
    setupHeroParallax();
}

// Navbar scroll effect
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class based on scroll position
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
                }
            }
        });
    });
    
    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                window.scrollTo({
                    top: aboutSection.offsetTop - navbarHeight,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Scroll progress indicator
function setupScrollProgress() {
    // Create progress bar element
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        progressBar.style.width = scrollPercent + '%';
    });
}

// Back to top button
function setupBackToTop() {
    // Create back to top button
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Special animations for specific elements
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('service-card')) {
                    animateCards(entry.target.parentElement);
                }
                
                if (entry.target.classList.contains('collection-card')) {
                    animateCollectionCards(entry.target.parentElement);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .service-card, .collection-card, .section-title, .section-subtitle');
    animatedElements.forEach(el => observer.observe(el));
}

// Animate cards with stagger effect
function animateCards(container) {
    const cards = container.querySelectorAll('.feature-card, .service-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Animate collection cards
function animateCollectionCards(container) {
    const cards = container.querySelectorAll('.collection-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

// Newsletter form handling
function setupNewsletterForm() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            
            // Basic email validation
            if (!isValidEmail(emailInput.value)) {
                showNotification('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate form submission
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : 'success'} notification`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 1050;
        min-width: 300px;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Mobile menu enhancements
function setupMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            // Add animation class to navbar collapse
            navbarCollapse.classList.toggle('show');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            const isClickInsideNav = navbarCollapse.contains(e.target) || 
                                   navbarToggler.contains(e.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
            }
        });
    }
}

// Hero parallax effect
function setupHeroParallax() {
    const heroSection = document.querySelector('.hero-section');
    const heroBackground = document.querySelector('.hero-background');
    
    if (heroSection && heroBackground) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            // Only apply parallax if hero is visible
            if (scrolled < heroSection.offsetHeight) {
                heroBackground.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
}

// Collection card interactions
function setupCollectionCards() {
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize collection cards when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupCollectionCards();
});

// Lazy loading for images (if you add images later)
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Performance optimization - debounce scroll events
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Any scroll-based animations or effects can go here
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate any size-dependent elements
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && window.innerWidth < 768) {
        heroSection.style.height = '80vh';
    } else if (heroSection) {
        heroSection.style.height = '100vh';
    }
}, 250));

// Initialize animations for elements already in view
window.addEventListener('load', function() {
    const elementsInView = document.querySelectorAll('.feature-card, .service-card');
    elementsInView.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            element.classList.add('fade-in');
        }
    });
});

// Add smooth reveal animation for page load
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && typeof callback === 'function') {
        callback(element);
    }
}

// Accessibility enhancements
function setupAccessibility() {
    // Add keyboard navigation for custom elements
    const focusableElements = document.querySelectorAll('.collection-card, .feature-card, .service-card');
    
    focusableElements.forEach(element => {
        element.setAttribute('tabindex', '0');
        
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Announce page changes to screen readers
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionName = entry.target.id.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                // Announce section change (optional)
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', function() {
    setupAccessibility();
});

// Console message for developers
console.log('%c🏡 Luxe Living Website', 'font-size: 20px; color: #6B4E3D; font-weight: bold;');

console.log('%cBuilt with modern web technologies for optimal performance and user experience.', 'color: #8B6F47;');
// Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    setupContactForm();
    setupFormValidation();
});

// Initialize contact form
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add real-time validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearValidation);
        });
    }
}

// Handle form submission
async function handleFormSubmission(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const formData = new FormData(form);
    
    // Validate all fields
    if (!validateForm(form)) {
        return;
    }
    
    // Show loading state
    showLoadingState(submitBtn);
    
    try {
        // Prepare email data
        const emailData = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            project: formData.get('project')
        };
        
        // Send email using EmailJS or your preferred service
        await sendContactEmail(emailData);
        
        // Show success message
        showSuccessMessage(form);
        
        // Reset form
        form.reset();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showErrorMessage(form, 'Sorry, there was an error sending your message. Please try again or contact us directly.');
    } finally {
        hideLoadingState(submitBtn);
    }
}

// Send email using EmailJS (you'll need to set this up)
async function sendContactEmail(data) {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: data.email,
            name: `${data.firstName} ${data.lastName}`,
            phone: data.phone,
            message: `New consultation request from ${data.firstName} ${data.lastName}\n\nEmail: ${data.email}\nPhone: ${data.phone}\n\nProject Details:\n${data.project}`,
            _replyto: data.email,
            _subject: 'New Consultation Request - Luxe Living'
        })
    });
    
    if (!response.ok) {
        throw new Error('Failed to send email');
    }
    
    return response.json();
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;
    let isValid = true;
    let message = '';
    
    // Remove existing validation classes
    field.classList.remove('is-valid', 'is-invalid');
    removeValidationMessage(field);
    
    // Check if required field is empty
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required.';
    }
    // Email validation
    else if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address.';
        }
    }
    // Phone validation (Indian standard)
    else if (fieldType === 'tel' && value) {
        const phoneRegex = /^(\+91[\-\s]?|91[\-\s]?|0)?[6-9]\d{9}$/;
        const cleanPhone = value.replace(/[\s\-\(\)]/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            isValid = false;
            message = 'Please enter a valid Indian phone number.';
        }
    }
    // Name validation
    else if ((field.name === 'firstName' || field.name === 'lastName') && value) {
        if (value.length < 2) {
            isValid = false;
            message = 'Name must be at least 2 characters long.';
        }
    }
    // Project description validation
    else if (field.name === 'project' && value) {
        if (value.length < 10) {
            isValid = false;
            message = 'Please provide more details about your project.';
        }
    }
    
    // Apply validation classes and messages
    if (isValid && value) {
        field.classList.add('is-valid');
    } else if (!isValid) {
        field.classList.add('is-invalid');
        showValidationMessage(field, message);
    }
    
    return isValid;
}

// Clear validation on input
function clearValidation(e) {
    const field = e.target;
    field.classList.remove('is-valid', 'is-invalid');
    removeValidationMessage(field);
}

// Show validation message
function showValidationMessage(field, message) {
    removeValidationMessage(field); // Remove any existing message
    
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = message;
    
    field.parentNode.appendChild(feedback);
}

// Remove validation message
function removeValidationMessage(field) {
    const existingFeedback = field.parentNode.querySelector('.invalid-feedback, .valid-feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }
}

// Show loading state
function showLoadingState(button) {
    button.classList.add('loading');
    button.disabled = true;
    button.setAttribute('data-original-text', button.textContent);
    button.textContent = 'Sending...';
}

// Hide loading state
function hideLoadingState(button) {
    button.classList.remove('loading');
    button.disabled = false;
    button.textContent = button.getAttribute('data-original-text') || 'Schedule Free Consultation';
}

// Show success message
function showSuccessMessage(form) {
    removeFormMessages(form);
    
    const successDiv = document.createElement('div');
    successDiv.className = 'form-success-message';
    successDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Thank you!</strong> Your consultation request has been sent successfully. 
        We'll contact you within 24 hours to schedule your free consultation.
    `;
    
    form.insertBefore(successDiv, form.firstChild);
    
    // Scroll to success message
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.remove();
        }
    }, 10000);
}

// Show error message
function showErrorMessage(form, message) {
    removeFormMessages(form);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error-message';
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-triangle me-2"></i>
        <strong>Error:</strong> ${message}
    `;
    
    form.insertBefore(errorDiv, form.firstChild);
    
    // Scroll to error message
    errorDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Remove form messages
function removeFormMessages(form) {
    const messages = form.querySelectorAll('.form-success-message, .form-error-message');
    messages.forEach(msg => msg.remove());
}

// Setup form validation with better UX
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    // Add character counter for project description
    const projectTextarea = document.getElementById('project');
    if (projectTextarea) {
        addCharacterCounter(projectTextarea);
    }
    
    // Add input formatting for Indian numbers
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', formatIndianPhoneNumber);
    }
}

// Add character counter
function addCharacterCounter(textarea) {
    const counter = document.createElement('small');
    counter.className = 'form-text text-muted text-end';
    counter.style.display = 'block';
    
    const updateCounter = () => {
        const length = textarea.value.length;
        const minLength = 10;
        counter.textContent = `${length}/500 characters`;
        
        if (length < minLength) {
            counter.textContent += ` (minimum ${minLength} characters)`;
            counter.className = 'form-text text-warning text-end';
        } else {
            counter.className = 'form-text text-muted text-end';
        }
    };
    
    textarea.addEventListener('input', updateCounter);
    textarea.parentNode.appendChild(counter);
    updateCounter();
}

// Format Indian phone number
function formatIndianPhoneNumber(e) {
    const input = e.target;
    const value = input.value.replace(/\D/g, '');
    let formattedValue = value;
    
    if (value.startsWith("91") && value.length > 2) {
        formattedValue = `+91 ${value.slice(2, 7)}-${value.slice(7, 12)}`;
    } else if (value.length === 10) {
        formattedValue = `${value.slice(0, 5)}-${value.slice(5, 10)}`;
    }
    
    input.value = formattedValue;
}

console.log('📧 Contact form initialized with Indian phone validation');
