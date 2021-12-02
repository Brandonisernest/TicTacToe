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

  // Test cell clicking ("X")
  it("Should result in cell equalling X", async() => {
    //function param (character, row_num, col_num)
    const cellVal = await TicTacToe.clickCell("X",1,3);
    return assert.equal(cellVal, ("X", 1, 3));
  });

  // Test cell clicking("Y")
  it("Should result in cell equalling Y", async() => {
    //function param (character, row_num, col_num)
    const cellVal = await TicTacToe.clickCell("Y", 3, 1);
    return assert.equal(cellVal, ("Y", 3, 1));

  });

  // Test win condition
  it("Should return win", async () => {
    await TicTacToe.winCondition();
    return assert.isTrue(true)l
  });

  
});
