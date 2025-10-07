let whoStarted = document.getElementById("who-started");
let playerTurn = document.getElementById("player-turn");
let computerTurn = document.getElementById("computer-turn");
let playerScoreDisplay = document.getElementById("player-score-display");
let computerScoreDisplay = document.getElementById("computer-score-display");
let oneButton = document.getElementById("one");
let twoButton = document.getElementById("two");
let threeButton = document.getElementById("three");
let fourButton = document.getElementById("four");
let fiveButton = document.getElementById("five");
let opponentMoveValueDisplay  = document.getElementById("opponent-move-value");
let statusMessage = document.getElementById("status-message");
let resetButton = document.getElementById("reset-button");
let howToPlayButton = document.getElementById("how-to-play-button");
let howToPlayModal = document.getElementById("how-to-play-modal");
let closeHowToPlay = document.getElementById("close-how-to-play");
let lastFocused;


let playerScore = 0;
let computerScore = 0;
let opponentMoveValue = 0;
let currentPlayer = "player";
let gameOver = false;
let whoStartedRound = "player";

function updateTurnUI() {
    if (currentPlayer === "player") {
        playerTurn.style.display = "block";
        playerTurn.style.color = "green";
        computerTurn.style.display = "none";
        
        // Highlight player score, dim computer score
        playerScoreDisplay.classList.add("score-active");
        playerScoreDisplay.classList.remove("score-inactive");
        computerScoreDisplay.classList.add("score-inactive");
        computerScoreDisplay.classList.remove("score-active");
    } else {

      if (whoStartedRound === "player") {
          whoStarted.style.display = "block";
      }
        computerTurn.style.display = "block";
        computerTurn.style.color = "red";
        playerTurn.style.display = "none";
        
        // Highlight computer score, dim player score
        computerScoreDisplay.classList.add("score-active");
        computerScoreDisplay.classList.remove("score-inactive");
        playerScoreDisplay.classList.add("score-inactive");
        playerScoreDisplay.classList.remove("score-active");
    }
}
updateTurnUI();

function update(button) {
    if (gameOver){
        alert("Game Over!");
        return;
    }
    if (currentPlayer === "player") { // Player's turn
        playerScore += button;
        opponentMoveValue = Math.floor(Math.random() * 5) + 1;
        playerScore += opponentMoveValue; 
        playerScoreDisplay.textContent = playerScore;
        opponentMoveValueDisplay.textContent = opponentMoveValue;
        if (playerScore > 10) {
            currentPlayer = "computer";
        }

    } else { // Computer's turn
        computerScore += button;
        opponentMoveValue = Math.floor(Math.random() * 5) + 1;
        computerScore += opponentMoveValue;
    
        computerScoreDisplay.textContent = computerScore;
        opponentMoveValueDisplay.textContent = opponentMoveValue;
        
        if (computerScore > 10) {
            endGame();
        }
    }
    updateTurnUI();
    
}

function endGame() {
    gameOver = true;
    setPlayButtonsDisabled(true);

    // Disable the turn indicator(s)
    computerTurn.setAttribute("aria-disabled", "true");
    computerTurn.classList.add("turn-disabled");
    playerTurn.setAttribute("aria-disabled", "true");
    playerTurn.classList.add("turn-disabled");

    if ((playerScore > computerScore && playerScore <= 15) || (playerScore <= 15 && computerScore > 15)) {
        statusMessage.textContent = "You win!";
        statusMessage.style.color = "green";
    } else if (playerScore === computerScore || (playerScore > 15 && computerScore > 15)) {
        statusMessage.textContent = "It's a tie!";
        statusMessage.style.color = "orange";   
    } else {
        statusMessage.textContent = "You lose!";
        statusMessage.style.color = "red";
    }
}

function resetGame() {
  // Reset scores
  playerScore = 0;
  computerScore = 0;

  // Alternate who starts first
  if (whoStartedRound === "player") {
      whoStartedRound = "computer";
      currentPlayer = "computer";
      whoStarted.textContent = "Computer starts!";
      whoStarted.style.color = "red";
  } else {
      whoStartedRound = "player";
      currentPlayer = "player";
      whoStarted.textContent = "You start!";
      whoStarted.style.color = "green";
  }

  setPlayButtonsDisabled(false);

  // Re-enable turn indicators
  [computerTurn, playerTurn].forEach(el => {
    el.removeAttribute("aria-disabled");
    el.classList.remove("turn-disabled");
  });
  
  // Reset UI
  playerScoreDisplay.textContent = "0";
  computerScoreDisplay.textContent = "0";
  
  // Reset game state
  gameOver = false;
  
  // Reset status messages
  statusMessage.textContent = "Game in progress...";
  statusMessage.style.color = ""; // Reset to default color
  opponentMoveValueDisplay.textContent = "-";
  
  // Update UI to reflect player's turn
  updateTurnUI();
}

// Open modal
function openHowToPlay() {
  lastFocused = document.activeElement;
  howToPlayModal.hidden = false;
  closeHowToPlay.focus();
  document.addEventListener("keydown", escListener);
}

// Close modal
function closeHowToPlayModal() {
  howToPlayModal.hidden = true;
  document.removeEventListener("keydown", escListener);
  if (lastFocused) lastFocused.focus();
}

// ESC key handler
function escListener(e) {
  if (e.key === "Escape") {
    closeHowToPlayModal();
  }
}

// Outside click closes modal
howToPlayModal?.addEventListener("click", (e) => {
  if (e.target === howToPlayModal) closeHowToPlayModal();
});

function setPlayButtonsDisabled(disabled) {
  [oneButton, twoButton, threeButton, fourButton, fiveButton].forEach(b => b.disabled = disabled);
}

howToPlayButton.addEventListener("click", openHowToPlay);
closeHowToPlay.addEventListener("click", closeHowToPlayModal);

oneButton.addEventListener("click", function() { update(1); });
twoButton.addEventListener("click", function() { update(2); });
threeButton.addEventListener("click", function() { update(3); });
fourButton.addEventListener("click", function() { update(4); });
fiveButton.addEventListener("click", function() { update(5); });
resetButton.addEventListener("click", resetGame);
