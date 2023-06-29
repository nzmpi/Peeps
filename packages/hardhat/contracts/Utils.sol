//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./lib/Errors.sol";

contract Utils {
    address public owner;
    address public pendingOwner;

    constructor() payable {
        owner = msg.sender;
    }

    function proposeOwner(address _newOwner) external payable onlyOwner {
        pendingOwner = _newOwner;
    }

    function acceptOwnership() external {
        if (msg.sender != pendingOwner) revert Errors.NotOwner();
        owner = msg.sender;
        delete pendingOwner;
    }

    function withdraw() external onlyOwner {
        (bool s,) = msg.sender.call{value: address(this).balance}("");
        if (!s) revert();
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Errors.NotOwner();
        _;
    }
}
