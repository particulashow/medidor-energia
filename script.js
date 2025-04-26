const streamId = "748c0ff7"; // substitui pelo teu ID real se necessário
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

let totalComments = 0;
const maxEnergy = 100;
let explosionTriggered = false;

socket.addEventListener("open", () => {
  console.log("Ligado ao WebSocket do Medidor de Energia!");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "chat-message") {
    totalComments++;
    updateEnergy();
  }
});

function updateEnergy() {
  let energy = (totalComments / maxEnergy) * 100;

  if (energy >= 100) {
    energy = 100;
    if (!explosionTriggered) {
      triggerExplosion();
      explosionTriggered = true;

      // Começar a animação do número a piscar
      document.getElementById('energy-percentage').classList.add('flash');
    }
  }

  document.getElementById('energy-fill').style.width = `${energy}%`;
  document.getElementById('energy-percentage').textContent = `${Math.round(Math.min((totalComments / maxEnergy) * 100, 999))}%`;
}

function triggerExplosion() {
  const explosion = document.getElementById('explosion');
  explosion.classList.add('show');

  setTimeout(() => {
    explosion.classList.remove('show');
  }, 1000);
}
