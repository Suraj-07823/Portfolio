/* ============================================
   INTERACTIVE EFFECTS
   ============================================
   - Skill tag random color glow on hover
   - 3D tilt effect on stat cards
   - Contact form submit handler
   ============================================ */

/* Skill tags glow a random neon color on hover */
function initSkillTagEffects() {
    const tags = document.querySelectorAll('.skill-tag');
    tags.forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            const colors = ['#00f0ff', '#3b82f6', '#8b5cf6', '#00ff88', '#f472b6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            tag.style.borderColor = color;
            tag.style.color = color;
            tag.style.boxShadow = `0 0 15px ${color}33`;
        });
        tag.addEventListener('mouseleave', () => {
            tag.style.borderColor = '';
            tag.style.color = '';
            tag.style.boxShadow = '';
        });
    });
}

/* 3D tilt effect on [data-tilt] elements */
function initTiltEffect() {
    const cards = document.querySelectorAll('[data-tilt]');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

/* Contact form submission with animated feedback */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('.btn');
        const originalText = btn.querySelector('.btn-text').textContent;

        btn.querySelector('.btn-text').textContent = 'Sending...';
        btn.style.pointerEvents = 'none';

        setTimeout(() => {
            btn.querySelector('.btn-text').textContent = 'Message Sent! ✓';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #22c55e)';
            setTimeout(() => {
                btn.querySelector('.btn-text').textContent = originalText;
                btn.style.background = '';
                btn.style.pointerEvents = '';
                form.reset();
            }, 2500);
        }, 1500);
    });
}
