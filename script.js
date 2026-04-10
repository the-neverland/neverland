// Bingo Literário - Cartela com 09 desafios/livros
const bingoItems = [
  "📖 Um livro com personagem Moral Cinza","✨ Um livro que tenha as mesmas iniciais que você", "📚 Um livro escrito antes de 1900"
  "🗡️ Um livro com título de uma palavra só", "🏆 Um livro publicado em 2025", "🎲 Um mangá, manhwa, novel ou HQ"
  "🌸 Um livro em que os Personagens tenham Pets","📖 Um livro originado de uma fanfic","🌟 Um livro escrito em um fotmato não tradicional"
];

let markedState = new Array(25).fill(false);

function renderBingo() {
  const grid = document.getElementById('bingoGrid');
  if (!grid) return;
  grid.innerHTML = '';
  bingoItems.forEach((item, idx) => {
    const cell = document.createElement('div');
    cell.className = 'bingo-cell' + (markedState[idx] ? ' marked' : '');
    cell.textContent = item;
    cell.addEventListener('click', () => {
      markedState[idx] = !markedState[idx];
      renderBingo();
      checkBingo();
    });
    grid.appendChild(cell);
  });
}

function checkBingo() {
  let bingo = false;
  // verifica linhas
  for (let i = 0; i < 5; i++) {
    let rowComplete = true;
    for (let j = 0; j < 5; j++) {
      if (!markedState[i * 5 + j]) rowComplete = false;
    }
    if (rowComplete) bingo = true;
  }
  // verifica colunas
  for (let j = 0; j < 5; j++) {
    let colComplete = true;
    for (let i = 0; i < 5; i++) {
      if (!markedState[i * 5 + j]) colComplete = false;
    }
    if (colComplete) bingo = true;
  }
  // diagonal principal
  let diag1 = true;
  for (let i = 0; i < 5; i++) if (!markedState[i * 5 + i]) diag1 = false;
  if (diag1) bingo = true;
  // diagonal secundária
  let diag2 = true;
  for (let i = 0; i < 5; i++) if (!markedState[i * 5 + (4 - i)]) diag2 = false;
  if (diag2) bingo = true;

  if (bingo) {
    setTimeout(() => {
      alert("🎉 BINGO LITERÁRIO! 🎉 Você completou uma linha! Parabéns! 🥳📚");
    }, 50);
  }
}

function sortearItem() {
  const randomIndex = Math.floor(Math.random() * bingoItems.length);
  const itemSorteado = bingoItems[randomIndex];
  const resultadoDiv = document.getElementById('sorteioResultado');
  if (resultadoDiv) {
    resultadoDiv.innerHTML = `🎲 Item sorteado: <strong style="color:#e2c2ff;">${itemSorteado}</strong><br> Marque na sua cartela se você já cumpriu!`;
  }
  // piscar o item sorteado
  const cells = document.querySelectorAll('.bingo-cell');
  if (cells[randomIndex]) {
    cells[randomIndex].style.transform = 'scale(1.05)';
    setTimeout(() => {
      if (cells[randomIndex]) cells[randomIndex].style.transform = '';
    }, 400);
  }
}

function resetBingo() {
  markedState.fill(false);
  renderBingo();
  const resultadoDiv = document.getElementById('sorteioResultado');
  if (resultadoDiv) resultadoDiv.innerHTML = `🎲 Cartela resetada! Clique em "Sortear" para começar.`;
}

// Inicializa o bingo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
  renderBingo();
  
  const sortearBtn = document.getElementById('sortearNumero');
  const resetBtn = document.getElementById('resetBingo');
  
  if (sortearBtn) sortearBtn.addEventListener('click', sortearItem);
  if (resetBtn) resetBtn.addEventListener('click', resetBingo);
});

// Carrossel automático
const track = document.getElementById('carouselTrack');
if (track) {
  setInterval(() => {
    if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
      track.scrollLeft = 0;
    } else {
      track.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }, 3000);
}
