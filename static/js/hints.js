// Hints page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeHints();
});

function initializeHints() {
    const hintCards = document.querySelectorAll('.hint-card');
    
    hintCards.forEach(card => {
        card.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // Add sound effect (optional)
            if (this.classList.contains('flipped')) {
                // Card is now revealed
                this.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
            } else {
                // Card is now hidden
                this.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(-5px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('flipped')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Add staggered animation on page load
    hintCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + (index * 50));
    });
}

// Optional: Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Hide all revealed cards
        const flippedCards = document.querySelectorAll('.hint-card.flipped');
        flippedCards.forEach(card => {
            card.classList.remove('flipped');
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
        });
    }
});

// Optional: Add reveal all functionality
function revealAllHints() {
    const allCards = document.querySelectorAll('.hint-card');
    allCards.forEach(card => {
        if (!card.classList.contains('flipped')) {
            card.classList.add('flipped');
            card.querySelector('.card-inner').style.transform = 'rotateY(180deg)';
        }
    });
}

function hideAllHints() {
    const allCards = document.querySelectorAll('.hint-card');
    allCards.forEach(card => {
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
            card.querySelector('.card-inner').style.transform = 'rotateY(0deg)';
        }
    });
}