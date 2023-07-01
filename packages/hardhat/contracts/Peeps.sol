//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";
import "./lib/Structs.sol";
import { PeepsMetadata } from "./lib/PeepsMetadata.sol";
import "./lib/SVGData.sol";

contract Peeps is Utils, ERC721("PEEPS","PPS") {
    using Strings for uint256;
    uint256 constant MAX_MINT = 20;
    uint64 totalPeeps = 1;    

    Peep[] public peeps;

    mapping(address => uint64[]) public ownedPeeps;

    function mint() external payable {
      if (totalPeeps > MAX_MINT) revert();
      uint256 id = totalPeeps;
      _safeMint(msg.sender, id);
      ++totalPeeps;
      uint64[] memory empty = new uint64[](0);
      uint256 genes = getRandomNumber();
      string memory defaultName = string(abi.encodePacked("Peep #", id.toString()));
      (
        uint32 kidTime,
        uint32 adultTime,
        uint32 oldTime
      ) = PeepsMetadata.getTimes(genes);

      ownedPeeps[msg.sender].push(uint64(id));
      peeps.push(Peep({
        genes: genes,
        hasHat: 0,
        kidTime: kidTime,
        adultTime:adultTime,
        oldTime: oldTime,
        parents: empty,
        children: empty,
        grandChildren: empty,
        name: defaultName
      }));
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
      return PeepsMetadata.tokenURI(peeps[tokenId-1]);
    }

    function getRandomNumber() internal view returns (uint256) {
    return uint256(keccak256(abi.encode(
        block.timestamp, 
        blockhash(block.number - 1), 
        msg.sender, 
        address(this)
    )));
    }

    function totalSupply() external view returns (uint256) {
        return totalPeeps-1;
    }
}
