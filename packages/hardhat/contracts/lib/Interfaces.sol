//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./Structs.sol";

interface IERC721short {
  function ownerOf(uint256 tokenId) external view returns (address);
}

interface IPeepsMetadata {
  function getTimes(uint256 genes) external view returns (
    uint32 kidTime,
    uint32 adultTime,
    uint32 oldTime
  );
  function tokenURI(Peep calldata peep, uint256 id) external view returns (string memory);
  function getPM2() external view returns (address);
}