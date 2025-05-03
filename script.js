const params = new URLSearchParams(window.location.search);
const streamId = params.get('streamid') || '748c0ff7';
const title = params.get('title') || 'Energia da Live 🚀';
const maxComentarios = parseInt(params.get('max')) || 50;

document.getElementById('energy-title').innerText = title;

let contador = 0;

function atualizarEnergia(count) {
  const porcentagem = Math.min((count / maxComentarios) * 100, 100);
  const fill = document.getElementById('energy-fill');
  const status = document.getElementById('energy-status');

  fill.style.width = porcentagem + '%';

  if (porcentagem < 40) {
    fill.style.background = 'linear-gradient(90deg, #ff4e50, #f9d423)';
    status.innerText = 'Energia baixa... 🔥';
  } else if (porcentagem < 80) {
    fill.style.background = 'linear-gradient(90deg, #f9d423, #00c9ff)';
    status.innerText = 'Aquecendo... ⚡';
  } else {
    fill.style.background = 'linear-gradient(90deg, #00c9ff, #92fe9d)';
    status.innerText = 'Explosão máxima! 🚀';
  }
}

function iniciarWebSocket() {
  const socket = new WebSocket('wss://io.socialstream.ninja');

  socket.addEventListener('open', () => {
    socket.send(JSON.stringify({ type: 'subscribe', stream: streamId }));
    console.log('Ligado ao WebSocket do StreamNinja!');
  });

  socket.addEventListener('message', (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'chat') {
        contador++;
        atualizarEnergia(contador);
      }
    } catch (e) {
      console.error('Erro ao processar mensagem:', e);
    }
  });

  socket.addEventListener('close', () => {
    console.warn('WebSocket desconectado. Reconnecting...');
    setTimeout(iniciarWebSocket, 2000);
  });

  socket.addEventListener('error', (err) => {
    console.error('Erro no WebSocket:', err);
  });
}

// Iniciar ligação ao WebSocket
iniciarWebSocket();
