//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library Events {
  event OwnerProposed(address indexed newOwner);
  event OwnershipAccepted(address indexed newOwner);
  event MintingFeeChanged(uint256 newFee);
  event BreedingFeeChanged(uint256 newFee);
  event Mint(address indexed minter, uint256 indexed tokenId);
  event NameChanged(uint256 indexed tokenId, string newName);
  event Breed(
    uint256 indexed peep1, 
    uint256 indexed peep2, 
    uint256 indexed kid
  );
  event BreedingChanged(uint256 indexed tokenId);
  event GiftHat(uint256 indexed giver, uint256 indexed receiver);
}
