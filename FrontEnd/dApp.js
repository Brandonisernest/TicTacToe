//detected MM
//The VERY first thing we want in our dAPP is to see if we are connected to a web3 provider
//in our case, we are using MM
window.addEventListener("load", function () {
  if (typeof window.ethereum !== "undefined") {
    console.log("MetaMask detected!");
    let mmDetected = (getElementById = document.getElementById("mm-detected"));
    mmDetected.innerHTML = "MetaMask has been detected!";
  } else {
    console.log("Theres no wallet! Not Available!");
    alert("You need to install MetaMask or another wallet!");
  }
});

//connect MM on click!
const mmEnable = document.getElementById("mm-connect-btn");

mmEnable.onclick = async () => {
  await ethereum.request({ method: "eth_requestAccounts" });

  //get current account
  const mmCurrentAccount = document.getElementById("mm-current-account");
  console.log(mmCurrentAccount);

  mmCurrentAccount.innerHTML =
    "Here's your current account" + ethereum.selectedAddress;
};

//remix contract address deployed on rinkeby
const ssAddress = "0x31245d9434F5Ccc6830Ca07cF52e3dfbe9730341";

//get the ABI from remix
const ssABI = [
  {
    inputs: [],
    stateMutability: "payable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum TicTacToe.possibleChoices",
        name: "_choice",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "rowVal",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "colVal",
        type: "uint256",
      },
    ],
    name: "cellClickedEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "gameOverEvent",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    name: "winningTeamEvent",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rowNum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_colNum",
        type: "uint256",
      },
    ],
    name: "cellHandler",
    outputs: [
      {
        internalType: "enum TicTacToe.cellChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rowNum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_colNum",
        type: "uint256",
      },
    ],
    name: "checkGameBoard",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "clearGameBoard",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "_choice",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "_rowNum",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_colNum",
        type: "uint256",
      },
    ],
    name: "clickCell",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "currentChoice",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentPlayer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "enterContract",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [],
    name: "enterPlayerHandler",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "enum TicTacToe.cellChoices",
        name: "",
        type: "uint8",
      },
    ],
    name: "gameBoard",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "gameBoardArray",
    outputs: [
      {
        internalType: "enum TicTacToe.cellChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameMaster",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameOver",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_addr",
        type: "address",
      },
    ],
    name: "getTeam",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "hasGameEnded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerBoolMapping",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerFundMapping",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "playerRecordMapping",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "setGameEnded",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "teamAssignment",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "teamMapping",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "teamPlacementCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "teamXArray",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "teamYArray",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "totalPlayersArray",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "winCondition",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "winner",
    outputs: [
      {
        internalType: "enum TicTacToe.possibleChoices",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];


/*
1. Click btn to enter game
2. Give a message to let new player know what team they are on
3. Include display to show what team's turn it is
4. Display game over when game is over. Mention winner and such

*/



//global variables
const gameCells = document.querySelectorAll(".cell");
const playerChoices = ["X", "Y"];
let player;
const gameBtn = document.getElementById("game-btn");
//

function gameOver() {
  //winning message!
  alert(`Game Over: Player ${choice} wins!`);
  //clear the board
  gameCells.forEach((cell) => {
    cell.innerHTML = "";
  });
}

//sets the cells
function cellHandler(cell) {
  if (cell.innerHTML != "X" && cell.innerHTML != "Y") {
    cell.innerHTML = player;
    //switch to other player
    gameOrder();
  } else if (cell.innerHTML == "X") {
    //if value is in cell already...don't allow change
    //keep going
    console.log(
      `That spot is taken, try again. Still Player ${player}'s turn'`
    );
  } else if (cell.innerHTML == "Y") {
    //if value is in cell already don't allow change
    //keep going
    console.log(
      `That spot is taken, try again. Still Player ${player}'s turn'`
    );
  }

  winCondition();
}

function gameOrder() {
  if (player == playerChoices[0]) {
    player = playerChoices[1];
  } else {
    player = playerChoices[0];
  }
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
      gameOver();
    }
  }
}

function gameHandler() {
  gameCells.forEach((cell) => {
    cell.addEventListener("click", cellHandler.bind(this, cell));
  });
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

//helper function
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//execute functions
gameBtn.addEventListener("click", gameStart);

//appendix
// gameCells.forEach((cell)=> {
//     cell.addEventListener("click", () => {
//         cell.innerHTML = "Hi";
//     })
// })

//Ask Henry: How to arrow functions work? why do they remove the need to "bind"?
