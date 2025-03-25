document.addEventListener("DOMContentLoaded", () => {
  // Obtiene los elementos del DOM
  const historyContainer = document.querySelector(".main-history");
  const dice = document.querySelector(".dice");
  let historyArray = [];

  // Intenta obtener el historial de tiradas del almacenamiento local
  try {
    historyArray = JSON.parse(localStorage.getItem("diceHistory")) || [];
  } catch (e) {
    console.error("Error parsing diceHistory from localStorage:", e);
  }

  let rolling = false; // Indica si el dado está en movimiento

  // Obtiene los elementos del modo oscuro
  const body = document.querySelector("body");
  const toogleMode = document.getElementById("toggle-mode");
  const darkMode = localStorage.getItem("darkMode");

  // Aplica el modo oscuro si está activado
  if (darkMode === "true") {
    body.classList.add("dark");
    toogleMode.classList = "ri-moon-fill toogle-mode";
  }

  // Función para agregar una nueva tirada al historial
  function addNewRoll(result) {
    historyArray.unshift(result); // Agrega el resultado al inicio del array
    localStorage.setItem("diceHistory", JSON.stringify(historyArray)); // Guarda el historial en el almacenamiento local
    renderHistory(); // Actualiza la visualización del historial
    dice.innerHTML = `<i class="ri-dice-${result}-fill"></i>`; // Actualiza la imagen del dado
  }

  // Función para renderizar el historial de tiradas
  function renderHistory() {
    historyContainer.innerHTML = ""; // Limpia el contenedor del historial

    historyArray.forEach((roll, index) => {
      // Crea un elemento para cada tirada en el historial
      const historyItem = document.createElement("div");
      historyItem.classList.add("history");
      historyItem.innerHTML = `<p>Tiro ${
        historyArray.length - index
      }</p><i class="ri-dice-${roll}-fill"></i>`;
      historyContainer.appendChild(historyItem); // Agrega el elemento al contenedor
    });

    historyContainer.scrollTop = 0; // Asegura que el historial esté al principio
  }

  renderHistory(); // Renderiza el historial al cargar la página

  // Evento de clic en el dado para realizar una tirada
  dice.addEventListener("click", () => {
    if (rolling) return;

    rolling = true;
    dice.classList.add("active"); // Agrega la clase para la animación de giro

    setTimeout(() => {
      const diceRoll = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6
      addNewRoll(diceRoll); // Agrega la tirada al historial

      dice.classList.remove("active"); // Remueve la clase de animación
      rolling = false;
    }, 500);
  });

  // Evento de clic en el botón de limpiar historial
  const clear = document.getElementById("delete");

  clear.addEventListener("click", () => {
    historyArray = []; // Limpia el array del historial
    localStorage.removeItem("diceHistory"); // Elimina el historial del almacenamiento local
    historyContainer.innerHTML = ""; // Limpia la visualización del historial
    dice.innerHTML = `<i class="ri-dice-line"></i>`;
  });
});

// Función para cambiar el modo claro/oscuro
function ChangeMode() {
  const body = document.querySelector("body");
  const toogleMode = document.getElementById("toggle-mode");
  body.classList.toggle("dark");
  toogleMode.classList.toggle("ri-moon-fill", body.classList.contains("dark"));
  toogleMode.classList.toggle("ri-sun-fill", !body.classList.contains("dark"));
  localStorage.setItem("darkMode", body.classList.contains("dark")); // Guarda el estado del modo oscuro en el almacenamiento local
}
