const streamId = "748c0ff7";
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

let totalComments = 0;
const maxEnergy = 100;
let explosionTriggered = false;

socket.addEventListener("open", () => {
  console.log("Ligado ao WebSocket do Medidor de Energia!");
});

socket.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  // Aceitar vários tipos de mensagem!
  if (data.type === "chat-message" || data.type === "social-comment" || data.type === "comment") {
    console.log("Mensagem recebida:", data.message); // Para confirmar no OBS
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
