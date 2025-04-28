const params = new URLSearchParams(window.location.search);
const domain = params.get('domain') || 'http://localhost:4000';

const energyBar = document.getElementById('energy-bar');
const energyPercentage = document.getElementById('energy-percentage');
const effectsContainer = document.getElementById('effects-container');

function fetchEnergy() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const words = (data.wordcloud || "").split(',');
      const totalComments = words.length;

      // Cálculo da energia (máximo 100 comentários para 100%)
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

  // Limpa classes anteriores
  energyBar.classList.remove('pulse');

  if (energyLevel >= 90 && energyLevel < 100) {
    energyBar.classList.add('pulse');
  }

  if (energyLevel >= 40) {
    createSpark(Math.min(3, Math.floor(energyLevel / 20)));
  }

  if (energyLevel >= 100) {
    explodeEffect();
  }
}

// Cria faíscas
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

// Efeito especial 100%
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

// Atualizar a cada segundo
setInterval(fetchEnergy, 1000);
fetchEnergy();
