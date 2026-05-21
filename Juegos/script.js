// Listado actualizado con la carpeta "game/" incluida en la ruta
const listaJuegos = [
    "game/juego.html",
    "game/juego2.html",
    "game/juego3.html",
    "game/juego4.html"
];

// Capturamos el botón de juego aleatorio de la interfaz
const botonAleatorio = document.getElementById("btn-random");

botonAleatorio.addEventListener("click", () => {
    // Genera un índice matemático al azar entre 0 y el total de juegos
    const indiceAleatorio = Math.floor(Math.random() * listaJuegos.length);
    
    // Elige el archivo de juego correspondiente con su ruta correcta
    const juegoElegido = listaJuegos[indiceAleatorio];
    
    // Cambia el texto del botón temporalmente para dar efecto visual de selección
    botonAleatorio.innerText = "🎲 Eligiendo juego...";
    botonAleatorio.style.pointerEvents = "none"; // Desactiva clics repetidos
    
    // Redirige al juego seleccionado tras una breve pausa de 600 milisegundos
    setTimeout(() => {
        window.location.href = juegoElegido;
    }, 600);
});
