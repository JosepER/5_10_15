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

let playerScore = 0;
let computerScore = 0;
let opponentMoveValue = 0;
let currentPlayer = "player";
let gameOver = false;

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
        computerTurn.style.display = "block";
        computerTurn.style.color = "green";
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
    // Game logic would go here if needed
    if (gameOver){
        alert("Game Over!"); // Add later on who won
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
oneButton.addEventListener("click", function() { update(1); });
twoButton.addEventListener("click", function() { update(2); });
threeButton.addEventListener("click", function() { update(3); });
fourButton.addEventListener("click", function() { update(4); });
fiveButton.addEventListener("click", function() { update(5); });

function render() {
    // Rendering logic would go here if needed
}   


        // // Uptate scores
        // playerScoreDisplay.textContent = playerScore;
        // computerScoreDisplay.textContent = computerScore;

        // // Check for win condition
        // if (playerScore > 10) {
        //     gameOver = true;
        // } else if (computerScore > 10) {
        //     gameOver = true;
        // }

