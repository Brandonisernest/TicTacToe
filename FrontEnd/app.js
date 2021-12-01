/* 
1. loop through each cell
2. assign eventlistener to each one
*/

//global variables
const gameCells = document.querySelectorAll(".cell");
const playerChoices = ["X", "Y"];
let player;
const gameBtn = document.getElementById("game-btn");
//

function cellHandler(cell) {
  cell.innerHTML = player;
}

function gameStart() {
  //randomize starting player
  if (getRandomInt(2) == 0) {
    player = playerChoices[0];
  } else {
    player = playerChoices[1];
  }
  //clear the board
  gameCells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

function gameOrder() {
  if (player == playerChoice[0]) {
    player = playerchoice[1];
  } else {
    player = playerChoice[0];
  }
}

function gameHandler() {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", cellHandler.bind(this, cell));
  });
}
//helper function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//execute functions
gameBtn.addEventListener("click", gameStart);
gameHandler();

//appendix
// gameCells.forEach((cell)=> {
//     cell.addEventListener("click", () => {
//         cell.innerHTML = "Hi";
//     });
// })

//testing
// for (let i = 0; i < 100; i++){
//     console.log(getRandomInt(2));
// }

//Ask Henry: How to arrow functions work? why do they remove the need to "bind"?
