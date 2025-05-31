// == 404 Inversion Trap ==

function create404Trap() {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.id = 'trap-overlay';
  overlay.style = `
    position: fixed;
    inset: 0;
    background: black;
    color: #0f0;
    font-family: monospace;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 100000;
    user-select: none;
    overflow: hidden;
  `;

  overlay.innerHTML = `
    <div id="glitch-text" style="font-size: 2rem; margin-bottom: 20px; text-align: center;">
      You've found the lost sector...
    </div>
    <button id="start-memory-game" style="padding: 12px 24px; font-size: 18px; cursor: pointer; border-radius: 8px;">
      Enter the Memory Challenge
    </button>
    <div id="memory-game-container" style="margin-top: 30px; display:none;"></div>
  `;

  document.body.appendChild(overlay);

  // Add glitch effect to the text
  const glitchText = document.getElementById('glitch-text');
  glitchText.classList.add('glitch-effect');

  // Start button
  document.getElementById('start-memory-game').addEventListener('click', () => {
    startMemoryGame();
  });
}

// == Memory Game ==

function startMemoryGame() {
  const container = document.getElementById('memory-game-container');
  container.style.display = 'grid';
  container.style.gridTemplateColumns = 'repeat(3, 120px)';
  container.style.gridGap = '15px';
  container.style.justifyContent = 'center';

  // Hide start button and glitch text
  document.getElementById('start-memory-game').style.display = 'none';
  document.getElementById('glitch-text').style.display = 'none';

  const cards = [
    '🪐', '🪐',
    '👾', '👾',
    '💀', '💀',
  ];

  shuffleArray(cards);

  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matches = 0;

  container.innerHTML = '';

  cards.forEach((emoji, index) => {
    const card = document.createElement('div');
    card.classList.add('memory-card');
    card.style = `
      width: 120px;
      height: 120px;
      background: #222;
      border-radius: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 60px;
      cursor: pointer;
      user-select: none;
      color: transparent;
      box-shadow: 0 0 10px #0f0;
      transition: color 0.3s ease;
    `;
    card.dataset.emoji = emoji;

    card.addEventListener('click', () => {
      if (lockBoard) return;
      if (card === firstCard) return;

      flipCard(card);

      if (!firstCard) {
        firstCard = card;
        return;
      }

      secondCard = card;
      lockBoard = true;

      if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
        matches++;
        firstCard.style.cursor = 'default';
        secondCard.style.cursor = 'default';
        resetBoard();
        if (matches === cards.length / 2) {
          onGameWon();
        }
      } else {
        setTimeout(() => {
          unflipCard(firstCard);
          unflipCard(secondCard);
          resetBoard();
        }, 1000);
      }
    });

    container.appendChild(card);
  });

  function flipCard(card) {
    card.style.color = '#0f0';
    card.style.background = '#050';
  }

  function unflipCard(card) {
    card.style.color = 'transparent';
    card.style.background = '#222';
  }

  function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
  }
}

// Utility shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// What happens after winning
function onGameWon() {
  const container = document.getElementById('memory-game-container');
    container.innerHTML = `
    <div style="
        display: flex;
        width: 100vw;
        height: 100vh;
        padding: 40px;
        box-sizing: border-box;
        background-color: #000;
        color: #0f0;
        font-family: monospace;
    ">
        <!-- Left Side: Message and Button -->
        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 20px;">
        <div style="font-size: 2rem;">
            🎉 Access Granted! 🎉<br>Click below to escape the lost sector.
        </div>
        <button id="escape-btn" style="
            padding: 16px 32px;
            font-size: 20px;
            border-radius: 10px;
            cursor: pointer;
            background-color: #0f0;
            color: #000;
            border: none;
            font-weight: bold;
            width: fit-content;
            transition: background 0.3s;
        ">
            Return to Safety
        </button>
        </div>


        
    </div>
    `;


  document.getElementById('escape-btn').addEventListener('click', () => {
    document.getElementById('trap-overlay').remove();
  });
}

// Optional: trigger 404 trap by typing 404 sequence
let keyBuffer = "";
document.addEventListener("keydown", (e) => {
  keyBuffer += e.key;
  if (keyBuffer.length > 3) keyBuffer = keyBuffer.slice(-3);
  if (keyBuffer === "404") {
    create404Trap();
    keyBuffer = "";
  }
});

/* CSS for glitch effect - add to your CSS file or via JS */

const style = document.createElement('style');
style.textContent = `
  @keyframes glitch {
    0% {
      text-shadow: 2px 0 red, -2px 0 cyan;
    }
    20% {
      text-shadow: -2px 0 red, 2px 0 cyan;
    }
    40% {
      text-shadow: 2px 0 cyan, -2px 0 red;
    }
    60% {
      text-shadow: -2px 0 cyan, 2px 0 red;
    }
    80% {
      text-shadow: 2px 0 red, -2px 0 cyan;
    }
    100% {
      text-shadow: -2px 0 red, 2px 0 cyan;
    }
  }
  .glitch-effect {
    animation: glitch 1s infinite;
  }
`;
document.head.appendChild(style);
