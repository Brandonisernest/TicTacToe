pragma solidity 0.8.10;



contract TicTacToe {

    //enum and structs
    //X = 0, Y = 1
    enum possibleChoices {X, Y}

    //variables
    //owner
    address public gameMaster;
    //current address eligible to make a move
    address public currentPlayer;
    //Player mapping
    mapping(address => bool) public playerRecord;
    //numerical representation of X,Y
    possibleChoices public currentChoice; 
    // necessary?
    possibleChoices constant defaultChoice = possibleChoices.X;


    constructor() payable {
        require(msg.value > 1 wei, "You need to PAY some WEI to PLAY!");
        //set deployer as gameMaser
        gameMaster = msg.sender;
        //start game with X (defaultChoice)
        currentChoice = defaultChoice;
    }

    //functions

    function enterContract() public payable {
        require(msg.value > 1 wei, "You need to PAY some WEI to PLAY!");


    }
    function clickCell() public {}
    
}