//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./lib/Errors.sol";
import "./lib/Events.sol";
import { IPeepsMetadata } from "./lib/Interfaces.sol";

contract Utils {
    address public owner;
    address public pendingOwner;
    IPeepsMetadata PM;
    uint256 public mintingFee = 0.05 ether;
    uint256 public breedingFee = 0.02 ether;

    uint256 lockedFunds;
    mapping(address => uint256) public funds;

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

    function changePeepsMetadata(address newPM) external onlyOwner {
        PM = IPeepsMetadata(newPM);
        emit Events.PeepsMetadataChanged(newPM);
    }

    function changeBreedingFee(uint256 newFee) external onlyOwner {
        breedingFee = newFee;
        emit Events.BreedingFeeChanged(newFee);
    }

    function withdraw() external onlyOwner {
        (bool s,) = msg.sender.call{value: address(this).balance - lockedFunds}("");
        if (!s) revert();
    }

    function withdrawFunds() external {
      uint256 funds_ = funds[msg.sender];
      if (funds_ == 0) revert Errors.NotEnoughEth();
      delete funds[msg.sender];
      lockedFunds -= funds_;
      (bool s,) = msg.sender.call{value: funds_}("");
      if (!s) revert();
    }

    modifier onlyOwner() {
        if (msg.sender != owner) revert Errors.NotOwner();
        _;
    }
}
