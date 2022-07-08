//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GLDToken is ERC20 {
    constructor() ERC20("Gold", "GLD") {
        _mint(msg.sender, 1000000000000000000000);
    }

    function _mintMinerReward() internal {
        _mint(block.coinbase, 1000);
    }

    function _beforeTokenTransfer(address from, address to, uint256 value) internal virtual override {
        if(!(from == address(0) && to == block.coinbase)) {
            _mintMinerReward();
        }
        super._beforeTokenTransfer(from, to, value);
    }
}