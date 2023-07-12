//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import "./Structs.sol";
import "./Constants.sol";

/**
 * @title PeepsMetadata (part 2)
 * @notice all functions are pure 
 */
contract PeepsMetadata2 {
  using Strings for uint256;
  bytes16 internal constant ALPHABET = '0123456789abcdef';

  /**
   * @dev returns the attributes of a peep
   */
  function getAttributes(Peep calldata peep) external pure returns (string memory attributes) {
    uint256 genes = peep.genes;
    uint256 x1;
    uint256 x2;
    uint256 x3;

    attributes = string(abi.encodePacked(attributes,
      '[{"trait_type": "Birth time", "value": "',
      uint256(peep.birthTime).toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Adulthood", "value": "',
      uint256(peep.kidTime).toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Old age", "value": "',
      uint256(peep.adultTime).toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Death", "value": "',
      uint256(peep.oldTime).toString(),
      '"},'
    ));

    // background
    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10;
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background type", "value": "',
      x1.toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background color 1", "value": "#',
      toColor(uint24(x2)),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background color 2", "value": "#',
      toColor(uint24(x3)),
      '"},'
    ));

    // arms
    genes /= 10;
    x1 = genes % 2;
    genes /= 10;
    x2 = genes % 2;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Is left arm animated", "value": "',
      boolToString(x1),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Is right arm animated", "value": "',
      boolToString(x2),
      '"},'
    ));

    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_ARMS;
    genes /= 10;
    x2 = genes % Constants.NUMBER_OF_ARMS;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Left arm type", "value": "',
      x1.toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Right arm type", "value": "',
      x2.toString(),
      '"},'
    ));

    // body colors
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Body color 1", "value": "#',
      toColor(peep.bodyColor1),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Body color 2", "value": "#',
      toColor(peep.bodyColor2),
      '"},'
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_EYEBROWS;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Eyebrows type", "value": "',
      x1.toString(),
      '"},'
    ));

    // eyes
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Eye color", "value": "#',
      toColor(peep.eyesColor),
      '"},'
    ));

    // moustache
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUSTACHE;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Moustache type", "value": "',
      x1.toString(),
      '"},'
    ));

    // mouth
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUTHS;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Mouth type", "value": "',
      x1.toString(),
      '"},'
    ));

    // hat
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Hat type", "value": "',
      getHatTrait(peep.hasHat),
      '"}'
    ));

    attributes = string(abi.encodePacked(attributes,
      ']'
    ));
  }

  /**
   * @dev rreturns the SVG image of a gravestone
   */
  function getGravestone(Peep calldata peep, address peepOwner) external pure returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;

    // background
    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    svg = getBackground(x1, uint24(x2), uint24(x3));

    // gravestone
    svg = string(abi.encodePacked(svg,
      '<rect width="250" height="15" x="80" y="350" fill="grey" stroke="black"/><path d="M80 350, 330 350, 310 340, 100 340 z" fill="grey" stroke="black"/><path d="M110 345, 300 345, 300 120, 270 120, 205 100, 140 120, 110 120 z" fill="grey" stroke="black"/><path d="M140 120 C210 40, 270 120, 270 120" fill="grey" stroke="black"/>'
    ));
    
    // traits style
    svg = string(abi.encodePacked(svg,
      '<style>.trait { fill: black; font-family: serif; font-size: 16px; }</style><style>.value { fill: black; font-family: serif; font-size: 13px; }</style>'
    ));

    svg = string(abi.encodePacked(svg,
      '<text x="125" y="160" class="trait">',
      'Name: </text><text x="185" y="160" class="value">',
      getFittingName(peep.peepName),
      '</text>'
    ));

    svg = string(abi.encodePacked(svg,
      '<text x="125" y="190" class="trait">',
      'Owner: </text><text x="190" y="190" class="value">',
      addressToString(peepOwner),
      '</text>'
    ));  

    svg = string(abi.encodePacked(svg,
      '<text x="125" y="220" class="trait">',
      'Lifetime: </text><text x="203" y="220" class="value">',
      '~ ',
      getLifetime(peep.birthTime, peep.oldTime).toString(),
      ' h',
      '</text>'
    )); 

    uint64[] memory arr = new uint64[](2);
    arr[0] = peep.parents[0];
    arr[1] = peep.parents[1];
    svg = string(abi.encodePacked(svg,
      '<text x="125" y="250" class="trait">',
      'Parents: </text><text x="198" y="250" class="value">',
      arrayToString(arr),
      '</text>'
    ));

    arr = peep.children;
    svg = string(abi.encodePacked(svg,
      '<text x="125" y="280" class="trait">',
      'Kids: </text><text x="175" y="280" class="value">',
      arrayToString(arr),
      '</text>'
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      getGravestoneHat(peep.hasHat)
    ));
  }

  function getBackground(
    uint256 background,
    uint24 color1,
    uint24 color2
  ) public pure returns (string memory) {
    if (background == 0)
      return string(abi.encodePacked(
        '<path d="M 0 230, 400 180, 400 400, 0 400 z" fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M 0 230, 400 180, 400 0, 0 0 z" fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
    else if (background == 1) 
      return string(abi.encodePacked(
        '<path d="M 0 60, 400 250, 400 400, 0 400 z" fill="#',
        toColor(color1),
        '" stroke="black"/>',
        '<path d="M 0 60, 400 250, 400 0, 0 0 z" fill="#',
        toColor(color2),
        '" stroke="black"/>'
      ));
    else if (background == 2)
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

  function getGravestoneHat(uint256 hat) internal pure returns (string memory) {
    if (hat == 0) return '';
    uint256 hatType = hat % Constants.NUMBER_OF_HATS;
    string memory color = toColor(uint24(hat));
    if (hatType == 0) return string(abi.encodePacked(
      '<ellipse cx="210" cy="85" rx="50" ry="10" fill="#',
      color,
      '" stroke="black"/><path d="M180 83 A120 900 0 0 1 240 83" fill="#',
      color,
      '" stroke="black"/>'));
    else if (hatType == 1) return string(abi.encodePacked(
      '<ellipse cx="210" cy="85" rx="20" ry="10" fill="#',
      color,
      '" stroke="black"/><path d="M200 83 200 50 210 70 220 50 220 83" fill="#',
      color,
      '" stroke="black"/>'));
    else return string(abi.encodePacked(
      '<path d="M175 93, 180 85, 185 77, 187 75, 190 73, 195 70, 200 70, 205 71, 210 72, 215 73, 240 83, 245 86, 253 95, 255 99, 257 110, 255 115, 250 115, 240 110, 235 105, 230 100, 225 97, 210 91, 200 90, 175 93" fill="#',
      color,
      '" stroke="black"/>'));
  }

  function getHatTrait(uint256 hat) internal pure returns (string memory attributes) {
    if (hat == 0) return 'None';
    else {
      return string(abi.encodePacked(  
      (hat % Constants.NUMBER_OF_HATS).toString(),
      '"},',
      '{"trait_type": "Hat color", "value": "#',
      toColor(uint24(hat))
      ));
    }
  }

  function getLifetime(uint256 birthTime, uint256 deathTime) internal pure returns (uint256) {
    return (deathTime - birthTime) / 1 hours;
  }

  function arrayToString(uint64[] memory arr) internal pure returns (string memory str) {
    uint256 len = arr.length;
    if (len == 0) return 'None';
    if (arr[0] == 0) return 'None';
    --len;
    for (uint256 i; i < len;) {
      str = string(abi.encodePacked(str,
      uint256(arr[i]).toString(),
      ', '
      ));  
      unchecked {++i;}
    }
    str = string(abi.encodePacked(str,
      uint256(arr[len]).toString()
    ));
  }

  function toColor(uint24 color) internal pure returns (string memory) {
    bytes3 value = bytes3(color);
    bytes memory buffer = new bytes(6);
    for (uint256 i; i < 3;) {
      buffer[i*2+1] = ALPHABET[uint8(value[i]) & 0xf];
      buffer[i*2] = ALPHABET[uint8(value[i]>>4) & 0xf];
      unchecked {++i;}
    }    
    return string(buffer);
  }

  function boolToString(uint256 _bool) internal pure returns (string memory) {
    if (_bool == 0) return 'No';
    else return 'Yes';
  }

  function addressToString(address x) internal pure returns (string memory addrStr) {
    addrStr = '0x';
    bytes memory s = new bytes(4);
    bytes1 b;
    bytes1 hi;
    bytes1 lo;
    for (uint256 i; i < 2;) {
      b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
      hi = bytes1(uint8(b) / 16);
      lo = bytes1(uint8(b) - 16 * uint8(hi));
      s[2 * i] = char(hi);
      s[2 * i + 1] = char(lo);
      unchecked {++i;}
    }
    addrStr = string(abi.encodePacked(addrStr,
      string(s),
      '...'
    ));

    s = new bytes(4);
    for (uint256 i = 18; i < 20;) {
      b = bytes1(uint8(uint256(uint160(x)) / (2**(8 * (19 - i)))));
      hi = bytes1(uint8(b) / 16);
      lo = bytes1(uint8(b) - 16 * uint8(hi));
      s[2 * (i - 18)] = char(hi);
      s[2 * (i - 18) + 1] = char(lo);
      unchecked {++i;}
    }

    addrStr = string(abi.encodePacked(addrStr,
      string(s)
    ));   
  }

  /**
   * @dev returns a short name if name.length > 11
   */
  function getFittingName(string calldata x) internal pure returns (string memory) {
    bytes memory y = bytes(x);
    if (y.length < 12) return x;

    bytes memory s;
    for (uint256 i; i < 11;) {
      s = abi.encodePacked(s, bytes1(y[i]));
      unchecked {++i;}
    }

    return string(abi.encodePacked(string(s),
      '...'
    ));
  }

  function char(bytes1 b) internal pure returns (bytes1 c) {
    if (uint8(b) < 10) return bytes1(uint8(b) + 0x30);
    else return bytes1(uint8(b) + 0x57);
  }
}