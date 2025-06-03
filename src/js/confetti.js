function createConfetti() {
  const container = document.getElementById("confetti-container");
  const colors = ["#e12021", "#83db26", "#edc139", "#1f708f", "#dc5602"];

  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
    confetti.style.width = 5 + Math.random() * 10 + "px";
    confetti.style.height = confetti.style.width;

    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

    container.appendChild(confetti);

    // Remover confetti después de animación para optimizar DOM
    confetti.addEventListener("animationend", () => {
      confetti.remove();
    });
  }
}

// Ejecutar la animación cuando carga la página
window.addEventListener("load", () => {
  createConfetti();
});
