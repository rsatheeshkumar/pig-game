/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScores, activePlayer, gamPlaying;
init();
var lastDice;

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1.Random NUmber
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    console.log(dice1, dice2);

    //2.Display result

    /*     var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "dice-" + dice1 + ".png";
    diceDOM.src = "dice-" + dice2 + ".png"; */

    document.getElementById("dice-1").style.display = "block";
    document.getElementById("dice-2").style.display = "block";
    document.getElementById("dice-1").src = "dice-" + dice1 + ".png";
    document.getElementById("dice-2").src = "dice-" + dice2 + ".png";

    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      console.log(roundScore);
    } else {
      //next player   ->DrY
      nextPlayer();
    }

    //3. Update the round score
    /* if (dice === 6 && lastDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector("#score-" + activePlayer).textContent = "0";
      nextPlayer();
    } else if (dice !== 1) {
      //add score
      roundScore += dice;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
      // console.log(roundScore);
    } else {
      //next player   ->DrY
      nextPlayer();
    }
    lastDice = dice;
    */
  }
});
//DRY-->

document.querySelector(".btn-hold").addEventListener("click", function () {
  //add current score to global score
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    //update UI
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];
    var input = document.querySelector(".final-score").value;
    // console.log(input);
    var winningScore;
    // input field
    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }

    //check if player is won

    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "winner!";
      document.querySelector(".dice").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
});

//---->
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // document.querySelector(".player-0-panel").classList.remove("active");
  // document.querySelector(".player-1-panel").classList.add("active");

  //==============> OR

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

//new game

document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";

  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "player 0";
  document.getElementById("name-1").textContent = "player 1";

  document.querySelector(".player-" + 0 + "-panel").classList.remove("winner");

  document.querySelector(".player-" + 1 + "-panel").classList.remove("winner");

  document.querySelector(".player-" + 0 + "-panel").classList.remove("active");

  document.querySelector(".player-" + 1 + "-panel").classList.remove("active");

  document.querySelector(".player-" + 0 + "-panel").classList.add("active");
}
