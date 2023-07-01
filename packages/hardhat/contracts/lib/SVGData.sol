//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library SVGData {
  bytes16 internal constant ALPHABET = '0123456789abcdef';

  function getBackground(
    uint256 id, 
    uint24 color1, 
    uint24 color2
  ) internal pure returns (string memory) {
    if (id == 0)
      return string(abi.encodePacked(
        '<path d="M 0 230, 400 180, 400 400, 0 400 z" fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M 0 230, 400 180, 400 0, 0 0 z" fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
    else if (id == 1) 
      return string(abi.encodePacked(
        '<path d="M 0 60, 400 250, 400 400, 0 400 z" fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M 0 60, 400 250, 400 0, 0 0 z" fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
    else if (id == 2)
      return string(abi.encodePacked(
        '<path d="M 0 260 C0 260, 100 112, 400 260 M 400 260, 400 400, 0 400 0 260" fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M 0 260 C0 260, 100 112, 400 260 M 400 260, 400 0, 0 0 0 260" fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
    else
      return string(abi.encodePacked(
        '<path d="M400 200, 400 400, 0 400, 0 260 C100 112, 200 370, 400 200 " fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M400 200, 400 0, 0 0, 0 260 C100 112, 200 370, 400 200 " fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
  }

  function getArms(uint256 leftArm, uint256 rightArm) internal pure returns (string memory) {
    return string(abi.encodePacked(
      
    ));
  }

  function toColor(uint24 color) internal pure returns (string memory) {
    bytes3 value = bytes3(color);
    bytes memory buffer = new bytes(6);
    for (uint256 i = 0; i < 3; i++) {
      buffer[i*2+1] = ALPHABET[uint8(value[i]) & 0xf];
      buffer[i*2] = ALPHABET[uint8(value[i]>>4) & 0xf];
    }    
    return string(buffer);
  }
    
}
