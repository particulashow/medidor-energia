const params = new URLSearchParams(window.location.search);
const domain = params.get('domain') || 'http://localhost:3900';
const title = params.get('title') || 'Energia da Live 🚀';

document.getElementById('energy-title').innerText = title;

function resetarChat() {
  fetch(`${domain}/clear-chat`)
    .then(() => console.log('Chat limpo para novo início!'))
    .catch(err => console.error('Erro ao limpar chat:', err));
}

function atualizarEnergia(count) {
  const maxComentarios = 50; // define o número de comentários para energia máxima
  let porcentagem = Math.min((count / maxComentarios) * 100, 100);

  document.getElementById('energy-fill').style.width = porcentagem + '%';
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
