'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions of elements
score0El.textContent = 0;
score1El.textContent = 0;

// Hides the die until the game begins
diceEl.classList.add('hidden');

// Declaring currectScore outside of Event Listener function so it will persist between dice rolls and player turns
let currentScore = 0;

// Need to track the scores for Player1 and Player2
const scores = [0, 0];

// Need to track the active player for player switch
let activePlayer = 0;

// Need bolean value for the finishing the game
let playing = true;

// Switch player function; doesn't need any arguments and doesn't return anything
const switchPlayer = function () {
  // Reset the score of current player to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Reset the current score
  currentScore = 0;
  // Switch to next player
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality; should only be allowed if playing===true
btnRoll.addEventListener('click', function () {
  // Check if playing===true
  if (playing) {
    // 1. Generate a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2. Display die result
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      // Give current player the updated current score
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// Hold button logic; should only work if playing===true
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      // Stop displaying the die
      diceEl.classList.add('hidden');
      // Alter CSS to indicate winning player
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});
