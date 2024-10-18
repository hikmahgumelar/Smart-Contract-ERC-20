/** @type import('hardhat/config').HardhatUserConfig */
require('dotenv').config()
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.20",
  networks: {
    hemi: {
      url: "http://45.154.1.230:80",
      chainId: 31337,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
  }
};
