const TicTacToe = artifacts.require("TicTacToe");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */

contract("TicTacToe", function (accounts) {
  let tttInstance;

  beforeEach(async () => {
    tttInstance = await TicTacToe.deployed();
  });

  // Test deploy
  it("should assert true", async function () {
    await TicTacToe.deployed();
    return assert.isTrue(true);
  });

  // Test enter contract

  it("should allow me to enter contract", async () => {
    await tttInstance.enterContract({
      from: accounts[1],
      value: web3.utils.toWei("1", "Wei"),
      gas: 5000000,
    });

    return assert.isTrue(true);
  });

  // Test cell clicking ("X")
  it("Should result in cell equalling X", async () => {
    let rowVal = 1;
    let colVal = 3;
    let choiceVal = 1;

    //function param (character, row_num, col_num)
    await tttInstance.clickCell(choiceVal, rowVal, colVal, {
      from: accounts[1],
      gas: 5000000,
    });

    const gameBoardVal = await tttInstance.checkGameBoard(rowVal, colVal);
    // console.log(gameBoardVal);
    //I'm using enum
    //1 == Y
    //2 == Y
    return assert.equal(gameBoardVal, 1);
  });

  // Test cell clicking("Y")
  it("Should result in cell equalling Y", async () => {
    let rowVal = 2;
    let colVal = 3;
    let choiceVal = 2;

    //function param (character, row_num, col_num)
    await tttInstance.clickCell(choiceVal, rowVal, colVal, {
      from: accounts[1],
      gas: 5000000,
    });

    const gameBoardVal = await tttInstance.checkGameBoard(rowVal, colVal);
    return assert.equal(gameBoardVal, 2);
  });

  // Test cannot select cell if cell is already taken up

  it("Should not let you selected cell that is already taken up", async () => {
    //these should be already taken in the "it" statement above
    let rowVal = 2;
    let colVal = 3;
    let choiceVal = 1;

    try {
      //this should fail
      await tttInstance.clickCell(choiceVal, rowVal, colVal, {
        from: accounts[1],
        gas: 5000000,
      });
    } catch (err) {
      console.log(`${rowVal} and ${colVal} is already taken...`);
      return assert.isTrue(true);
    }
  });

  //test gameBoardclearing
  it("should clear the entireboard", async() => {
    let rowVal = 2;
    let colVal = 3;
    let choiceVal = 1;

    //call clearGameBoard
    await tttInstance.clearGameBoard({
      from : accounts[0], 
      gas: 5000000});

    const cellVal = await tttInstance.checkGameBoard(rowVal, colVal); 
    //cellVal should be placeholder value (0) now.
    return assert.equal(cellVal, 0);
  })

  // // Test the location of the cell

  // // Test win condition
  // it("Should return win", async () => {
  //   await TicTacToe.winCondition();
  //   return assert.isTrue(true);
  // });
});
