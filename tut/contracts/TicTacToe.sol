pragma solidity 0.8.10;



contract TicTacToe {

    //enum and structs
    //X = 0, Y = 1
    enum possibleChoices {X, Y}
    //game grid (X,Y) coord
    enum cellChoices {One_One, 
                     Two_One, 
                     Three_One, 
                     One_Two, 
                     Two_Two, 
                     Three_Two,
                     One_Three, 
                     Two_Three, 
                     Three_Three}




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
    function clickCell(possibleChoices _choice, string memory _rowNum, string memory _colNum) public {
        //require player to be in contract first
        require(playerBoolMapping[msg.sender] == true, "You aren't eligible to play. Enter contract first!");
        
        //concat _rownNum and _colNum into one string
        string memory cellNum = cellNumber(_rowNum, _colNum);
    }

    //helper function

    function cellHandler(uint _rowNum, uint _colNum) public pure returns(cellChoices) {
        cellChoices currentCellChoice;

        if(_rowNum == 1 && _colNum == 1) {
            currentCellChoice = cellChoices.One_One;
        }

        return currentCellChoice;

    }

    //concats numbers to strings (shall I make this "cellNumber" eventually?)..keep sep for now
    function append(string memory a, string memory b) internal pure returns (string memory) {
        return string(abi.encodePacked(a, b));
    }

    //given row number outputs to _cellNumber
    function cellNumber(string memory _rowNum, string memory _colNum) public view returns(string memory) {
        return append(_rowNum, _colNum); 
    }
    
}

//Right now I am basing this on strings for easier readibility