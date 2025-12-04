// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== REVEAL ON SCROLL =====
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all reveal elements
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    // ===== FLOATING ELEMENTS CREATION =====
    function createFloatingElements() {
        const container = document.createElement('div');
        container.className = 'floating-elements';
        
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            container.appendChild(element);
        }
        
        document.body.appendChild(container);
    }
    createFloatingElements();

    // ===== IMAGE HOVER EFFECTS =====
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Add loading animation
        img.addEventListener('load', function() {
            this.style.animationDelay = `${Math.random() * 0.5}s`;
            this.classList.add('loaded');
        });

        // Add parallax effect on mouse move
        img.addEventListener('mousemove', function(e) {
            const { left, top, width, height } = this.getBoundingClientRect();
            const x = (e.clientX - left) / width - 0.5;
            const y = (e.clientY - top) / height - 0.5;
            
            this.style.transform = `
                perspective(1000px) 
                rotateX(${y * 5}deg) 
                rotateY(${x * 5}deg) 
                scale3d(1.05, 1.05, 1.05)
            `;
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ===== STAGGERED ANIMATION FOR PILLS =====
    const pills = document.querySelectorAll('.pill');
    pills.forEach((pill, index) => {
        pill.style.setProperty('--i', index);
        pill.style.animationDelay = `${index * 0.1}s`;
    });

    // ===== STAGGERED ANIMATION FOR MERRY LETTERS =====
    const merryLetters = document.querySelectorAll('.merry-animation span');
    merryLetters.forEach((letter, index) => {
        letter.style.setProperty('--i', index);
    });

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== BUTTON CLICK EFFECT =====
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: rippleAnimation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => ripple.remove(), 600);
            
            // Trigger confetti effect
            createConfetti();
        });
    });

    // ===== CONFETTI EFFECT =====
    function createConfetti() {
        const colors = ['#7dd3fc', '#c7a9ff', '#ffd6a5', '#ff6b6b', '#51cf66'];
        const container = document.createElement('div');
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
        `;
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const startX = Math.random() * window.innerWidth;
            const duration = Math.random() * 1 + 0.5;
            
            confetti.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                top: -20px;
                left: ${startX}px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                animation: fall ${duration}s linear forwards;
                opacity: ${Math.random() * 0.5 + 0.5};
            `;
            
            confetti.style.setProperty('--rotation', `${Math.random() * 360}deg`);
            confetti.style.setProperty('--endX', `${(Math.random() - 0.5) * 200}px`);
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), duration * 1000);
        }
        
        document.body.appendChild(container);
        setTimeout(() => container.remove(), 1500);
    }

    // Add confetti animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleAnimation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes fall {
            to {
                transform: translateY(100vh) translateX(var(--endX)) rotate(var(--rotation));
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== TYPING EFFECT FOR HERO =====
    function typeWriterEffect() {
        const title = document.querySelector('.title');
        const originalText = title.textContent;
        title.textContent = '';
        
        let i = 0;
        function type() {
            if (i < originalText.length) {
                title.textContent += originalText.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }
        
        // Start typing after a delay
        setTimeout(type, 500);
    }
    
    // Uncomment to enable typing effect
    // typeWriterEffect();

    // ===== PARALLAX EFFECT FOR HERO =====
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });

    // ===== INITIAL ANIMATION =====
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Set initial body opacity to 0 for fade-in
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.8s ease';