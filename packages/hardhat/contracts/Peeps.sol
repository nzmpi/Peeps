//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Peeps is ERC721("PEEPS","PPS") {
    using Strings for uint256;
    address public owner;
    uint256 totalPeeps = 1;
    uint256 constant MAX_MINT = 20;

    constructor() payable {
        owner = msg.sender;
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
