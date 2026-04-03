// 1. Scroll Reveal Animation using IntersectionObserver
const revealElements = document.querySelectorAll('.reveal');

const revealOptions = {
    threshold: 0.15, // Trigger when 15% of the element is visible
    rootMargin: "0px 0px -50px 0px"
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            // Add 'active' class to trigger CSS transition
            entry.target.classList.add('active');
            // Unobserve after revealing to prevent repeating animation
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);

revealElements.forEach(el => {
    revealOnScroll.observe(el);
});

// 2. Custom Cursor Glow Effect
const cursorGlow = document.getElementById('cursor-glow');

document.addEventListener('mousemove', (e) => {
    // Update cursor glow position to follow mouse
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Change glow color when hovering over Fake vs Real cards
const fakeCards = document.querySelectorAll('.fake-card, .btn-fake, .fake-mock');
const realCards = document.querySelectorAll('.real-card, .btn-real, .real-mock');

fakeCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(255, 42, 42, 0.08) 0%, transparent 70%)';
    });
    card.addEventListener('mouseleave', () => {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 70%)';
    });
});

realCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 255, 136, 0.08) 0%, transparent 70%)';
    });
    card.addEventListener('mouseleave', () => {
        cursorGlow.style.background = 'radial-gradient(circle, rgba(0, 243, 255, 0.05) 0%, transparent 70%)';
    });
});

// 3. Optional: Subtle Interaction Sound (Synthesized to avoid external assets)
const playClickSound = () => {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(300, audioCtx.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        
        oscillator.start();
        oscillator.stop(audioCtx.currentTime + 0.1);
    } catch (e) {
        // Audio context might be blocked by browser policy until user interacts, fail silently
    }
};

// Attach sound to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', playClickSound);
});