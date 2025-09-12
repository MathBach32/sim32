// --- Fonction pour la logique du menu Hamburger ---
const navSlide = () => {
    // On sélectionne les éléments DANS le header qui a été chargé
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // S'il n'y a pas de burger sur la page, on ne fait rien.
    if (!burger) return;

    burger.addEventListener('click', () => {
        // Fait apparaître/disparaître le menu
        nav.classList.toggle('nav-active');

        // Animation des liens
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animation du hamburger en croix
        burger.classList.toggle('toggle');
    });
}

// --- Fonction pour charger les composants HTML (header, footer) ---
const loadComponent = (selector, url) => {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur de chargement de ${url}`);
            }
            return response.text();
        })
        .then(data => {
            document.querySelector(selector).innerHTML = data;
        })
        .catch(error => console.error(error));
};

// --- Point d'entrée principal ---
// Attend que le contenu de la page soit chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', async () => {
    // On charge le header, ET ON ATTEND qu'il soit fini de charger
    await loadComponent('#header-placeholder', '_includes/_header.html');
    
    // On charge le footer
    loadComponent('#footer-placeholder', '_includes/_footer.html');

    // SEULEMENT MAINTENANT qu'on est sûr que le header est là, on lance la logique du menu
    navSlide();
});