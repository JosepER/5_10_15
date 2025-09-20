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
        computerScoreDisplay.style.color = "black";
    } else {
        computerTurn.style.display = "block";
        computerTurn.style.color = "green";
        playerTurn.style.display = "none";
        playerScoreDisplay.style.color = "black";
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
            gameOver = true;
        }
    }
    updateTurnUI();
    
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

