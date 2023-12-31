//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./lib/Errors.sol";
import "./lib/Events.sol";
import { IPeepsMetadata } from "./lib/Interfaces.sol";

/**
 * @title Utils
 * @notice a contract with basic functions
 */
contract Utils is Events {
  address public owner;
  address public pendingOwner;
  IPeepsMetadata PM;
  uint256 public mintingFee = 5 ether;
  uint256 public breedingFee = 3 ether;

  // breeding fee of owners, that approved their peeps
  uint256 lockedFunds;
  mapping(address => uint256) public funds;

  /*
   * @dev the 2-stepownership transfer
   */
  function proposeOwner(address newOwner) external payable onlyOwner {
    pendingOwner = newOwner;
    emit OwnerProposed(msg.sender, newOwner);
  }

  function acceptOwnership() external payable {
    if (msg.sender != pendingOwner) revert Errors.NotOwner();
    owner = msg.sender;
    delete pendingOwner;
    emit OwnershipAccepted(msg.sender);
  }

  function changeMintingFee(uint256 newFee) external payable onlyOwner {
    mintingFee = newFee;
    emit MintingFeeChanged(msg.sender, newFee);
  }

  function changeBreedingFee(uint256 newFee) external payable onlyOwner {
    breedingFee = newFee;
    emit BreedingFeeChanged(msg.sender, newFee);
  }

  function changePeepsMetadata(address newPM) external payable onlyOwner {
    PM = IPeepsMetadata(newPM);
    emit PeepsMetadataChanged(msg.sender, newPM);
  }

  function withdraw() external payable onlyOwner {
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
    emit FundsWithdrawn(msg.sender, funds_);
  }

  modifier onlyOwner() {
    if (msg.sender != owner) revert Errors.NotOwner();
    _;
  }
}
