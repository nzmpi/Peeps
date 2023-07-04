//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./lib/Errors.sol";
import "./lib/Events.sol";

contract Utils {
    address public owner;
    address public pendingOwner;
    uint256 public mintingFee = 0.05 ether;
    uint256 public breedingFee = 0.02 ether;

    uint256 lockedFunds;
    mapping(address => uint256) public funds;

    constructor() payable {
        owner = msg.sender;
    }

    function proposeOwner(address newOwner) external payable onlyOwner {
        pendingOwner = newOwner;
        emit Events.OwnerProposed(newOwner);
    }

    function acceptOwnership() external {
        if (msg.sender != pendingOwner) revert Errors.NotOwner();
        owner = msg.sender;
        delete pendingOwner;
        emit Events.OwnershipAccepted(msg.sender);
    }

    function changeMintingFee(uint256 newFee) external onlyOwner {
        mintingFee = newFee;
        emit Events.MintingFeeChanged(newFee);
    }

    function changeBreedingFee(uint256 newFee) external onlyOwner {
        breedingFee = newFee;
        emit Events.BreedingFeeChanged(newFee);
    }

    function withdraw() external onlyOwner {
        (bool s,) = msg.sender.call{value: address(this).balance - lockedFunds}("");
        if (!s) revert();
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Errors.NotOwner();
        _;
    }
}
