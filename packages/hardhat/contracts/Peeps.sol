//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";
import "./lib/Structs.sol";
import { PeepsMetadata } from "./lib/PeepsMetadata.sol";

contract Peeps is Utils, ERC721("PEEPS","PPS") {
    using Strings for uint256;
    uint256 constant MAX_MINT = 20;
    uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff
    uint64 totalPeeps = 1;
    PeepsMetadata immutable peepsMetadata;

    Peep[] peeps;

    mapping(address => uint64[]) ownedPeeps;
    mapping(uint256 => bool) breedingAllowed; 

    constructor() payable {
      peepsMetadata = new PeepsMetadata();
    }

    function mint() public payable {
      if (totalPeeps > MAX_MINT) revert Errors.NotAllowed();
      if (msg.value < mintingFee) revert Errors.NotAllowed();
      uint256 id = totalPeeps;
      ++totalPeeps;
      uint64[] memory empty = new uint64[](0);
      uint256 genes = getRandomNumber(id);
      uint256 bodyColor1 = genes % MAX_COLOR;
      genes /= 10;
      uint256 bodyColor2 = genes % MAX_COLOR;
      genes /= 10;
      uint256 eyesColor = genes % MAX_COLOR;
      string memory defaultName = string(abi.encodePacked("Peep #", id.toString()));
      (
        uint32 kidTime,
        uint32 adultTime,
        uint32 oldTime
      ) = peepsMetadata.getTimes(genes);

      ownedPeeps[msg.sender].push(uint64(id));
      peeps.push(Peep({
        genes: 1068959084166317779931468101505593319477978013254728142422900659567408100000,
        hasHat: 0,
        breedCount: 0,
        bodyColor1: uint24(bodyColor1),
        bodyColor2: uint24(bodyColor2),
        eyesColor: uint24(eyesColor),
        kidTime: kidTime,
        adultTime: adultTime,
        oldTime: oldTime,
        parents: empty,
        children: empty,
        peepName: defaultName
      }));
      _safeMint(msg.sender, id);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
      return peepsMetadata.tokenURI(peeps[tokenId-1], tokenId);
    }

    function changeName(uint256 tokenId, string calldata newName) external {
      if (!_isApprovedOrOwner(msg.sender, tokenId)) 
        revert Errors.NotOwner();
      Peep storage peep = peeps[tokenId-1];
      if (peep.kidTime < block.timestamp) revert Errors.NotAllowed();
      peep.peepName = newName;
    }

    function breed(uint256 tokenId1, uint256 tokenId2) external payable {
      if (tokenId1 == tokenId2) revert Errors.WrongPeep();
      if (msg.value < breedingFee) revert Errors.NotAllowed();
      if (!isBreedable(tokenId1)) revert Errors.NotAllowed();
      if (!isBreedable(tokenId2)) revert Errors.NotAllowed();

      Peep storage peep1 = peeps[tokenId1-1];
      Peep storage peep2 = peeps[tokenId2-1];
      ++peep1.breedCount;
      ++peep2.breedCount;      
      if (checkForTwins(peep1, peep2)) {
        createKid(tokenId1, peep1, tokenId2, peep2);
        createKid(tokenId2, peep2, tokenId1, peep1);
      } else {
        createKid(tokenId1, peep1, tokenId2, peep2);
      }
    }

    function createKid(uint256 tokenId1, Peep storage peep1, uint256 tokenId2, Peep storage peep2) internal {
      uint256 id = totalPeeps;
      ++totalPeeps;
      uint64[] memory parents = new uint64[](2);
      parents[0] = uint64(tokenId1);
      parents[1] = uint64(tokenId2);
      uint64[] memory empty = new uint64[](0);
      uint256 genes = getRandomNumber(id);
      uint24 bodyColor1;
      uint24 bodyColor2;
      uint24 eyesColor;
      if (genes % 2 == 0) {
        bodyColor1 = peep1.bodyColor1;
        bodyColor2 = peep1.bodyColor2;
        eyesColor = peep2.eyesColor;        
      } else {
        bodyColor1 = peep2.bodyColor1;
        bodyColor2 = peep2.bodyColor2;
        eyesColor = peep1.eyesColor;
      }
      peep1.children.push(uint64(id));
      peep2.children.push(uint64(id));
      
      string memory defaultName = string(abi.encodePacked("Peep #", id.toString()));
      (
        uint32 kidTime,
        uint32 adultTime,
        uint32 oldTime
      ) = peepsMetadata.getTimes(genes);

      ownedPeeps[msg.sender].push(uint64(id));
      peeps.push(Peep({
        genes: genes,
        hasHat: 0,
        breedCount: 0,
        bodyColor1: bodyColor1,
        bodyColor2: bodyColor2,
        eyesColor: eyesColor,
        kidTime: kidTime,
        adultTime: adultTime,
        oldTime: oldTime,
        parents: parents,
        children: empty,
        peepName: defaultName
      }));

      _safeMint(msg.sender, id);
    }

    function checkForTwins(Peep storage peep1, Peep storage peep2) internal view returns (bool) {
      // avoiding division by 0
      uint256 areTwins1 = peep1.genes/(10*(peep1.breedCount + 1)) % 1000;
      uint256 areTwins2 = peep2.genes/(10*(peep2.breedCount + 1)) % 1000;

      // 0.5%
      if (areTwins1 < 5 || areTwins2 < 5) return true;
      else return false;
    }

    function allowBreeding(uint256 tokenId) external {
      if (breedingAllowed[tokenId]) revert Errors.NotAllowed();
      if (!_isApprovedOrOwner(msg.sender, tokenId)) 
        revert Errors.NotAllowed();
      breedingAllowed[tokenId] = true;
    }

    function isBreedable(uint256 tokenId) internal view returns (bool) {
      Peep storage peep = peeps[tokenId-1];
      uint256 time = peep.adultTime;
      if (
        block.timestamp < peep.kidTime || 
        time < block.timestamp
      ) return false;
      if (peep.breedCount > 2) return false;
      return (
        breedingAllowed[tokenId] ||
        _isApprovedOrOwner(msg.sender, tokenId)
        );
    }

    function getPeeps() external view returns (Peep[] memory) {
      return peeps;
    }

    function getOwnedPeeps(address _owner) external view returns (uint64[] memory) {
      return ownedPeeps[_owner];
    }

    function getRandomNumber(uint256 tokenId) internal view returns (uint256) {
    return uint256(keccak256(abi.encode(block.prevrandao, tokenId)));
    /*return uint256(keccak256(abi.encode(
        block.timestamp, 
        blockhash(block.number - 1), 
        msg.sender, 
        address(this)
    )));*/
    }

    function getPeepsMetadata() external view returns (address) {
      return address(peepsMetadata);
    }

    function getTime() external view returns (uint256) {
      return block.timestamp;
    }

    function totalSupply() external view returns (uint256) {
        return totalPeeps-1;
    }
}
