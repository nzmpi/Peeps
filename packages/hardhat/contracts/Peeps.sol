//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";
import "./lib/Structs.sol";

contract Peeps is Utils, ERC721("PEEPS","PPS") {
    using Strings for uint256;
    uint256 constant MAX_MINT = 20;
    uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff

    uint64 totalPeeps = 1;
    uint64[MAX_MINT] mintedPeeps;
    Peep[] peeps;

    mapping(address => uint64[]) ownedPeeps;

    constructor(address _PM) payable { 
      owner = msg.sender; 
      PM = IPeepsMetadata(_PM);
    }

    function mint() external payable {
      uint256 index = checkMint();
      if (msg.value != mintingFee) revert Errors.NotEnoughEth();
      uint256 id = totalPeeps;
      ++totalPeeps;
      mintedPeeps[index] = uint64(id);
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
      ) = PM.getTimes(genes);

      ownedPeeps[msg.sender].push(uint64(id));
      peeps.push(Peep({
        genes: genes,
        isBuried: false,
        breedingAllowed: false,
        breedCount: 0,
        hasHat: 0,
        bodyColor1: uint24(bodyColor1),
        bodyColor2: uint24(bodyColor2),
        eyesColor: uint24(eyesColor),
        birthTime: uint32(block.timestamp),
        kidTime: kidTime,
        adultTime: adultTime,
        oldTime: oldTime,
        parents: [uint64(0), 0],
        children: new uint64[](0),
        peepName: defaultName
      }));

      _safeMint(msg.sender, id);
      emit Events.Mint(msg.sender, id);
    }

    function checkMint() internal view returns (uint256) {
      uint256 id;
      for (uint256 i; i < MAX_MINT;) {
        id = mintedPeeps[i];
        if (id == 0) return i;
        if (peeps[id-1].oldTime < block.timestamp) {
          return i;
        }
        unchecked {++i;}
      }

      revert Errors.NotAllowed();
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
      if (!_exists(tokenId)) revert Errors.NotAllowed();
      return PM.tokenURI(peeps[tokenId-1], tokenId);
    }

    function allTokenURI() external view returns (string[] memory) {
      uint256 len = peeps.length;
      string[] memory URIs = new string[](len);
      if (len == 0) return URIs;
      for (uint256 i; i<len;) {
        URIs[i] = PM.tokenURI(peeps[i], i+1);
        unchecked {++i;}
      }
      return URIs;
    }

    function allOwners() external view returns (address[] memory) {
      uint256 len = peeps.length;
      address[] memory owners = new address[](len);
      if (len == 0) return owners;
      for (uint256 i; i < len;) {
        owners[i] = ownerOf(i+1);
        unchecked {++i;}
      }
      return owners;
    }

    function changeName(uint256 tokenId, string calldata newName) external {
      if (!_isApprovedOrOwner(msg.sender, tokenId)) 
        revert Errors.NotOwner();
      Peep storage peep = peeps[tokenId-1];
      if (peep.kidTime < block.timestamp) revert Errors.NotAllowed();
      peep.peepName = newName;
      emit Events.NameChanged(msg.sender, tokenId, newName);
    }

    function breed(uint256 tokenId1, uint256 tokenId2) external payable {
      if (tokenId1 == tokenId2) revert Errors.WrongPeep();
      uint256 fee = breedingFee;
      if (msg.value != fee) revert Errors.NotEnoughEth();
      if (!isBreedable(tokenId1)) revert Errors.NotAllowed();
      if (!isBreedable(tokenId2)) revert Errors.NotAllowed();
      address ownerOfPeep = _ownerOf(tokenId1);
      uint256 lockedFunds_ = fee*30/100;
      if (ownerOfPeep != msg.sender) {
        funds[ownerOfPeep] += lockedFunds_;
        lockedFunds += lockedFunds_;
      }
      ownerOfPeep = _ownerOf(tokenId2);
      if (ownerOfPeep != msg.sender) {
        funds[ownerOfPeep] += lockedFunds_;
        lockedFunds += lockedFunds_;
      }

      Peep storage peep1 = peeps[tokenId1-1];
      Peep storage peep2 = peeps[tokenId2-1];
      ++peep1.breedCount;
      ++peep2.breedCount;
      bool areTwins = checkForTwins(peep1, peep2);   
      uint256 kid1;
      uint256 kid2;   
      if (areTwins) {
        kid1 = createKid(tokenId1, peep1, tokenId2, peep2);
        kid2 = createKid(tokenId2, peep2, tokenId1, peep1);
      } else {
        kid1 = createKid(tokenId1, peep1, tokenId2, peep2);
      }

      if (areTwins) {
        emit Events.Breed(msg.sender, tokenId1, tokenId2, kid1);
        emit Events.Breed(msg.sender, tokenId1, tokenId2, kid2);
      } else 
        emit Events.Breed(msg.sender, tokenId1, tokenId2, kid1);      
    }

    function createKid(uint256 tokenId1, Peep storage peep1, uint256 tokenId2, Peep storage peep2) internal returns (uint256 id) {
      id = totalPeeps;
      ++totalPeeps;
      uint64[2] memory parents;

      if (tokenId1 < tokenId2) {
        parents = [uint64(tokenId1), uint64(tokenId2)];
      } else parents = [uint64(tokenId2), uint64(tokenId1)];

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
      ) = PM.getTimes(genes);

      ownedPeeps[msg.sender].push(uint64(id));
      peeps.push(Peep({
        genes: genes,
        isBuried: false,
        breedingAllowed: false,
        hasHat: 0,
        breedCount: 0,
        bodyColor1: bodyColor1,
        bodyColor2: bodyColor2,
        eyesColor: eyesColor,
        birthTime: uint32(block.timestamp),
        kidTime: kidTime,
        adultTime: adultTime,
        oldTime: oldTime,
        parents: parents,
        children: new uint64[](0),
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

    function toggleBreeding(uint256 tokenId) external {
      if (!_isApprovedOrOwner(msg.sender, tokenId)) 
        revert Errors.NotAllowed();
      uint256 breedCount = peeps[tokenId-1].breedCount;
      if (
        breedCount == 3 && 
        peeps[tokenId-1].breedingAllowed
      ) {
        
        delete peeps[tokenId-1].breedingAllowed;
      } else if (breedCount == 3) revert Errors.NotAllowed();
      else
        peeps[tokenId-1].breedingAllowed = !peeps[tokenId-1].breedingAllowed;
      emit Events.BreedingChanged(msg.sender, tokenId);
    }

    function isBreedable(uint256 tokenId) internal view returns (bool) {
      Peep storage peep = peeps[tokenId-1];
      if (
        block.timestamp < peep.kidTime || 
        peep.adultTime < block.timestamp
      ) return false;
      if (peep.breedCount > 2) return false;
      return (
        peep.breedingAllowed ||
        _isApprovedOrOwner(msg.sender, tokenId)
        );
    }

    function giftHat(uint256 giverId, uint256 receiverId) external {
      if (!_isApprovedOrOwner(msg.sender, giverId)) revert Errors.NotOwner();
      Peep storage grandPa = peeps[giverId-1];
      if (
        block.timestamp < grandPa.adultTime || 
        grandPa.oldTime < block.timestamp
      ) revert Errors.NotAllowed();
      if (!isGrandKid(giverId, receiverId)) revert Errors.WrongPeep();
      Peep storage grandKid = peeps[receiverId-1];
      grandKid.hasHat = uint24(getRandomNumber(giverId) % MAX_COLOR);
      emit Events.GiftHat(msg.sender, giverId, receiverId);
    }

    function buryPeep(uint256 tokenId) external {
      if (!_isApprovedOrOwner(msg.sender, tokenId)) revert Errors.NotOwner();
      Peep storage peep = peeps[tokenId-1];
      if (peep.isBuried) revert Errors.NotAllowed();
      if (peep.oldTime > block.timestamp) revert Errors.NotAllowed();
      peep.isBuried = true;
      emit Events.Buried(msg.sender, tokenId);
    }

    function isGrandKid(
      uint256 grandPaId, 
      uint256 grandKidId
    ) internal view returns (bool) {
      Peep storage grandPa = peeps[grandPaId-1];
      uint64[] storage kids = grandPa.children;
      uint256 kidsLength = kids.length;
      uint256 grandKidsLength;
      uint64[] storage grandKids;
      for (uint256 i; i < kidsLength;) {
        grandKids = peeps[kids[i]-1].children;
        grandKidsLength = grandKids.length;
        for (uint256 j; j<grandKidsLength;) {
          if (grandKids[j] == grandKidId) return true;
          unchecked {++j;}
        }
        unchecked {++i;}
      }
      return false;
    }

    function getPeeps() external view returns (Peep[] memory) {
      return peeps;
    }

    function getOwnedPeeps(address _owner) external view returns (uint64[] memory) {
      return ownedPeeps[_owner];
    }

    function getMintedPeeps() external view returns (uint64[20] memory) {
      return mintedPeeps;
    }

    function getRandomNumber(uint256 tokenId) internal view returns (uint256) {
      return uint256(keccak256(abi.encode(
        block.prevrandao, 
        blockhash(block.number - 1),
        tokenId,
        msg.sender,
        address(this)
      )));
    }

    function getPeepsMetadatas() external view returns (address,address) {
      return (address(PM), PM.getPM2());
    }

    function totalSupply() external view returns (uint256) {
        return totalPeeps-1;
    }
}
