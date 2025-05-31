// ========== 1. Hidden Terminal Access ==========

// Terminal Icon Click
document.getElementById("terminal-icon").addEventListener("click", () => {
  const terminal = document.createElement("div");
  terminal.className = "terminal-overlay";

  terminal.innerHTML = `
    <div id="terminal-output">> Welcome to Anuj's Hidden Terminal<br>
    > Type 'help' to see available commands<br><br></div>
    <div>
      <span>> </span>
      <input id="terminal-input" autocomplete="off" autofocus />
    </div>
  `;

  document.body.appendChild(terminal);

  const input = terminal.querySelector("#terminal-input");
  const output = terminal.querySelector("#terminal-output");

  input.focus();

  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      const command = input.value.trim().toLowerCase();
      output.innerHTML += `> ${command}<br>`;
      handleCommand(command, output);
      input.value = "";
    } else if (e.key === "Escape") {
      terminal.remove(); // Press Esc to close
    }
  });
});

// Command Handler
function handleCommand(cmd, output) {
  switch (cmd) {
    case "projects":
      output.innerHTML += "- Comic Guide Web App<br>- Sales Dashboard (Power BI)<br>- Swastha Sewa UI Design<br><br>";
      break;
    case "resume":
      output.innerHTML += "Downloading resume...<br><br>";
      window.open("assets/Anuj_Parajuli_Resume.pdf", "_blank"); // Adjust path as needed
      break;
    case "skills":
      output.innerHTML += "Frontend: HTML, CSS, JavaScript, React<br>Design: Figma, Canva<br>Data: Excel, Power BI<br><br>";
      break;
    case "contact":
      output.innerHTML += "📧 anuj.parajulisep23@cps.edu.np<br>📞 +977 9746235377<br><br>";
      break;
    case "help":
      output.innerHTML += "Available commands:<br>- projects<br>- resume<br>- skills<br>- contact<br>- clear<br><br>";
      break;
    case "clear":
      output.innerHTML = "";
      break;
    default:
      output.innerHTML += "Unknown command. Type 'help' for options.<br><br>";
  }
}


// ========== 2. Glitch Triggered Theme Shift ==========

// CSS glitch animation
const glitchStyle = document.createElement('style');
glitchStyle.innerHTML = `
@keyframes glitch {
  0% { transform: translate(0); }
  20% { transform: translate(-1px, 1px); }
  40% { transform: translate(2px, -1px); }
  60% { transform: translate(-2px, 2px); }
  80% { transform: translate(1px, -2px); }
  100% { transform: translate(0); }
}
.glitch {
  animation: glitch 0.5s infinite;
  cursor: pointer;
}
.hacker-theme {
  background-color: black !important;
  color: #0f0 !important;
  font-family: monospace !important;
}
`; 
document.head.appendChild(glitchStyle);

// Apply glitch effect randomly
setInterval(() => {
  const el = document.getElementById("glitch-trigger");
  if (el) el.classList.toggle("glitch");
}, 5000);

document.getElementById("glitch-trigger").addEventListener("click", () => {
  document.body.classList.toggle("hacker-theme");
});


// ========== 3. Konami Code Easter Egg ==========

const konamiCode = [38,38,40,40,37,39,37,39,66,65];
let inputSequence = [];

window.addEventListener("keydown", e => {
  inputSequence.push(e.keyCode);
  if (inputSequence.length > konamiCode.length) inputSequence.shift();
  if (JSON.stringify(inputSequence) === JSON.stringify(konamiCode)) {
    launchMiniGame();
  }
});

function launchMiniGame() {
  alert("🎮 Mini-game unlocked!");
  // You can expand this to open a modal game or canvas-based mini-game
  // Example: show hidden div with game canvas or iframe
}
