// --- 1. LÓGICA DEL CURSOR ---
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');
let mouseTimeout;

// Asegurar transiciones suaves de opacidad desde JS para no tocar el CSS
if (dot && outline) {
    dot.style.transition = 'opacity 0.3s ease, transform 0.2s ease, width 0.2s ease, height 0.2s ease';
    outline.style.transition = 'opacity 0.3s ease, transform 0.2s ease, width 0.2s ease, height 0.2s ease';
}

const ocultarCursorPersonalizado = () => {
    if (dot && outline) {
        dot.style.opacity = '0';
        outline.style.opacity = '0';
    }
};

const mostrarCursorPersonalizado = () => {
    if (dot && outline) {
        dot.style.opacity = '1';
        outline.style.opacity = '1';
    }
};

// Detectar cuándo el cursor sale completamente fuera de la ventana del navegador
document.addEventListener('mouseleave', () => {
    ocultarCursorPersonalizado();
});

window.addEventListener('mousemove', (e) => {
    // Volver a mostrar el cursor cuando se mueve dentro de la página
    mostrarCursorPersonalizado();

    // Limpiamos el temporizador previo cada vez que el ratón se mueve para que siga visible
    clearTimeout(mouseTimeout);

    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    outline.animate({ left: `${e.clientX}px`, top: `${e.clientY}px` }, { duration: 500, fill: "forwards" });

    // NUEVO TEMPORIZADOR: Si el ratón deja de moverse durante 1.5 segundos, se ocultan
    mouseTimeout = setTimeout(() => {
        ocultarCursorPersonalizado();
    }, 1500);
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

// --- 5. LÓGICA DE AMPLIACIÓN DE PORFOLIO (CON NAVEGACIÓN DIRECCIONAL) ---
const modal = document.getElementById('portfolio-modal');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');
const modalPrev = document.getElementById('modal-prev');
const modalNext = document.getElementById('modal-next');
const portfolioImages = document.querySelectorAll('.listado-imagenes img');
let currentImgIndex = 0;

const updateModalImage = (index) => {
    if (index >= 0 && index < portfolioImages.length) {
        currentImgIndex = index;
        modalImg.src = portfolioImages[currentImgIndex].src;
        modalImg.alt = portfolioImages[currentImgIndex].alt;
    }
};

portfolioImages.forEach((img, index) => {
    img.addEventListener('click', () => {
        updateModalImage(index);
        modal.classList.add('is-active');
        document.body.style.overflow = 'hidden';
    });
});

const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
    setTimeout(() => { modalImg.src = ''; }, 300);
};

modalClose.addEventListener('click', closeModal);
modalPrev.addEventListener('click', (e) => {
    e.stopPropagation();
    let prevIndex = currentImgIndex - 1;
    if (prevIndex < 0) prevIndex = portfolioImages.length - 1;
    updateModalImage(prevIndex);
});

modalNext.addEventListener('click', (e) => {
    e.stopPropagation();
    let nextIndex = currentImgIndex + 1;
    if (nextIndex >= portfolioImages.length) nextIndex = 0;
    updateModalImage(nextIndex);
});

modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target === modalImg) {
        closeModal();
    }
});

// Vincular los nuevos controles dinámicos al hover del cursor personalizado
const modalControls = [modalClose, modalPrev, modalNext];
modalControls.forEach(control => {
    if (dot && outline) {
        control.addEventListener('mouseenter', () => { 
            dot.classList.add('cursor-hover-dot'); 
            outline.classList.add('cursor-hover-outline'); 
        });
        control.addEventListener('mouseleave', () => { 
            dot.classList.remove('cursor-hover-dot'); 
            outline.classList.remove('cursor-hover-outline'); 
        });
    }
});
