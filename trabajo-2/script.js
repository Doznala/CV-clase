document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del Panel y Títulos
    const toggleBtn = document.getElementById('toggle-btn');
    const panel = document.getElementById('control-panel');
    const tInput = document.getElementById('t-input');
    const sInput = document.getElementById('s-input');
    const mainTitle = document.getElementById('main-title');
    const subTitle = document.getElementById('sub-title');

    // Referencias para el Menú Navegación
    const menuCheck = document.getElementById('menu-check');
    const menuLinks = document.querySelectorAll('.cabecera-menu a');

    // Referencias para Modo Oscuro (Traído de Trabajo 1)
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    // 1. Abrir/Cerrar panel de control (Engranaje)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            panel.style.display = panel.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // 2. Actualizar textos en tiempo real (Nombre y Eslogan)
    if (tInput && mainTitle) {
        tInput.addEventListener('input', () => {
            const val = tInput.value.trim();
            mainTitle.innerText = val !== "" ? val : "Jane Doe";
        });
    }

    if (sInput && subTitle) {
        sInput.addEventListener('input', () => {
            const val = sInput.value.trim();
            subTitle.innerText = val !== "" ? val : "Diseño, Fotografía & Magia";
        });
    }

    // 3. Cierre automático del menú móvil al hacer clic en un enlace
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuCheck && menuCheck.checked) {
                menuCheck.checked = false;
            }
        });
    });

    // 4. Lógica de Modo Oscuro Adaptada (Trabajo 1)
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            themeBtn.innerHTML = newTheme === 'light' ? '🌑' : '☀️';
            
            // Reajuste visual reactivo para mantener el estilo del botón
            themeBtn.style.borderColor = 'var(--pink-light)';
            themeBtn.style.color = 'var(--pink-dark)';
        });
    }

    // 5. Lógica del Puntero de Corazón con Estela de Partículas Cute
    // Creamos dinámicamente el contenedor principal del corazón para no obligarte a cambiar el HTML
    const heartCursor = document.createElement('div');
    heartCursor.className = 'cute-heart-cursor';
    heartCursor.innerHTML = '❤️';
    document.body.appendChild(heartCursor);

    // Variables para controlar el flujo de partículas al mover el ratón
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 8; // Distancia en píxeles para generar la siguiente partícula

    window.addEventListener('mousemove', (e) => {
        // Posicionamos el corazón usando las coordenadas del ratón
        heartCursor.style.left = `${e.clientX}px`;
        heartCursor.style.top = `${e.clientY}px`;

        // Calculamos la distancia desde la última posición para no saturar la pantalla de partículas
        const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);

        if (distance > distanceThreshold) {
            createParticle(e.clientX, e.clientY);
            lastX = e.clientX;
            lastY = e.clientY;
        }
    });

    // Función interna para generar cada partícula de la estela
    function createParticle(x, y) {
        // Desactivamos partículas en pantallas móviles por rendimiento táctil
        if (window.innerWidth <= 768) return;

        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        
        // Listado de pequeños iconos cute para variar la estela aleatoriamente
        const symbols = ['✨', '🌸', '💖', '⭐', '•'];
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        // Posición inicial con una ligera variación aleatoria para que se disperse de forma natural
        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        // Tamaño aleatorio para dar dinamismo
        const randomScale = 0.6 + Math.random() * 0.6;
        particle.style.transform = `translate(-50%, -50%) scale(${randomScale})`;

        document.body.appendChild(particle);

        // Eliminamos la partícula del DOM una vez termine su animación CSS (0.8 segundos)
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
});

