//The require input is the contract name, not the solidity file name
const TicTacToe = artifacts.require("TicTacToe");

module.exports = function (deployer) {
  deployer.deploy(TicTacToe, { value: web3.utils.toWei("1","ether"), gas: 5000000});
};
