let heavenActivated = false;
let moonClickCount = 0;
const moonIcon = document.getElementById("moon-icon");
let heavenBuffer = "";

function showHeavenMsgBriefly() {
  // Create message box
  const msg = document.createElement("div");
  msg.id = "heaven-msg-box";
  msg.innerText = "✨Welcome to Heaven Mode✨";
  msg.style.cssText = `
    position: fixed;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.95);
    color: gold;
    font-size: 20px;
    font-family: 'Cursive';
    padding: 20px 30px;
    border-radius: 20px;
    box-shadow: 0 0 40px gold;
    z-index: 9999;
    white-space: pre-line;
    user-select: none;
  `;

  document.body.appendChild(msg);

  // Remove after 3 seconds
  setTimeout(() => {
    msg.remove();
  }, 3000);
}

function toggleHeavenMode(forceState = null) {
  if (forceState === null) {
    heavenActivated = !heavenActivated;
  } else {
    heavenActivated = forceState;
  }

  if (heavenActivated) {
    document.body.classList.add("heaven-mode");
    showHeavenMsgBriefly();
  } else {
    document.body.classList.remove("heaven-mode");
  }
}

// Moon icon clicks
if (moonIcon) {
  moonIcon.addEventListener("click", () => {
    moonClickCount++;
    if (moonClickCount === 3) {
      toggleHeavenMode();
      moonClickCount = 0;
    }
  });
}

// Keyboard input tracking
document.addEventListener("keydown", (e) => {
  heavenBuffer += e.key.toLowerCase();
  heavenBuffer = heavenBuffer.slice(-9);

  if (heavenBuffer === "darklight") {
    toggleHeavenMode(true);
  }

  if (heavenBuffer === "hellmode" && heavenActivated) {
    toggleHeavenMode(false);
  }
});
