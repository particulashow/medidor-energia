const params = new URLSearchParams(window.location.search);
const domain = params.get('domain') || 'http://localhost:4000';
const title = params.get('title') || 'Energia da Live 🔥';

const energyTitle = document.getElementById('energy-title');
const energyBar = document.getElementById('energy-bar');
const energyPercentage = document.getElementById('energy-percentage');
const effectsContainer = document.getElementById('effects-container');

// Atualiza o título
energyTitle.textContent = decodeURIComponent(title);

function fetchEnergy() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const words = (data.wordcloud || "").split(',');
      const totalComments = words.length;

      let energyLevel = Math.min((totalComments / 100) * 100, 100);

      updateEnergy(energyLevel);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

function updateEnergy(energyLevel) {
  energyBar.style.width = `${energyLevel}%`;
  energyPercentage.textContent = `${Math.floor(energyLevel)}%`;

  if (energyLevel >= 75) {
    energyBar.style.background = 'linear-gradient(90deg, #00ff00, #66ff66)';
  } else if (energyLevel >= 40) {
    energyBar.style.background = 'linear-gradient(90deg, #ffcc00, #ff9900)';
  } else {
    energyBar.style.background = 'linear-gradient(90deg, #ff0000, #cc0000)';
  }

  energyBar.classList.remove('pulse');

  if (energyLevel >= 90 && energyLevel < 100) {
    energyBar.classList.add('pulse');
  }

  if (energyLevel >= 40) {
    createSpark(Math.min(3, Math.floor(energyLevel / 20)));
  }

  if (energyLevel >= 100 && !document.getElementById('special-message')) {
    explodeEffect();
    showSpecialMessage();
  }
}

function createSpark(quantity) {
  for (let i = 0; i < quantity; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.top = Math.random() * 100 + '%';
    spark.style.left = Math.random() * 100 + '%';
    effectsContainer.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 1000);
  }
}

function explodeEffect() {
  for (let i = 0; i < 20; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.top = Math.random() * 100 + '%';
    spark.style.left = Math.random() * 100 + '%';
    spark.style.background = '#FFD700';
    spark.style.width = '12px';
    spark.style.height = '12px';
    effectsContainer.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 1000);
  }
}

function showSpecialMessage() {
  const message = document.createElement('div');
  message.id = 'special-message';
  message.textContent = 'EXPLOSÃO DE ENERGIA! ⚡';
  document.body.appendChild(message);
}

setInterval(fetchEnergy, 1000);
fetchEnergy();
