// === CYBER DETONATION PROTOCOL ===
// Main modules: Sequence detection, terminal prompt, dynamic code, countdown, reset logic

// 🔹 SETTINGS
const requiredSequence = ['node1', 'node2', 'node3', 'node4'];
let userSequence = [];
let detonationCode = generateDetonationCode();
let terminalActive = false;

// 🔐 DYNAMIC CODE GENERATOR
function generateDetonationCode() {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = '';
  for (let i = 0; i < 6; i++) code += charset[Math.floor(Math.random() * charset.length)];
  document.querySelector('#hidden-code').textContent = code; // hide this creatively in your DOM
  return code;
}




// delete latater own
document.querySelector('#hidden-code').style.display = 'block';







// 🧠 CLICK SEQUENCE TRACKER
document.querySelectorAll('.hacker-node').forEach(node => {
  node.addEventListener('click', e => {
    const id = e.target.getAttribute('data-node');
    console.log(`Node clicked: ${id}`); // ✅ LOG TO CONSOLE
    userSequence.push(id);
    console.log(`Current sequence: ${userSequence.join(',')}`);
    if (userSequence.length === requiredSequence.length) {
      if (userSequence.join(',') === requiredSequence.join(',')) {
        launchTerminal();
      } else {
        userSequence = []; // reset
      }
    }
  });
});

// ⌨️ LAUNCH TERMINAL PROMPT
function launchTerminal() {
  if (terminalActive) return;
  terminalActive = true;
  const terminal = document.createElement('div');
  terminal.className = 'terminal';
  terminal.innerHTML = `
    <div class="terminal-content">
      <p>&gt; ENTER DETONATION CODE:</p>
      <input type="text" id="codeInput" placeholder="XRZ91K" maxlength="6" />
      <button id="submitCode">Submit</button>
      <p id="codeError" style="color:red;display:none;">WRONG CODE</p>
    </div>
  `;
  document.body.appendChild(terminal);
  document.getElementById('submitCode').addEventListener('click', validateCode);
}

function validateCode() {
  const input = document.getElementById('codeInput').value.toUpperCase();
  if (input === detonationCode) {
    initiateDetonation();
  } else {
    document.getElementById('codeError').style.display = 'block';
  }
}

// 💥 DETONATION COUNTDOWN
function initiateDetonation() {
  // Remove terminal prompt immediately
  const terminal = document.querySelector('.terminal');
  if (terminal) terminal.remove();

  // Create red overlay for countdown and explosion effect
  const overlay = document.createElement('div');
  overlay.className = 'detonation-overlay';
  overlay.id = 'countdownOverlay';
  overlay.innerHTML = `
    <div class="countdown-text">DETONATION IN: <span id="count">10</span></div>
  `;
  document.body.appendChild(overlay);

  let count = 10;
  const countdown = setInterval(() => {
    count--;
    document.getElementById('count').textContent = count;

    if (count <= 0) {
      clearInterval(countdown);
      document.getElementById('countdownOverlay')?.remove();
      triggerExplosion();
    }
  }, 1000);
}


function triggerExplosion() {
  // Add a fullscreen reddish glitchy overlay that stays
  const explosionOverlay = document.createElement('div');
  explosionOverlay.className = 'detonation-overlay'; // use same red overlay style
  explosionOverlay.style.background = 'rgba(150, 0, 0, 0.95)'; // deep red tint
  explosionOverlay.style.flexDirection = 'column';
  explosionOverlay.style.justifyContent = 'center';
  explosionOverlay.style.textAlign = 'center';

  explosionOverlay.innerHTML = `
    <div class="explosion-message">
      💥 SYSTEM OVERRIDDEN — ANUJ'S REALM DESTROYED
    </div>
    <p style="color: #ff6666; font-family: monospace; margin-top: 1rem;">
      (Find the secret reset glyph somewhere on this page...)
    </p>
  `;

  document.body.appendChild(explosionOverlay);

  // Add secret reset button, styled small and blinking, hidden but clickable
  const resetBtn = document.createElement('div');
  resetBtn.id = 'resetBtn';
  resetBtn.className = 'hidden-reset-button';
  resetBtn.title = "Secret Reset Button (Click 3 times quickly to restore)";
  resetBtn.style.position = 'fixed';
  resetBtn.style.bottom = '5%';
  resetBtn.style.right = '5%';
  resetBtn.style.fontSize = '1.8rem';
  resetBtn.style.color = '#ff4444';
  resetBtn.style.cursor = 'pointer';
  resetBtn.style.zIndex = '11000';
  resetBtn.style.animation = 'pulse 2s infinite';
  resetBtn.textContent = '🜂'; // A subtle alchemical glyph, looks mysterious

  document.body.appendChild(resetBtn);

  // Reset click logic
  let clickCount = 0;
  let lastClick = 0;
  resetBtn.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClick < 700) {
      clickCount++;
      if (clickCount >= 3) location.reload();
    } else {
      clickCount = 1;
    }
    lastClick = now;
  });
}

// 🔁 SECRET RESET PUZZLE
function showResetPuzzle() {
  const puzzle = document.createElement('div');
  puzzle.className = 'reset-puzzle';
  puzzle.innerHTML = `
    <p>Find the 🔁 icon and click it 3 times quickly to restore.</p>
    <div id="resetBtn" class="hidden-reset-button">🔁</div>
  `;
  document.body.appendChild(puzzle);

  let clickCount = 0;
  let lastClick = 0;
  document.getElementById('resetBtn').addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClick < 700) {
      clickCount++;
      if (clickCount >= 3) location.reload();
    } else {
      clickCount = 1;
    }
    lastClick = now;
  });
}

document.querySelectorAll('.hacker-node').forEach(node => {
  node.addEventListener('click', e => {
    console.log("You clicked: " + e.target.getAttribute('data-node'));
  });
});


// SERECT BTN

function showResetPuzzle() {
  const hint = document.createElement('div');
  hint.className = 'explosion-message';
  hint.innerHTML = `💀 SYSTEM OVERRIDDEN <br> (Find the secret restore glyph...)`;
  document.body.appendChild(hint);

  const glyph = document.createElement('div');
  glyph.className = 'hidden-reset-button';
  glyph.textContent = '🔁';
  glyph.style.position = 'fixed';
  glyph.style.bottom = '10%';
  glyph.style.left = '90%';
  glyph.style.opacity = '0';
  glyph.style.transition = 'opacity 0.5s';
  document.body.appendChild(glyph);

  // Reveal on hover over hint
  hint.addEventListener('mouseover', () => {
    glyph.style.opacity = '1';
  });

  // Restore logic
  let clickCount = 0;
  let lastClick = 0;
  glyph.addEventListener('click', () => {
    const now = Date.now();
    if (now - lastClick < 700) {
      clickCount++;
      if (clickCount >= 3) location.reload();
    } else {
      clickCount = 1;
    }
    lastClick = now;
  });
}
