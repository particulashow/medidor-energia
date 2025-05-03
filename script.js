const params = new URLSearchParams(window.location.search);
const title = params.get('title') || 'Energia da Live 🚀';
const maxComentarios = parseInt(params.get('max')) || 50;
const domain = 'http://localhost:3900'; // ajusta se usares outro

document.getElementById('energy-title').innerText = title;

function resetarChat() {
  fetch(`${domain}/clear-chat`)
    .then(() => console.log('Chat limpo!'))
    .catch(err => console.error('Erro ao limpar chat:', err));
}

function atualizarEnergia(count) {
  const porcentagem = Math.min((count / maxComentarios) * 100, 100);

  const fill = document.getElementById('energy-fill');
  const status = document.getElementById('energy-status');
  const counter = document.getElementById('counter');
  const container = document.getElementById('energy-container');

  fill.style.width = porcentagem + '%';
  counter.textContent = `${count} comentário${count === 1 ? '' : 's'}`;

  if (porcentagem < 40) {
    fill.style.background = 'linear-gradient(90deg, #ff4e50, #f9d423)';
    status.innerText = 'Energia baixa... 🔥';
    container.classList.remove('full');
  } else if (porcentagem < 80) {
    fill.style.background = 'linear-gradient(90deg, #f9d423, #00c9ff)';
    status.innerText = 'Aquecendo... ⚡';
    container.classList.remove('full');
  } else {
    fill.style.background = 'linear-gradient(90deg, #00c9ff, #92fe9d)';
    status.innerText = 'Explosão máxima! 🚀';
    container.classList.add('full');
  }
}

function buscarComentarios() {
  fetch(`${domain}/wordcloud`)
    .then(response => response.json())
    .then(data => {
      const chatHistory = (data.wordcloud || '')
        .toLowerCase()
        .split(',')
        .map(w => w.trim())
        .filter(w => w.length > 0);

      atualizarEnergia(chatHistory.length);
    })
    .catch(error => console.error('Erro ao buscar dados:', error));
}

// Limpar histórico no início
resetarChat();

// Iniciar leitura de dados
setTimeout(() => {
  buscarComentarios();
  setInterval(buscarComentarios, 1000);
}, 1000);
