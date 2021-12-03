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
    // Win/Loss mapping by player
    mapping(address => uint) public playerRecordMapping;
    //numerical representation of X,Y
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


    //events (put in separate contract?)
    event cellClickedEvent(possibleChoices _choice, uint rowVal, uint colVal);
    event gameOverEvent(string);
    

    constructor() payable {
        require(msg.value >= 1 wei, "You need to PAY some WEI to PLAY!");
        //set deployer as gameMaser
        gameMaster = msg.sender;
        //set hasGameEnded
        hasGameEnded = false;
        //start game with X (defaultChoice)
        currentChoice = defaultChoice;

    }

    //functions

    function enterContract() public payable {
        require(msg.value >= 1 wei, "You need to PAY some WEI to PLAY!");
        //player has entered
        playerBoolMapping[msg.sender] = true;
        //player owns no funds. Their fee is locked up in contract
        playerFundMapping[msg.sender] = 0;
        //player's record is set to zero
        playerRecordMapping[msg.sender] = 0;
    }


    /// @param _choice is X or Y
    function clickCell(possibleChoices _choice, uint _rowNum, uint _colNum) public {
        //require player to be in contract first
        require(playerBoolMapping[msg.sender] == true, "You aren't eligible to play. Enter contract first!");
        require(_choice == possibleChoices.X || _choice == possibleChoices.Y,"Choose only between X and Y");
        //set spot on the grid to target
        cellChoices currentCellChoice;
        currentCellChoice = cellHandler(_rowNum, _colNum);

        //require the gameBoard space be empty
        require(gameBoard[currentCellChoice] != possibleChoices.X && gameBoard[currentCellChoice] != possibleChoices.Y, 
        "That space is already taken");
        
        gameBoard[currentCellChoice] = _choice;
        //add selected cell to array (to be used to reset later)
        gameBoardArray.push(currentCellChoice);

        //emit event
        emit cellClickedEvent(_choice, _rowNum, _colNum);
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
        //reset gameBoard
        clearGameBoard();
        //send funds to winning team
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
    
}

//Right now I am basing this on strings for easier readibility
/*

Read up on this (pure vs view)
https://www.google.com/search?q=pure+vs+view+function+solidity&oq=pure+vs+view+function+solidity&aqs=chrome..69i57.4375j0j1&sourceid=chrome&ie=UTF-8

*/