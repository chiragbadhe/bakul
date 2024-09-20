require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/contracts");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    // Network configuration goes here
  },
  etherscan: {
    // Etherscan configuration goes here
  },
};
