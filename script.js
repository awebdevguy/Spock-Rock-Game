import { startConfetti, stopConfetti } from "./confetti.js";

const playerScoreElement = document.getElementById("player-score");
const playerChoiceElement = document.getElementById("player-choice");
const computerScoreElement = document.getElementById("computer-score");
const computerChoiceElement = document.getElementById("computer-choice");
const resultText = document.getElementById("result-text");

const playerRock = document.getElementById("player-rock");
const playerPaper = document.getElementById("player-paper");
const playerScissors = document.getElementById("player-scissors");
const playerLizard = document.getElementById("player-lizard");
const playerSpock = document.getElementById("player-spock");

const computerRock = document.getElementById("computer-rock");
const computerPaper = document.getElementById("computer-paper");
const computerScissors = document.getElementById("computer-scissors");
const computerLizard = document.getElementById("computer-lizard");
const computerSpock = document.getElementById("computer-spock");

const restart = document.getElementById("restart");
const allGameIcons = document.querySelectorAll(".far");

const gestures = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] }
};

let playerScore = 0;
let compScore = 0;
let computerChoice = "";

// Random computer choice
function computerGesture() {
  const randomNumber = Math.ceil(Math.random() * 5);
  switch (randomNumber) {
    case 1:
      computerResponse("paper", computerPaper);
      break;
    case 2:
      computerResponse("rock", computerRock);
      break;
    case 3:
      computerResponse("scissors", computerScissors);
      break;
    case 4:
      computerResponse("lizard", computerLizard);
      break;
    case 5:
      computerResponse("spock", computerSpock);
      break;
    default:
      break;
  }
}

// Computer response
function computerResponse(pickedIcon, iconElement) {
  const ucPickedIcon = uppercaseFirst(pickedIcon);
  computerChoice = pickedIcon;
  iconElement.classList.add("selected");
  computerChoiceElement.textContent = ` --- ${ucPickedIcon}`;
}

// Passing player selection value and styling icons
function select(choice) {
  resetGestures();
  computerGesture();

  // Add selected styling and update player choice
  switch (choice) {
    case "rock":
      findoutWinner(playerRock, gestures.rock);
      break;
    case "paper":
      findoutWinner(playerPaper, gestures.paper);
      break;
    case "scissors":
      findoutWinner(playerScissors, gestures.scissors);
      break;
    case "lizard":
      findoutWinner(playerLizard, gestures.lizard);
      break;
    case "spock":
      findoutWinner(playerSpock, gestures.spock);
      break;
    default:
      break;
  }

  checkResult();
}

// Find out winner
function findoutWinner(iconElement, gesture) {
  iconElement.classList.add("selected");
  playerChoiceElement.textContent = ` --- ${gesture.name}`;
  if (gesture.defeats.includes(computerChoice)) {
    resultText.textContent = "You Won!";
    playerScoreElement.textContent = ++playerScore;
  } else if (computerChoice === gesture.name.toLowerCase()) {
    resultText.textContent = "It's a draw!";
  } else {
    resultText.textContent = "You Lost!";
    computerScoreElement.textContent = ++compScore;
  }
}

// Call functions to process turn
function checkResult() {
  if (playerScore === 10) {
    gameWinner("player");
  } else if (compScore === 10) {
    gameWinner("computer");
  }
}

// Reset game
function resetGame() {
  resetGestures();
  playerScoreElement.textContent = 0;
  playerChoiceElement.textContent = "";
  computerScoreElement.textContent = 0;
  computerChoiceElement.textContent = "";
  playerScore = 0;
  compScore = 0;
  resultText.textContent = "";
  
  // Enable pointer events
  Object.keys(allGameIcons).forEach(key => {
    allGameIcons[key].style.pointerEvents = "auto";
  });
  stopConfetti();
}

// Reset all selected icons
function resetGestures() {
  allGameIcons.forEach(icon => {
    icon.classList.remove("selected");
  });
}

// Uppercase first letter of text
function uppercaseFirst(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Game winner
function gameWinner(winner) {
  if (winner === "player") {
    resultText.textContent = "Congrats, you won the game!!!";
    startConfetti();
  } else {
    resultText.textContent = "Sorry, you lost the game.";
  }

  // Disable pointer events
  Object.keys(allGameIcons).forEach(key => {
    allGameIcons[key].style.pointerEvents = "none";
  });
}

playerRock.addEventListener("click", function () {
  select("rock");
});
playerPaper.addEventListener("click", function () {
  select("paper");
});
playerScissors.addEventListener("click", function () {
  select("scissors");
});
playerLizard.addEventListener("click", function () {
  select("lizard");
});
playerSpock.addEventListener("click", function () {
  select("spock");
});
restart.addEventListener("click", resetGame);
