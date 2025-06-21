// Global animations and effects
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page animations
    initializePageAnimations();
    
    // Add interactive effects
    addInteractiveEffects();
    
    // Handle theme-specific animations
    handleThemeAnimations();
});

function initializePageAnimations() {
    // Fade in page content
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Animate cards on load
    const cards = document.querySelectorAll('.mysterious-card, .celebratory-card');
    cards.forEach((card, index) => {
        card.style.transform = 'translateY(30px)';
        card.style.opacity = '0';
        card.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            card.style.transform = 'translateY(0)';
            card.style.opacity = '1';
        }, 200 + (index * 100));
    });
}

function addInteractiveEffects() {
    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.mysterious-btn, .celebratory-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-2px) scale(1.02)';
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', createRipple);
    });
    
    // Add form field focus animations
    const inputs = document.querySelectorAll('.mysterious-input, .celebratory-input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('input-focused');
        });
    });
}

function createRipple(event) {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

function handleThemeAnimations() {
    // Mysterious theme animations
    if (document.body.classList.contains('mysterious-theme')) {
        // Add floating particles
        createMysteriousParticles();
        
        // Add periodic glow effects
        setInterval(addRandomGlow, 3000);
    }
    
    // Celebratory theme animations
    if (document.body.classList.contains('celebratory-theme')) {
        // Celebration animations are handled in the template
        // Add any additional effects here
        animateGiftVoucher();
    }
}

function createMysteriousParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < 20; i++) {
        createParticle(particleContainer);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(212, 175, 55, 0.6);
        border-radius: 50%;
        animation: float ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}%;
        animation-delay: ${Math.random() * 5}s;
    `;
    
    container.appendChild(particle);
    
    // Remove and recreate particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
            createParticle(container);
        }
    }, (5 + Math.random() * 10) * 1000);
}

function addRandomGlow() {
    const glowElements = document.querySelectorAll('.mysterious-icon, .mysterious-title');
    if (glowElements.length > 0) {
        const randomElement = glowElements[Math.floor(Math.random() * glowElements.length)];
        randomElement.style.filter = 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.9))';
        
        setTimeout(() => {
            randomElement.style.filter = '';
        }, 1000);
    }
}

function animateGiftVoucher() {
    const voucher = document.querySelector('.gift-voucher');
    if (voucher) {
        // Add shimmer effect
        const shimmer = document.createElement('div');
        shimmer.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            animation: shimmer-pass 3s ease-in-out infinite;
            pointer-events: none;
        `;
        voucher.style.position = 'relative';
        voucher.appendChild(shimmer);
    }
}

// Add CSS animations
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); opacity: 0.6; }
        50% { transform: translateY(-20px); opacity: 1; }
    }
    
    @keyframes shimmer-pass {
        0% { left: -100%; }
        100% { left: 100%; }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .input-focused {
        transform: translateY(-2px);
        transition: transform 0.2s ease;
    }
    
    /* Page transition effects */
    .page-transition {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease-out;
    }
    
    .page-transition.loaded {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(animationStyles);

// Handle page transitions
window.addEventListener('beforeunload', function() {
    document.body.style.opacity = '0';
});

// Smooth scroll for any anchor links
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

// Add loading states for form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function() {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton && !submitButton.disabled) {
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i data-feather="loader" class="me-2"></i>Processing...';
            submitButton.disabled = true;
            feather.replace();
            
            // Reset after 10 seconds as fallback
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                feather.replace();
            }, 10000);
        }
    });
});
