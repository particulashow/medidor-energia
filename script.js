// Configurações
let domain = new URLSearchParams(window.location.search).get('domain') || 'http://localhost:3900';
let totalComments = 0;
const maxEnergy = 100;
let explosionTriggered = false;

// Função para buscar dados ao servidor
function fetchData() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      if (data && data.wordcloud) {
        const chatHistory = data.wordcloud.toLowerCase().split(',').filter(w => w.trim() !== "");
        totalComments = chatHistory.length;
        updateEnergy();
      }
    })
    .catch(error => console.error("Erro ao buscar dados:", error));
}

// Função para atualizar o medidor
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

// Função de explosão
function triggerExplosion() {
  const explosion = document.getElementById('explosion');
  explosion.classList.add('show');

  setTimeout(() => {
    explosion.classList.remove('show');
  }, 1000);
}

// Atualiza os dados a cada 1 segundo
setInterval(fetchData, 1000);

// Primeiro carregamento
fetchData();
