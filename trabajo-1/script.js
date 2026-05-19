// --- 1. LÓGICA DEL CURSOR ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });
});

const clickables = document.querySelectorAll('a, button, input, textarea, .listado-imagenes img, .profile-img, .rrss-link');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('cursor-hover-dot'); outline.classList.add('cursor-hover-outline'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('cursor-hover-dot'); outline.classList.remove('cursor-hover-outline'); });
});

// --- 2. MENÚ MÓVIL ---
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.cabecera-menu a');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navMenu.classList.toggle('is-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('is-active');
        navMenu.classList.remove('is-open');
    });
});

// --- 3. MODO OSCURO ---
const themeBtn = document.getElementById('theme-btn');
const htmlElement = document.documentElement;

themeBtn.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    htmlElement.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'light' ? '🌑' : '☀️';
});

// --- 4. REVEAL SCROLL ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-active');
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
});
