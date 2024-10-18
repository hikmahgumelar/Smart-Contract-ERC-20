// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HKGCoin is ERC20 {
    uint constant initialSupply = 100 * (10**18);
    constructor(uint256 initialSupply) ERC20("HKGCoin", "HKG") {
        _mint(msg.sender, initialSupply);
    }
}
