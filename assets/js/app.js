// --- Fonction pour la logique du menu Hamburger ---
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (!burger) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
    });
}

// --- Fonction pour charger les composants HTML (header, footer) ---
const loadComponent = (selector, url) => {
    // On n ajoute "return" pour que la fonction renvoie la promesse
    return fetch(url)
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

// --- Fonction pour l'Easter Egg ---
const easterEgg = () => {
    const trigger = document.getElementById('easter-egg-trigger');
    if (trigger) {
        trigger.addEventListener('click', () => {
            window.open('easter-egg.html', '_blank');
        });
    }
};

// --- Point d'entrée principal ---
document.addEventListener('DOMContentLoaded', async () => {
    // Grace au "return", await va maintenant correctement attendre la fin du chargement
    await loadComponent('#header-placeholder', '_includes/_header.html');
    
    // On charge le footer (pas besoin d'attendre la fin de celui-ci)
    await loadComponent('#footer-placeholder', '_includes/_footer.html');

    // Cette fonction ne sera appelée que lorsque le header sera bien présent dans la page
    navSlide();
    easterEgg();
});