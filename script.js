const streamId = "748c0ff7"; // substitui pelo teu stream ID real
const socket = new WebSocket(`wss://io.socialstream.ninja?streamId=${streamId}`);

let totalComments = 0;
const maxEnergy = 100; // Defini como máximo para 100 comentários, podes ajustar

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
  let energy = Math.min((totalComments / maxEnergy) * 100, 100);

  document.getElementById('energy-fill').style.width = `${energy}%`;
  document.getElementById('energy-percentage').textContent = `${Math.round(energy)}%`;
}
