const params = new URLSearchParams(window.location.search);
const domain = params.get('domain') || 'http://localhost:3900';
const title = params.get('title') || 'Energia da Live 🚀';
const maxComentarios = parseInt(params.get('max') || 50);

document.getElementById('energy-title').innerText = title;

function resetarChat() {
  fetch(`${domain}/clear-chat`)
    .then(() => console.log('Chat limpo para novo início!'))
    .catch(err => console.error('Erro ao limpar chat:', err));
}

function atualizarEnergia(count) {
  let porcentagem = Math.min((count / maxComentarios) * 100, 100);

  const fill = document.getElementById('energy-fill');
  const status = document.getElementById('energy-status');

  fill.style.width = porcentagem + '%';

  // Alterar cor da barra conforme a percentagem
  if (porcentagem < 40) {
    fill.style.background = 'linear-gradient(90deg, #ff4e50, #f9d423)'; // vermelho > amarelo
    status.innerText = 'Energia baixa... 🔥';
  } else if (porcentagem < 80) {
    fill.style.background = 'linear-gradient(90deg, #f9d423, #00c9ff)'; // amarelo > azul
    status.innerText = 'Aquecendo... ⚡';
  } else {
    fill.style.background = 'linear-gradient(90deg, #00c9ff, #92fe9d)'; // azul > verde
    status.innerText = 'Explosão máxima! 🚀';
  }
}

function buscarComentarios() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const chatHistory = (data.wordcloud || "")
        .toLowerCase()
        .split(',')
        .map(w => w.trim())
        .filter(w => w.length > 0);

      atualizarEnergia(chatHistory.length);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

// Primeiro limpar o chat
resetarChat();

// Depois começar a leitura
setTimeout(() => {
  buscarComentarios();
  setInterval(buscarComentarios, 1000);
}, 1000);
