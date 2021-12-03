pragma solidity 0.8.10;



contract TicTacToe {

    //enum and structs
    //X = 0, Y = 1
    enum possibleChoices {X, Y}
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


    constructor() payable {
        require(msg.value >= 1 wei, "You need to PAY some WEI to PLAY!");
        //set deployer as gameMaser
        gameMaster = msg.sender;
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

        //set spot on the grid to target
        cellChoices currentCellChoice;
        currentCellChoice = cellHandler(_rowNum, _colNum);

        //require the gameBoard space be empty
        require(gameBoard[currentCellChoice] != possibleChoices.X && gameBoard[currentCellChoice] != possibleChoices.Y, 
        "That space is already taken");
        
        gameBoard[currentCellChoice] = _choice;
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

    //concats numbers to strings (shall I make this "cellNumber" eventually?)..keep sep for now
    // function append(string memory a, string memory b) internal pure returns (string memory) {
    //     return string(abi.encodePacked(a, b));
    // }

    // //given row number outputs to _cellNumber
    // function cellNumber(string memory _rowNum, string memory _colNum) public view returns(string memory) {
    //     return append(_rowNum, _colNum); 
    // }
    
}

//Right now I am basing this on strings for easier readibility
/*

Read up on this (pure vs view)
https://www.google.com/search?q=pure+vs+view+function+solidity&oq=pure+vs+view+function+solidity&aqs=chrome..69i57.4375j0j1&sourceid=chrome&ie=UTF-8

*/