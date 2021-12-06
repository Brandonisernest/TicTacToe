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
const ssAddress = "0xf17276E87177Ada270aAeC0ec8827e15971af875";

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
    inputs: [],
    name: "getCurrentTurn",
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
    name: "getWinner",
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
    name: "resetGame",
    outputs: [],
    stateMutability: "nonpayable",
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
const gameBtn = document.getElementById("game-btn");
const teamBtn = document.getElementById("team-btn");
const teamTurn = document.getElementById("team-turn");
const teamTurnBtn = document.getElementById("team-turn-btn");

// // assign each front end cell with back end
// const _11 = document.getElementById("1-1");
// const _21 = document.getElementById("2-1");
// const _31 = document.getElementById("3-1");
// //row 2
// const _12 = document.getElementById("1-2");
// const _22 = document.getElementById("2-2");
// const _32 = document.getElementById("3-2");
// //row 3
// const _13 = document.getElementById("1-3");
// const _23 = document.getElementById("2-3");
// const _33 = document.getElementById("3-3");
// //

//////////Instantiate web 3
//instantiate web3 (avoid doing so globally)
const web3 = new Web3(window.ethereum);
//instance of the secret santa (ssABI and ssAddress declared above)
const tttGame = new web3.eth.Contract(ssABI, ssAddress);
//remember that window.ethereum IS MetaMask
tttGame.setProvider(window.ethereum);
///////////

const enterGame = async () => {
  let team;

  const valueInput = document.getElementById("value-input");
  const weiAmt = valueInput.value;

  await tttGame.methods.enterContract().send({
    from: ethereum.selectedAddress,
    value: web3.utils.toWei(weiAmt, "ether"),
    gas: 5000000,
  });

  const playerTeam = await tttGame.methods
    .getTeam(ethereum.selectedAddress)
    .call({ from: ethereum.selectedAddress, gas: 5000000 });

  if (playerTeam == 1) {
    team = "X";
  } else if (playerTeam == 2) {
    team = "Y";
  }
  console.log(`${ethereum.selectedAddress}, you are on team ${team}`);
};

const getTeam = async () => {
  let team;

  const playerTeam = await tttGame.methods
    .getTeam(ethereum.selectedAddress)
    .call({ from: ethereum.selectedAddress, gas: 5000000 });

  if (playerTeam == 1) {
    team = "X";
  } else if (playerTeam == 2) {
    team = "Y";
  } else {
    team = "You arent in the game.";
  }

  console.log(`${ethereum.selectedAddress}, you are on team: ${team}`);
  return team;
};

const clickCell = () => {
  gameCells.forEach((cell) => {
    // cell.addEventListener("click", () => {console.log(rowNum)});
    cell.addEventListener("click", clickCellHandler);
  });
};
//helper functions

const clickCellHandler = async (cell) => {
  //for front end
  // let currentChoice;

  // const turnText = await tttGame.methods
  //   .getCurrentTurn()
  //   .call({ from: ethereum.selectedAddress, gas: 5000000 });

  // if (turnText == 1) {
  //   currentChoice = "X";
  // } else {
  //   currentChoice = "Y";
  // }

  //returns cell's x and y
  let rowNum = cell.target.dataset.x;
  let colNum = cell.target.dataset.y;

  //back end
  await tttGame.methods.clickCell(rowNum, colNum).send({
    from: ethereum.selectedAddress,
    gas: 5000000,
  });
  //front end
  // cell.target.innerHTML = currentChoice;
  //update team turn
  await teamTurnHandler();
  //check win condition
  const winner = await tttGame.methods
    .getWinner()
    .call({ from: ethereum.selectedAddress, gas: 5000000 });

  // //check if there is a winner
  // if (winner) {
  //   //let everybody know who the winner is
  //   alert(winner);
  //   //clear front end game board
  // }
};

const teamTurnHandler = async () => {
  let frontEndTurnText;

  const turnText = await tttGame.methods
    .getCurrentTurn()
    .call({ from: ethereum.selectedAddress, gas: 5000000 });

  if (turnText == 1) {
    frontEndTurnText = "X";
  } else {
    frontEndTurnText = "Y";
  }

  teamTurn.innerHTML = frontEndTurnText;
};

//execute functions

gameBtn.addEventListener("click", enterGame);
teamBtn.addEventListener("click", getTeam);
teamTurnBtn.addEventListener("click", teamTurnHandler);
clickCell();
// console.log(gameCells);

//  _21.addEventListener("click", (ev) => {
//   console.log(ev.target.dataset.x);
// });

/*
to dos:
2. put web3 instantiation in handler function
3. Make contract upgradeable

*/
