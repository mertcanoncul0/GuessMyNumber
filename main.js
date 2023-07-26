const againBtn = document.querySelector('[data-again-btn]');
const guessPlaceholder = document.querySelector('[data-guess-placeholder]');
const playerScore = document.querySelector('[data-player-score]');
const playerHighScore = document.querySelector('[data-player-high-score]');
const playerGuess = document.querySelector('[data-player-guess]');
const checkForm = document.querySelector('[data-check-form]');

// random number (1 and 20)
let randomGuessNumber = Math.floor(Math.random() * 20);
console.log(randomGuessNumber);

// default settings
let score = 20;
let highScore = localStorage.getItem('highScore') || 0;
playerHighScore.innerHTML = highScore;

// Event Functions
function checkFormHandler(e) {
  e.preventDefault();

  // validate
  if (playerGuess.value === '' || playerGuess.value === null) {
    displayMessage('Guess field is empty');
    playerGuess.focus();
  }

  // check Win
  checkWin()
}

function checkWin() {
  if (Number(playerGuess.value) === randomGuessNumber) {
    displayMessage('🤩 Guess is true');
    guessPlaceholder.innerHTML = playerGuess.value;

    // winner style
    document.querySelector('body').classList.remove('start');
    document.querySelector('body').classList.add('matched-guess');
    guessPlaceholder.classList.add('matched-guess');


    // winner score and highscore
    if (score > highScore) {
      highScore = score
      localStorage.setItem('highScore', highScore);
      playerHighScore.innerHTML = highScore;
    }
  }

  // guess is wrong
  if (playerGuess.value !== randomGuessNumber) {
    if (score > 1) {
      displayMessage(playerGuess.value > randomGuessNumber ? 'Too High' : 'Too Low');
      // score down 
      playerScore.innerHTML = --score;
    } else {
      displayMessage('Your Lose');
      document.querySelector('body').classList.add('lose');
      document.querySelector('body').classList.remove('start');
      // score fix
      playerScore.innerHTML = --score;
    }
  }
}

function againHandler() {
  displayMessage('Start guessing...');
  guessPlaceholder.innerHTML = '?';
  score = 20
  playerScore.innerHTML = 20;

  document.querySelector('body').classList.add('start');
  playerGuess.value = '';
  playerGuess.focus();

  randomGuessNumber = Math.floor(Math.random() * 20);

  // reset classes
  document.querySelector('body').classList.remove('matched-guess');
  guessPlaceholder.classList.remove('matched-guess'); 
  document.querySelector('body').classList.remove('lose');
}

function displayMessage(message) {
  document.querySelector('[data-display-message]').innerHTML = message;
}

// Events
checkForm.addEventListener('submit', checkFormHandler);
againBtn.addEventListener('click', againHandler);