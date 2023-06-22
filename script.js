'use strict';

// * Buttons
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.game-again');

// * Fields
let message = document.querySelector('.message');
let guessField = document.querySelector('.guess-placeholder');

// * Random Number
let randomNumber = Math.trunc(Math.random() * 20) + 1;

// * Scores
let highScore = 0;
let score = 20;

console.log(randomNumber);

function checkAction() {
  // * Guess
  const guessNumber = Number(document.querySelector('.guess').value);

  // * Guess field is empty
  if (!guessNumber) {
    message.textContent = 'Guess field is empty';
    document.querySelector('.guess').focus();

    // * Guess is true
  } else if (guessNumber === randomNumber) {
    // * Change fields for wins
    message.textContent = '🎉 Guess is true';
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
  } else if (guessNumber > randomNumber) {
    if (score > 1) {
      // * Guess Feedback
      message.textContent = 'Too high';

      // * Score --
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      message.textContent = 'Your lose';
    }
  } else if (guessNumber < randomNumber) {
    if (score > 1) {
      // * Guess Feedback
      message.textContent = 'Too Low';

      // * Score --
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      message.textContent = 'Your lose';
    }
  }
}

function againAction() {
  // * Restore Fields
  message.textContent = 'Start guessing...';
  guessField.textContent = '?';

  document.querySelector('body').style.background = 'hsl(0deg 0% 13.33%)';
  document.querySelector('.guess').value = '';
  document.querySelector('.guess').focus();

  score = 20;
  document.querySelector('.score').textContent = score;
}

checkBtn.addEventListener('click', checkAction);
againBtn.addEventListener('click', againAction);
