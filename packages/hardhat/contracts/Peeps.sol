//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./Utils.sol";

contract Peeps is Utils, ERC721("PEEPS","PPS") {
    using Strings for uint256;
    uint256 constant MAX_MINT = 20;
    uint24 constant MAX_COLOR = type(uint24).max; // 0xffffff
    uint256 totalPeeps = 1;

    struct Peep {
        uint256 genes;
        uint256[] grandParents;
        uint256[] parents;
        uint256[] children;
        uint256[] grandChildren;
    }

    function mint() external payable {
        if (totalPeeps > MAX_MINT) revert();
        _safeMint(msg.sender, totalPeeps);
        ++totalPeeps;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return (totalPeeps+tokenId).toString();
    }

    function randomNumber() internal view returns (uint256) {
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
