//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Events {
  event OwnerProposed(address indexed sender, address indexed newOwner);
  event OwnershipAccepted(address indexed newOwner);
  event MintingFeeChanged(address indexed sender, uint256 newFee);
  event BreedingFeeChanged(address indexed sender, uint256 newFee);
  event PeepsMetadataChanged(address indexed sender, address newPM);
  event Mint(address indexed minter, uint256 indexed tokenId);
  event NameChanged(address indexed sender, uint256 indexed tokenId, string newName);
  event Breed(
    address sender, 
    uint256 indexed peep1, 
    uint256 indexed peep2, 
    uint256 indexed kid
  );
  event BreedingChanged(address indexed sender, uint256 indexed tokenId);
  event GiftHat(address indexed sender, uint256 indexed giverId, uint256 indexed receiverId);
  event Buried(address indexed sender, uint256 indexed tokenId);
  event FundsWithdrawn(address indexed sender, uint256 amount);
}
