
const word = "BLINK".toLowerCase();
let guessedLetters = ["_", "_", "_", "_", "_"];
let score = 0;
let lives = 3;


const feedback = document.getElementById("feedback");
const scoreDisplay = document.querySelector(".score");
const livesDisplay = document.querySelector(".lives");
const wordDisplay = document.querySelector(".word-display");


function submitGuess() {
    const guess = document.getElementById("guess").value.toLowerCase();
    document.getElementById("guess").value = ""; 

   
    if (guess.length === 0) {
        feedback.textContent = "Please enter a letter or word!";
        return;
    }

    
    if (guess.length > 1) {
        if (guess === word) {
            winGame();
        } else {
            loseGame();
        }
        return;
    }

   
    let correct = false;
    for (let i = 0; i < word.length; i++) {
        if (word[i] === guess && guessedLetters[i] === "_") {
            guessedLetters[i] = guess;
            document.getElementById(`letter-${i}`).textContent = guess.toUpperCase();
            correct = true;
        }
    }

    if (correct) {
        score += 20;
        scoreDisplay.textContent = `Score: ${score}`;
        feedback.textContent = "Correct! Keep going!";
        feedback.style.color = "green";

        
        if (!guessedLetters.includes("_")) {
            winGame();
        }
    } else {
        lives--;
        updateLives();
        feedback.textContent = "Incorrect! Try again!";
        feedback.style.color = "red";

        if (lives === 0) {
            loseGame();
        }
    }
}


function updateLives() {
    const hearts = livesDisplay.querySelectorAll(".heart");
    if (hearts.length > lives) {
        hearts[hearts.length - 1].remove();
    }
}


function winGame() {
    feedback.textContent = "Congratulations! You guessed the word!";
    feedback.style.color = "green";
    alert("You won! Great job!");
    resetGame();
}


function loseGame() {
    feedback.textContent = "Game over! Better luck next time!";
    feedback.style.color = "red";
    alert("You lost the game!");
    resetGame();
}


function resetGame() {
    guessedLetters = ["_", "_", "_", "_", "_"];
    score = 0;
    lives = 3;
    scoreDisplay.textContent = "Score: 0";
    feedback.textContent = "";
    livesDisplay.innerHTML = '<span class="heart">❤️</span><span class="heart">❤️</span><span class="heart">❤️</span>';
    for (let i = 0; i < word.length; i++) {
        document.getElementById(`letter-${i}`).textContent = "_";
    }
}