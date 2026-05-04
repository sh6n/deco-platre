// --- Before/After Slider Logic ---
const container = document.getElementById('compare-wrapper');
const overlay = document.getElementById('overlay');
const handle = document.getElementById('handle');

function moveSlider(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const x = clientX - rect.left;
    const position = Math.max(0, Math.min(x, rect.width));
    const percentage = (position / rect.width) * 100;

    overlay.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    handle.style.left = `${percentage}%`;
}

if(container) {
    container.addEventListener('mousemove', moveSlider);
    container.addEventListener('touchmove', moveSlider);
}

// --- Animations ---
AOS.init({
    duration: 800,
    once: true,
    offset: 50,
});

gsap.registerPlugin(ScrollTrigger);

const texts = document.querySelectorAll('.reveal-text');
texts.forEach((text, i) => {
    gsap.fromTo(text, 
        { y: '100%' },
        { y: '0%', duration: 1, ease: "power4.out", delay: 0.2 + (i * 0.1) }
    );
});

gsap.to(".fade-in-up", {
    opacity: 1, y: 0, duration: 1, stagger: 0.2, delay: 0.8, ease: "power2.out"
});