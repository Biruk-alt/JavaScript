"use strict";

const score0EL = document.querySelector(".score-0");
const score1EL = document.querySelector(".score-1");
const diceEL = document.querySelector(".dice");
let current0 = document.querySelector(".currentscore0");
let current1 = document.querySelector(".currentscore1");
const player0EL = document.querySelector(".player-0");
const player1EL = document.querySelector(".player-1");

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

let currentScore, activePlayer, score, playing;

const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0.textContent = 0;
  current1.textContent = 0;

  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  document.querySelector(`.player-0`).classList.add("active-player");
  document.querySelector(`.player-1`).classList.remove("active-player");
  diceEL.classList.remove("hidden");
  diceEL.classList.add("hidden");
  player0EL.classList.remove("winner");
  player1EL.classList.remove("winner");

};

init();

const switchPlayer = function () {
  document.querySelector(`.currentscore${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0EL.classList.toggle("active-player");
  player1EL.classList.toggle("active-player");
};

diceEL.classList.add("hidden");

btnRoll.addEventListener("click", function () {
  if (playing) {
    let dice = Math.floor(Math.random() * 6) + 1;

    diceEL.classList.remove("hidden");
    diceEL.src = `./images/dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.querySelector(`.currentscore${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.querySelector(`.score-${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      document.querySelector(`.player-${activePlayer}`).classList.add("winner");
      diceEL.classList.add("hidden");
      playing = false;
    } else [switchPlayer()];
  }
});

btnNew.addEventListener("click", init);
