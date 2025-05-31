// admin-themed-terminal.js

// Track clicks on the two hidden codes
let firstCodeClicked = false;
let secondCodeClicked = false;

// Create terminal overlay and append it to body
const terminalOverlay = document.createElement('div');
terminalOverlay.id = 'admin-terminal-overlay';
terminalOverlay.style.display = 'none';
terminalOverlay.innerHTML = `
  <div id="admin-terminal-content">
    <pre id="terminal-output" style="white-space: pre-wrap; margin-bottom: 10px;">
> AUTHORIZATION REQUIRED
> Enter admin command:
    </pre>
    <input id="admin-terminal-input" autofocus autocomplete="off" spellcheck="false"
      style="background:#1b1b1b; color:#a259ff; border:none; outline:none; width:90%; font-family: monospace; font-size: 16px; padding: 8px;"
      placeholder="Type command here...">
    <div id="terminal-close-btn" title="Close Terminal" style="
      position: absolute; top: 15px; right: 20px;
      cursor: pointer; font-size: 22px; color: #a259ff;">✕</div>
  </div>
`;

// Append to body
document.body.appendChild(terminalOverlay);

// Elements
const code1 = document.getElementById('hidden-code-1');
const code2 = document.getElementById('hidden-code-2');
const terminalInput = terminalOverlay.querySelector('#admin-terminal-input');
const terminalOutput = terminalOverlay.querySelector('#terminal-output');
const closeBtn = terminalOverlay.querySelector('#terminal-close-btn');

// Function to reset terminal session
function resetTerminal() {
  terminalOutput.textContent = `> AUTHORIZATION REQUIRED\n> Enter admin command:\n`;
  terminalInput.value = '';
  terminalInput.disabled = false;
  terminalInput.focus();
}

function openTerminal() {
  terminalOverlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  resetTerminal();
}

function closeTerminal() {
  terminalOverlay.style.display = 'none';
  document.body.style.overflow = '';
  firstCodeClicked = false;
  secondCodeClicked = false;
}

code1.addEventListener('click', () => {
  firstCodeClicked = true;
  checkCodes();
});

code2.addEventListener('click', () => {
  if (!firstCodeClicked) return;
  secondCodeClicked = true;
  checkCodes();
});

function checkCodes() {
  if (firstCodeClicked && secondCodeClicked) {
    openTerminal();
  }
}

terminalInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = terminalInput.value.trim().toLowerCase();
    terminalInput.value = '';
    handleCommand(command);
  }
});

