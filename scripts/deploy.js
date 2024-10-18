const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("HKGCoin");
    const token = await Token.deploy('1000');
    
    console.log("Alamat Hemi CA Token GW:", token.address);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
