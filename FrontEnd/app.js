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

//sets the cells
function cellHandler(cell) {
  //establish game order
  gameOrder();
  //ossify player choice
  if (cell.innerHTML != "X" && cell.innerHTML != "Y") {
    cell.innerHTML = player;
  } else if (cell.innerHTML == "X") {
    //if value is in cell already...don't allow change
  } else if (cell.innerHTML == "Y") {
    //if value is in cell already don't allow change
  }
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

  //start game
  gameHandler();
}

function gameOrder() {
  if (player == playerChoices[0]) {
    player = playerChoices[1];
  } else {
    player = playerChoices[0];
  }
}

function gameHandler() {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", cellHandler.bind(this, cell));
  });

  winCondition();
}

function gameOver() {
  alert("Game is over!");
  gameStart();
  gameHandler();
}

function winCondition() {
  //declare individual boxes
  //row 1
  const _11 = document.getElementById("1-1");
  const _21 = document.getElementById("2-1");
  const _31 = document.getElementById("3-1");
  //row 2
  const _12 = document.getElementById("1-2");
  const _22 = document.getElementById("2-2");
  const _32 = document.getElementById("3-2");
  //row 3
  const _13 = document.getElementById("1-3");
  const _23 = document.getElementById("2-3");
  const _33 = document.getElementById("3-3");

  //if 3 rows, cols, diagonols happen. Win
  for (choice of playerChoices) {
    if (
      //row win
      (_11.innerHTML == choice &&
        _21.innerHTML == choice &&
        _31.innerHTML == choice) ||
      (_12.innerHTML == choice &&
        _22.innerHTML == choice &&
        _32.innerHTML == choice) ||
      (_13.innerHTML == choice &&
        _23.innerHTML == choice &&
        _33.innerHTML == choice) ||
      //column win
      (_11.innerHTML == choice &&
        _12.innerHTML == choice &&
        _13.innerHTML == choice) ||
      (_21.innerHTML == choice &&
        _22.innerHTML == choice &&
        _23.innerHTML == choice) ||
      (_31.innerHTML == choice &&
        _32.innerHTML == choice &&
        _33.innerHTML == choice) ||
      //diag win
      (_11.innerHTML == choice &&
        _22.innerHTML == choice &&
        _33.innerHTML == choice) ||
      (_31.innerHTML == choice &&
        _22.innerHTML == choice &&
        _13.innerHTML == choice)
    ) {
      console.log(`Player ${choice} wins!`);
      gameOver();
    }
  }
}
//helper function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//execute functions
gameBtn.addEventListener("click", gameStart);
// gameHandler();

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

// const test = document.getElementById("1-1");
// test.addEventListener("click", () => {
//   console.log("hi");
// });

// for (choice of playerChoices){
//     console.log(choice);
// }