function appendOutput(text) {
  terminalOutput.textContent += '\n' + text;
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function handleCommand(command) {
  switch (command) {
    case 'access.override':
    case 'sudo anuj.root':
    case 'hack_this_site':
      simulateRestrictedAccess();
      break;
    case 'help':
      appendOutput(`> Available commands:\n  access.override\n  sudo anuj.root\n  hack_this_site\n  play\n  help\n  exit`);
      break;
    case 'exit':
      appendOutput('> Closing terminal...');  
      setTimeout(closeTerminal, 800);
      break;
    

    case 'lodu':
  appendOutput("\n> Preparing easter egg...");
  setTimeout(() => {
    closeTerminal();

    // Reset function to bring back the main/default portfolio
    function resetToDefault() {
      location.reload(); // Or trigger your default homepage function
    }

    // Clear current content
    document.body.innerHTML = '';
    document.body.style.backgroundColor = '#05050f';
    document.body.style.fontFamily = 'monospace';

    // Create wrapper
    const wrapper = document.createElement('div');
    wrapper.style.position = 'relative';
    wrapper.style.width = '300px';
    wrapper.style.margin = '60px auto';
    wrapper.style.padding = '16px';
    wrapper.style.border = '2px solid #0ff';
    wrapper.style.borderRadius = '12px';
    wrapper.style.boxShadow = '0 0 20px #0ff, 0 0 40px #00ffff66';
    wrapper.style.background = 'linear-gradient(145deg, rgba(10,10,20,0.9), rgba(0,255,204,0.05))';

    // Main image
    const img = document.createElement('img');
    img.src = 'https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=250&q=80';
    img.style.width = '100%';
    img.style.borderRadius = '10px';
    img.style.boxShadow = '0 0 10px #00ffffaa';

    // Go Back Button (to return to terminal)
    const backBtn = document.createElement('button');
    backBtn.textContent = '↩ Go Back';
    Object.assign(backBtn.style, {
      marginTop: '12px',
      backgroundColor: '#111',
      border: '1px solid #0ff',
      color: '#0ff',
      padding: '6px 12px',
      borderRadius: '6px',
      cursor: 'pointer',
      width: '100%',
      fontWeight: 'bold',
      boxShadow: '0 0 6px #0ff88',
    });
    backBtn.onclick = () => resetToDefault();

    // Secret Button (hidden)
    const secretBtn = document.createElement('button');
    Object.assign(secretBtn.style, {
      position: 'absolute',
      width: '50px',
      height: '50px',
      bottom: '0',
      right: '0',
      opacity: '0.1',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: 'transparent',
    });
    secretBtn.title = '';

    // Secret click triggers password modal
    secretBtn.onclick = () => {
      // Password modal
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100vw';
      overlay.style.height = '100vh';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.9)';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      overlay.style.zIndex = '9999';

      const modal = document.createElement('div');
      modal.style.padding = '20px';
      modal.style.background = '#111';
      modal.style.border = '2px solid red';
      modal.style.color = 'red';
      modal.style.borderRadius = '10px';
      modal.style.boxShadow = '0 0 20px red';
      modal.style.textAlign = 'center';
      modal.style.width = '300px';
      modal.innerHTML = `
        <h3 style="margin-bottom: 10px;">⚠ UNAUTHORIZED ACCESS ⚠</h3>
        <p style="font-size: 12px;">You’ve found a restricted node.<br>Enter the decryption key:</p>
        <input id="pwdInput" type="password" style="margin-top:10px; width: 80%; padding: 6px; background:#000; border:1px solid red; color:red;" placeholder="Enter password"/>
        <br><br>
        <button id="authBtn" style="background:black; color:red; border:1px solid red; padding:5px 10px; cursor:pointer;">Authenticate</button>
      `;

      overlay.appendChild(modal);
      document.body.appendChild(overlay);

      modal.querySelector('#authBtn').onclick = () => {
        const input = modal.querySelector('#pwdInput').value;
        if (input === 'Sudin') {
          document.body.removeChild(overlay);
          openPhotoAlbum();
        } else {
          alert('ACCESS DENIED\nSystem reset triggered.');
          resetToDefault();
        }
      };
    };

    wrapper.appendChild(img);
    wrapper.appendChild(secretBtn);
    wrapper.appendChild(backBtn);
    document.body.appendChild(wrapper);

    // Photo Album Function
    function openPhotoAlbum() {
      document.body.innerHTML = '';

      const modalBg = document.createElement('div');
      modalBg.id = 'photoAlbumModal';
      Object.assign(modalBg.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(5, 5, 15, 0.95)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'auto',
        padding: '30px',
        zIndex: '2000',
        backdropFilter: 'blur(6px)',
        boxShadow: 'inset 0 0 40px rgba(0, 255, 204, 0.2)',
      });

      const images = [
        'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=150&q=80',
        'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=150&q=80'
      ];

      images.forEach(src => {
        const photo = document.createElement('img');
        photo.src = src;
        photo.style.width = '160px';
        photo.style.margin = '12px';
        photo.style.borderRadius = '10px';
        photo.style.boxShadow = '0 0 15px #00ffff99, 0 0 25px #0ff5';
        photo.style.transition = 'transform 0.2s ease';
        photo.addEventListener('mouseover', () => photo.style.transform = 'scale(1.05)');
        photo.addEventListener('mouseout', () => photo.style.transform = 'scale(1)');
        modalBg.appendChild(photo);
      });

      // Return to default/homepage button
      const returnBtn = document.createElement('button');
      returnBtn.textContent = '🏠 Return to Main Page';
      Object.assign(returnBtn.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '10px 16px',
        background: '#000',
        color: '#0ff',
        border: '1px solid #0ff',
        borderRadius: '6px',
        fontWeight: 'bold',
        boxShadow: '0 0 10px #0ff8',
        cursor: 'pointer',
        zIndex: '3000',
      });
      returnBtn.onclick = resetToDefault;

      modalBg.appendChild(returnBtn);
      document.body.appendChild(modalBg);
    }
  }, 800);
  break;




    default:
      appendOutput(`> Invalid attempt detected\n> System lockdown initiated in 3... 2... 1...`);
      simulateLockdown();
      break;
  }
}

