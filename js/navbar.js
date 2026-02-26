// Navbar & Links
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('#navbar .navbarcontent ul li a');
const navUl = document.querySelector('#navbar .navbarcontent ul');
const navbarAddition = document.querySelector('.navbaraddition');
const hamburger = document.getElementById("hamburger");

hamburger.addEventListener("click", () => {
  navUl.classList.toggle("active");
  hamburger.classList.toggle("active"); // ← wichtig
});

// Boxen selektieren
const boxes = {
 "Home": document.querySelector('.forHome'),
  "Leistungen": document.querySelector('.forLeistungen'),
  "Über-Uns": document.querySelector('.forUeberUns'),
  "Kontakt": document.querySelector('.forKontakt'),
  "Impressum": document.querySelector('.forImpressum')
};

// Funktion: Alle Boxen deaktivieren
function hideAllBoxes() {
  Object.values(boxes).forEach(box => box.classList.remove('active'));
}

// Funktion: Addition einblenden & passende Box aktivieren
function showBox(linkName) {
  hideAllBoxes();
  const box = boxes[linkName];
  if(box){
    box.classList.add('active');
    navbarAddition.classList.add('active'); // fährt die gesamte Addition aus
  }
}

// Funktion: Addition ausblenden
function hideAddition() {
  navbarAddition.classList.remove('active');
  hideAllBoxes();
}

// Hover & Fokus → passende Box anzeigen
navLinks.forEach(link => {
  const linkName = link.textContent.trim();

  link.addEventListener('mouseenter', () => {
    showBox(linkName);
  });

  link.addEventListener('focus', () => { // Tastatur-Fokus
    showBox(linkName);
  });
});

// Maus oder Fokus verlässt Navbar oder Addition → alles ausblenden
function checkLeave(e) {
  const isInsideNavbar = navbar.contains(e.relatedTarget);
  const isInsideAddition = navbarAddition.contains(e.relatedTarget);

  if(!isInsideNavbar && !isInsideAddition){
    hideAddition();
  }
}

navbarAddition.addEventListener('mouseleave', checkLeave);
navbar.addEventListener('mouseleave', checkLeave);

document.addEventListener('focusin', (e) => {
  const isInsideNavbar = navbar.contains(e.target);
  const isInsideAddition = navbarAddition.contains(e.target);

  if(!isInsideNavbar && !isInsideAddition){
    hideAddition();
  }
});

// Fenster verliert Fokus → ausblenden
window.addEventListener('blur', hideAddition);

// ... (Dein bisheriger Code oben bleibt gleich)

// Mobile & Desktop: Menü nach Klick auf Link schließen
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    // 1. Die Boxen/Addition sofort ausblenden
    hideAddition();

    // 2. Mobile Menü (Hamburger) schließen, falls offen
    navUl.classList.remove("active");
    hamburger.classList.remove("active");

    // Optional: Falls der Link nur ein Anker ist (#), 
    // kann man hier das Standardverhalten beeinflussen oder 
    // sicherstellen, dass das Overlay nicht hängen bleibt.
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      // Schließt das Menü sofort, bevor der Sprung passiert
      hideAllBoxes();
    }
  });
});

// Fenster verliert Fokus → ausblenden
window.addEventListener('blur', hideAddition);

// ... (Rest deines Codes)