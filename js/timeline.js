document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('image-toggle-area');
    const btn = document.getElementById('js-cursor-btn');
    const img = document.getElementById('main-process-img');
    const steps = document.querySelectorAll('.p-step-item');

    const images = [
        "csm_AdobeStock_1194407041_03284bb3ae.webp",
        "PV-Anlagen-Planung.jpg",
        "67f7a54070d82a04a3f03e48_monteur-auf-dach.webp"
    ];
    let currentIndex = 0;

    // 1. Cursor-Verfolgung (Millisekundengenau)
    const moveCursor = (e) => {
        const rect = area.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Nutzt Hardware-Beschleunigung
        requestAnimationFrame(() => {
            btn.style.left = `${x}px`;
            btn.style.top = `${y}px`;
        });
    };

    area.addEventListener('mousemove', moveCursor);
    area.addEventListener('mouseenter', moveCursor);

    // 2. Synchronisierter Wechsel
    area.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;

        // Bild-Update
        img.style.opacity = '0';
        setTimeout(() => {
            img.src = images[currentIndex];
            img.style.opacity = '1';
        }, 200);

        // Timeline-Update
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentIndex);
        });
    });
});
area.addEventListener('click', () => {
    // Klasse für den Effekt hinzufügen
    img.classList.add('is-switching');

    setTimeout(() => {
        currentIndex = (currentIndex + 1) % images.length;
        img.src = images[currentIndex];

        // Wenn das neue Bild bereit ist, Effekt wieder aufheben
        img.onload = () => {
            img.classList.remove('is-switching');
        };
    }, 300);

});