function simulateRestrictedAccess() {
  terminalInput.disabled = true;
  const lines = [
    '> Validating...',
    '> Bypassing firewall...',
    '> Access level: [RESTRICTED]',
    '> Security clearance: NONE',
    '> WARNING: You are entering a secured zone...',
    '> Access Granted.',
    '> Welcome to the underground zone.'
  ];

  let i = 0;
  function showNextLine() {
    if (i < lines.length) {
      appendOutput(lines[i]);
      i++;
      setTimeout(showNextLine, 1000);
    } else {
      showRestrictedContent();
      terminalInput.disabled = false;
      terminalInput.focus();
    }
  }
  showNextLine();

  let flicker = true;
  terminalOverlay.style.backgroundColor = '#220022';
  const flickerInterval = setInterval(() => {
    terminalOverlay.style.backgroundColor = flicker ? '#330033' : '#220022';
    flicker = !flicker;
  }, 500);

  setTimeout(() => {
    clearInterval(flickerInterval);
    terminalOverlay.style.backgroundColor = 'rgba(0,0,0,0.95)';
  }, 15000);
}

function showRestrictedContent() {
  appendOutput('\n> *** SECRET UNDERGROUND ZONE ***');
  appendOutput('> - Abandoned projects');
  appendOutput('> - AI-generated concepts');
  appendOutput('> - Cyber boss chat logs');
  appendOutput('> Type "exit" to leave terminal.');
}

function simulateLockdown() {
  terminalInput.disabled = true;
  let countdown = 3;

  function countdownStep() {
    if (countdown > 0) {
      appendOutput(`> System lockdown in ${countdown}...`);
      countdown--;
      setTimeout(countdownStep, 1000);
    } else {
      appendOutput('> Lockdown complete. Reloading page...');
      setTimeout(() => {
        location.reload();
      }, 1500);
    }
  }
  countdownStep();
}

function launchFindAPath() {
  const event = new Event('launchFindAPathGame');
  document.dispatchEvent(event);
}

closeBtn.addEventListener('click', closeTerminal);



// ========== 🥚 Typing ‘anuj’ Unlock ==========

let typedKeys = "";
const secretCode = "anuj";

document.addEventListener("keydown", (e) => {
  // Avoid triggering when typing in input/textarea fields
  const isTypingInField = e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
  if (isTypingInField) return;

  typedKeys += e.key.toLowerCase();
  typedKeys = typedKeys.slice(-secretCode.length); // keep buffer size same as secret code

  if (typedKeys === secretCode) {
    triggerSecretMessage();
  }
});

function triggerSecretMessage() {
  // Avoid duplicate message
  if (document.getElementById("anuj-message")) return;

  const msg = document.createElement("div");
  msg.id = "anuj-message";
  msg.innerText = "🔓 Root access granted. Hello Anuj!";
  msg.style.cssText = `
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0,0,0,0.95);
    color: #0f0;
    padding: 20px 40px;
    font-family: monospace;
    font-size: 18px;
    border: 2px solid #0f0;
    border-radius: 8px;
    z-index: 99999;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  `;
  document.body.appendChild(msg);

  // Fade-in effect
  requestAnimationFrame(() => {
    msg.style.opacity = "1";
  });

  // Auto hide after 5 seconds
  setTimeout(() => {
    msg.style.opacity = "0";
    setTimeout(() => msg.remove(), 1000);
  }, 5000);
}
