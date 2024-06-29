'use strict';

// * Buttons
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.game-again');

// * Fields
let guessField = document.querySelector('.guess-placeholder');

// * Random Number
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// * Scores
let highScore = 0;
let score = 20;

function displayMessage(message) {
  document.querySelector('.message').textContent = message;
}

function checkAction() {
  // * Guess
  const guessNumber = Number(document.querySelector('.guess').value);

  // * Guess field is empty
  if (!guessNumber) {
    displayMessage('Guess field is empty');
    document.querySelector('.guess').focus();

    // * Guess is true
  } else if (guessNumber === randomNumber) {
    // * Change fields for wins
    displayMessage('🎉 Guess is true');
    guessField.textContent = guessNumber;

    // * Change Styles for wins
    guessField.style.width = '18rem';
    guessField.style.right = '42.2%';

    document.querySelector('body').style.background =
      'hsl(106.11deg 43.2% 49.02%)';

    // * Change high score
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // * Guess is wrong
  } else if (guessNumber !== randomNumber) {
    if (score > 1) {
      // * Guess Feedback
      displayMessage(guessNumber > randomNumber ? 'Too high' : 'Too Low');

      // * Score Down
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      displayMessage('Your lose');
      document.querySelector('body').style.background =
        'hsl(0deg 77.1% 47.21%)';
    }
  }
}

function againAction() {
  // * Restore Fields
  displayMessage('Start guessing...');
  guessField.textContent = '?';
  score = 20;
  document.querySelector('.score').textContent = score;

  // * Restore Styles
  document.querySelector('body').style.background = 'hsl(0deg 0% 13.33%)';
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').focus();

  // * Again Random Number
  randomNumber = Math.trunc(Math.random() * 20) + 1;
}

// * Event Listeners
/// * Click
checkBtn.addEventListener('click', checkAction);
againBtn.addEventListener('click', againAction);

function keyDownAction(e) {
  if (e.key === 'Enter') {
    checkAction();
  } else if (e.key === 'Escape') {
    againAction();
  }
}

/// * Keydown
document.querySelector('.guess').addEventListener('keydown', keyDownAction);
