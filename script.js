document.addEventListener('DOMContentLoaded', () => {
    const ladoIzquierdo = document.querySelector('.lado-izquierdo');
    const ladoDerecho = document.querySelector('.lado-derecho');
    const btnT1 = document.querySelector('.btn-t1');
    const btnT2 = document.querySelector('.btn-t2');

    // Referencias Puntero 1
    const dot1 = document.querySelector('.cursor-dot-t1');
    const outline1 = document.querySelector('.cursor-outline-t1');

    // Referencias Puntero 2
    const heartCursor = document.querySelector('.cute-heart-cursor');

    // Referencia Modo Oscuro Global
    const themeBtn = document.getElementById('theme-btn');
    const htmlElement = document.documentElement;

    // Referencias del aviso emergente
    const avisoModal = document.getElementById('aviso-modal');
    const cerrarAvisoBtn = document.getElementById('cerrar-aviso');

    // Variables de control estela Partículas (Puntero 2)
    let lastX = 0;
    let lastY = 0;
    const distanceThreshold = 8;

    // Al arrancar, NO añadimos la clase para mantener el cursor nativo del PC sobre el aviso
    if (cerrarAvisoBtn && avisoModal) {
        cerrarAvisoBtn.addEventListener('click', () => {
            avisoModal.classList.add('ocultar');
            // Único cambio operativo: activamos el borrado del puntero nativo e iniciamos los de diseño
            document.body.classList.add('quitar-cursor-sistema');
        });
    }

    // 1. Efecto visual de opacidad interactivo previo entre lados
    if (ladoIzquierdo && ladoDerecho) {
        ladoIzquierdo.addEventListener('mouseenter', () => { ladoDerecho.style.opacity = '0.85'; });
        ladoIzquierdo.addEventListener('mouseleave', () => { ladoDerecho.style.opacity = '1'; });
        ladoDerecho.addEventListener('mouseenter', () => { ladoIzquierdo.style.opacity = '0.85'; });
        ladoDerecho.addEventListener('mouseleave', () => { ladoIzquierdo.style.opacity = '1'; });
    }

    // 2. Escucha e interacción global del ratón para cambio dinámico de punteros
    window.addEventListener('mousemove', (e) => {
        if (window.innerWidth <= 768) return; // Salir en móviles
        
        // Condición estricta: si el aviso sigue abierto, no mover ni pintar cursores de diseño
        if (!document.body.classList.contains('quitar-cursor-sistema')) return;

        const mitadPantalla = window.innerWidth / 2;

        // --- ZONA IZQUIERDA (TRABAJO 1) ---
        if (e.clientX < mitadPantalla) {
            document.body.classList.add('ver-puntero-t1');
            document.body.classList.remove('ver-puntero-t2');

            // Posicionamiento de los círculos del Trabajo 1
            if (dot1 && outline1) {
                dot1.style.left = `${e.clientX}px`;
                dot1.style.top = `${e.clientY}px`;
                outline1.animate(
                    { left: `${e.clientX}px`, top: `${e.clientY}px` }, 
                    { duration: 500, fill: "forwards" }
                );
            }
        } 
        // --- ZONA DERECHA (TRABAJO 2) ---
        else {
            document.body.classList.add('ver-puntero-t2');
            document.body.classList.remove('ver-puntero-t1');

            // Posicionamiento del corazón del Trabajo 2
            if (heartCursor) {
                heartCursor.style.left = `${e.clientX}px`;
                heartCursor.style.top = `${e.clientY}px`;
            }

            // Flujo de partículas de la estela
            const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
            if (distance > distanceThreshold) {
                createParticle(e.clientX, e.clientY);
                lastX = e.clientX;
                lastY = e.clientY;
            }
        }
    });

    // 3. Hover interactivo exclusivo para el botón del Trabajo 1 (solo si no hay aviso)
    if (btnT1 && dot1 && outline1) {
        btnT1.addEventListener('mouseenter', () => {
            if (!document.body.classList.contains('quitar-cursor-sistema')) return;
            dot1.classList.add('cursor-hover-dot-t1');
            outline1.classList.add('cursor-hover-outline-t1');
        });
        btnT1.addEventListener('mouseleave', () => {
            if (!document.body.classList.contains('quitar-cursor-sistema')) return;
            dot1.classList.remove('cursor-hover-dot-t1');
            outline1.classList.remove('cursor-hover-outline-t1');
        });
    }

    // 4. Función de creación de partículas de la estela para el Trabajo 2
    function createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'heart-particle';
        
        const symbols = ['✨', '🌸', '💖', '⭐', '•'];
        particle.innerHTML = symbols[Math.floor(Math.random() * symbols.length)];

        const offsetX = (Math.random() - 0.5) * 10;
        const offsetY = (Math.random() - 0.5) * 10;
        particle.style.left = `${x + offsetX}px`;
        particle.style.top = `${y + offsetY}px`;

        const randomScale = 0.6 + Math.random() * 0.6;
        particle.style.transform = `translate(-50%, -50%) scale(${randomScale})`;

        document.body.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 800);
    }

    // 5. Lógica de Modo Oscuro Global Integrada (incluye hovers reactivos al botón)
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            htmlElement.setAttribute('data-theme', newTheme);
            themeBtn.innerHTML = newTheme === 'light' ? '🌑' : '☀️';
        });

        // Hacemos que el puntero personalizado reaccione también en el botón de modo oscuro (solo tras cerrar aviso)
        themeBtn.addEventListener('mouseenter', () => {
            if (!document.body.classList.contains('quitar-cursor-sistema')) return;
            if (document.body.classList.contains('ver-puntero-t1') && dot1 && outline1) {
                dot1.classList.add('cursor-hover-dot-t1');
                outline1.classList.add('cursor-hover-outline-t1');
            }
        });
        themeBtn.addEventListener('mouseleave', () => {
            if (!document.body.classList.contains('quitar-cursor-sistema')) return;
            if (dot1 && outline1) {
                dot1.classList.remove('cursor-hover-dot-t1');
                outline1.classList.remove('cursor-hover-outline-t1');
            }
        });
    }
});
