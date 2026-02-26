const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = target / 100; // Geschwindigkeit anpassen

        if (count < target) {
            stat.innerText = Math.ceil(count + speed);
            setTimeout(animateStats, 30);
        } else {
            stat.innerText = target;
        }
    });
};

// Trigger (einfach gehalten, besser mit IntersectionObserver)
window.addEventListener('scroll', () => {
    const sectionPos = document.querySelector('.stats-section').getBoundingClientRect().top;
    if (sectionPos < window.innerHeight) {
        animateStats();
    }
}, { once: true });