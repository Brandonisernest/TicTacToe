pragma solidity 0.8.10;


contract TicTacToe {

    //enum and structs
    //X = 0, Y = 1
    //the values that get returned are 0 and 1 (don't get confused)
    //placeholder == 0. Pushing X to equal 1 and Y to equal 2 to prevent errors
    enum possibleChoices {placeholder,X, Y}
    //game grid (X,Y) coord
    /*
    One_One == 0,
    Two_One == 1...etc etc
    */

    enum cellChoices {One_One, 
                     Two_One, 
                     Three_One, 
                     One_Two, 
                     Two_Two, 
                     Three_Two,
                     One_Three, 
                     Two_Three, 
                     Three_Three
                     }


    //variables
    //owner
    address public gameMaster;
    //current address eligible to make a move
    address public currentPlayer;
    //Player mapping
    mapping(address => bool) public playerBoolMapping;
    //Amount owned by player
    mapping(address => uint) public playerFundMapping;
    //What team does this player belong to?
    mapping(address => possibleChoices) public teamMapping;
    //total players array
    address[] public totalPlayersArray;
    //team X addresses
    address[] public teamXArray;
    //team Y addresses
    address[] public teamYArray;
    // Win/Loss mapping by player
    mapping(address => uint) public playerRecordMapping;
    //instnatiate possibleChoices enum for team assignment
    possibleChoices public teamAssignment = possibleChoices.X;
    //instantiate possibleChoices enum for gameOrder
    possibleChoices public currentChoice; 
    // necessary?
    possibleChoices constant defaultChoice = possibleChoices.X;
    //Gameboard represented by mapping
    mapping(cellChoices => possibleChoices) public gameBoard;
    //array used to reset gameBoard
    cellChoices[] public gameBoardArray;
    //game status
    bool public hasGameEnded;
    //winner
    possibleChoices public winner;  
    //team placement counter
    uint public teamPlacementCounter = 1;


    //events (put in separate contract?)
    event cellClickedEvent(possibleChoices _choice, uint rowVal, uint colVal);
    event gameOverEvent(string);
    event winningTeamEvent(possibleChoices);
    
    //declare this prior to constructor since I will use in constructor
    function enterPlayerHandler() public {
        //player has entered
        playerBoolMapping[msg.sender] = true;
        //player owns no funds. Their fee is locked up in contract
        playerFundMapping[msg.sender] = 0;
        //player's record is set to zero
        playerRecordMapping[msg.sender] = 0;
        //Get placed into team X or team Y
        if(teamPlacementCounter % 2 != 0){
            teamMapping[msg.sender] = teamAssignment;
            //push player to team X Array
            teamXArray.push(msg.sender);
            //set teamAssignment to Y
            teamAssignment = possibleChoices.Y;
        }
        else {
            teamMapping[msg.sender] = teamAssignment;
            //push player to team Y Array
            teamYArray.push(msg.sender);
            //set teamAssignment to X
            teamAssignment = possibleChoices.X;
        }
        
        //add to total players Array
        totalPlayersArray.push(msg.sender);
        //increment teamPlacementCounter
        teamPlacementCounter++;
    }


    constructor() payable {
        require(msg.value >= 1 wei, "You need to PAY some WEI to PLAY!");
        require(playerBoolMapping[msg.sender] == false, "You are already in the game");
        //set deployer as gameMaser
        gameMaster = msg.sender;
        //set hasGameEnded
        hasGameEnded = false;
        //start game with X (defaultChoice)
        currentChoice = defaultChoice;
        //assign deployer
        enterPlayerHandler();   
    }

    //functions

    function enterContract() public payable {
        require(msg.value >= 1 wei, "You need to PAY some WEI to PLAY!");
        require(playerBoolMapping[msg.sender] == false, "You are already in the game");
        enterPlayerHandler();
    }



    function clickCell(uint _rowNum, uint _colNum) public {
        //require player to be in contract first
        require(playerBoolMapping[msg.sender] == true, "You aren't eligible to play. Enter contract first!");
        // require(_choice == possibleChoices.X || _choice == possibleChoices.Y,"Choose only between X and Y");
        //require that only teamX can go when it is X's turn and vice versa for Y
        // require(teamMapping[msg.sender] == _choice, "You can only choose your team's choices");
        require(teamMapping[msg.sender] == currentChoice, "Not your team's turn");
        //set spot on the grid to target
        cellChoices currentCellChoice;
        currentCellChoice = cellHandler(_rowNum, _colNum);

        //require the gameBoard space be empty
        require(gameBoard[currentCellChoice] != possibleChoices.X && gameBoard[currentCellChoice] != possibleChoices.Y, 
        "That space is already taken");
        
        gameBoard[currentCellChoice] = teamMapping[msg.sender];

        //add selected cell to array (to be used to reset later)
        gameBoardArray.push(currentCellChoice);
        
        //switch current choice
        gameOrder();

        //emit event
        emit cellClickedEvent(teamMapping[msg.sender], _rowNum, _colNum);

        winCondition();
    }

    //helper function

    
    function cellHandler(uint _rowNum, uint _colNum) public pure returns(cellChoices) {
        require(_rowNum > 0 && _rowNum <= 3 && _colNum > 0 &&_colNum <= 3, "keep row and col 3x3");
        cellChoices currentCellChoice;

        if(_rowNum == 1 && _colNum == 1) {
            currentCellChoice = cellChoices.One_One;
        }
        else if(_rowNum == 2 && _colNum == 1) {
            currentCellChoice = cellChoices.Two_One;
        }
        else if(_rowNum == 3 && _colNum == 1) {
            currentCellChoice = cellChoices.Three_One;
        }
        else if(_rowNum == 1 && _colNum == 2) {
            currentCellChoice = cellChoices.One_Two;
        }
        else if(_rowNum == 2 && _colNum == 2) {
            currentCellChoice = cellChoices.Two_Two;
        }
        else if(_rowNum == 3 && _colNum == 2) {
            currentCellChoice = cellChoices.Three_Two;
        }
        else if(_rowNum == 1 && _colNum == 3) {
            currentCellChoice = cellChoices.One_Three;
        }
        else if(_rowNum == 2 && _colNum == 3) {
            currentCellChoice = cellChoices.Two_Three;
        }
        else if(_rowNum == 3 && _colNum == 3) {
            currentCellChoice = cellChoices.Three_Three;
        }
    
        return currentCellChoice;
    }

    /// @notice check the value of a given cell in the gameboard
    function checkGameBoard(uint _rowNum, uint _colNum) public view returns (possibleChoices) {
        
        cellChoices currentCellChoice;
        currentCellChoice = cellHandler(_rowNum, _colNum);

        return gameBoard[currentCellChoice];

    }

    function gameOver() public {
        //emit event that says game over!
        emit gameOverEvent("The game is over!");

        //send funds to winning team

        //reset gameBoard
        clearGameBoard();

        //reset mappings
        teamAssignment = possibleChoices.placeholder;
        for(uint i = 0; i < totalPlayersArray.length; i++){

            address currentAddress = totalPlayersArray[i];
            playerBoolMapping[currentAddress] = false;
            playerFundMapping[currentAddress] = 0;
            teamMapping[currentAddress] = teamAssignment;

        }
        
        //reset game
        resetGame();
    }

    function winCondition() public {
        
        possibleChoices choiceX = possibleChoices.X;
        possibleChoices choiceY = possibleChoices.Y;

        if(
            //row win
            (gameBoard[cellChoices.One_One] == choiceX && gameBoard[cellChoices.Two_One] == choiceX && gameBoard[cellChoices.Three_One] == choiceX) || 
            (gameBoard[cellChoices.One_Two] == choiceX && gameBoard[cellChoices.Two_Two] == choiceX && gameBoard[cellChoices.Three_Two] == choiceX) ||
            (gameBoard[cellChoices.One_Three] == choiceX && gameBoard[cellChoices.Two_Three] == choiceX && gameBoard[cellChoices.Three_Three] == choiceX) ||
            //col win
            (gameBoard[cellChoices.One_One] == choiceX && gameBoard[cellChoices.One_Two] == choiceX && gameBoard[cellChoices.One_Three] == choiceX) ||
            (gameBoard[cellChoices.Two_One] == choiceX && gameBoard[cellChoices.Two_Two] == choiceX && gameBoard[cellChoices.Two_Three] == choiceX) ||
            (gameBoard[cellChoices.Three_One] == choiceX && gameBoard[cellChoices.Three_Two] == choiceX && gameBoard[cellChoices.Three_Three] == choiceX) ||
            //diag win
            (gameBoard[cellChoices.One_One] == choiceX && gameBoard[cellChoices.Two_Two] == choiceX && gameBoard[cellChoices.Three_Three] == choiceX) ||
            (gameBoard[cellChoices.Three_One] == choiceX && gameBoard[cellChoices.Two_Two] == choiceX && gameBoard[cellChoices.One_Three] == choiceX) 
        ){
            //do something
            hasGameEnded = true;
            winner = choiceX;
            emit winningTeamEvent(winner);
            gameOver();
        }
        else if (
            //row win
            (gameBoard[cellChoices.One_One] == choiceY && gameBoard[cellChoices.Two_One] == choiceY && gameBoard[cellChoices.Three_One] == choiceY) || 
            (gameBoard[cellChoices.One_Two] == choiceY && gameBoard[cellChoices.Two_Two] == choiceY && gameBoard[cellChoices.Three_Two] == choiceY) ||
            (gameBoard[cellChoices.One_Three] == choiceY && gameBoard[cellChoices.Two_Three] == choiceY && gameBoard[cellChoices.Three_Three] == choiceY) ||
            //col win
            (gameBoard[cellChoices.One_One] == choiceY && gameBoard[cellChoices.One_Two] == choiceY && gameBoard[cellChoices.One_Three] == choiceY) ||
            (gameBoard[cellChoices.Two_One] == choiceY && gameBoard[cellChoices.Two_Two] == choiceY && gameBoard[cellChoices.Two_Three] == choiceY) ||
            (gameBoard[cellChoices.Three_One] == choiceY && gameBoard[cellChoices.Three_Two] == choiceY && gameBoard[cellChoices.Three_Three] == choiceY) ||
            //diag win
            (gameBoard[cellChoices.One_One] == choiceY && gameBoard[cellChoices.Two_Two] == choiceY && gameBoard[cellChoices.Three_Three] == choiceY) ||
            (gameBoard[cellChoices.Three_One] == choiceY && gameBoard[cellChoices.Two_Two] == choiceY && gameBoard[cellChoices.One_Three] == choiceY) 
        )
        {
            //do something else
            hasGameEnded = true;
            winner = choiceY;
            emit winningTeamEvent(winner);
            gameOver();
        }
        

    }


    function clearGameBoard() public {
        require(hasGameEnded == true, "Can't reset game board until game is finished");
        for (uint i = 0; i < gameBoardArray.length; i++){
            gameBoard[gameBoardArray[i]] = possibleChoices.placeholder;
        }
    }

    //for unit testing purposes
    function setGameEnded() public {
        require(msg.sender == gameMaster, "Only game master can call this.");
        hasGameEnded = true;
    }

    //how to ensure that nobody can call this fucntion? internal?
    function gameOrder() internal {
        if(currentChoice == possibleChoices.X){
            currentChoice = possibleChoices.Y;
        }
        else if(currentChoice == possibleChoices.Y){
            currentChoice = possibleChoices.X;
            }
    }

    //for unit testing purposes
    function getTeam(address _addr) public view returns(possibleChoices){
        return teamMapping[_addr];
    }

    function resetGame() public {
        require(hasGameEnded == true, "Can't reset game until game is finished");

        hasGameEnded = false;
        currentChoice = defaultChoice;
    }

    function getCurrentTurn() public view returns(possibleChoices){
        return currentChoice;
    }

    function getWinner() public view returns(possibleChoices){
        if(hasGameEnded == false){
            revert("The game has not ended");
        } else {
            return winner;
            }
    }

    //code out the transfer later....work on having a workable game first
    // function fundsHandler() public {
    //     uint teamCount;

    //     if(winner == possibleChoices.Y){
    //         teamCount = teamYArray.length;
    //     }
    //     else if(winner == possibleChoices.X){
    //         teamCount = teamXArray.length;
    //     }
    // }.

    
}

/*

Read up on this (pure vs view)
https://www.google.com/search?q=pure+vs+view+function+solidity&oq=pure+vs+view+function+solidity&aqs=chrome..69i57.4375j0j1&sourceid=chrome&ie=UTF-8

//Use this project as opportunity to learn how to make upgradeable contracts

*/
