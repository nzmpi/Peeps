//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import "./Structs.sol";
import "./SVGData.sol";

contract PeepsMetadata {
  using Strings for uint256;
  uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff
  uint256 constant NUMBER_OF_BACKGROUNDS = 4;
  uint256 constant NUMBER_OF_ARMS = 4;
  uint256 constant NUMBER_OF_EYEBROWS = 3;
  uint256 constant NUMBER_OF_MOUTHS = 6;
  uint256 constant NUMBER_OF_MOUSTACHE = 5;
  uint256 constant NUMBER_OF_HATS = 3;
  uint256 constant kidTime_MIN = 1 minutes;//2 hours;
  uint256 constant adultTime_MIN = 1 minutes;//2 weeks;
  uint256 constant oldTime_MIN = 1 minutes;//10 hours;

  function tokenURI(Peep calldata peep, uint256 id) external view returns (string memory) {
    string memory description = "This is a Peep!";
    string memory attributes = getAttributes(peep);
    string memory image = Base64.encode(bytes(
      generatePeep(peep, id.toString()
    )));

    return generateSVGTokenURI(peep.peepName, description, image, attributes);
  }

  function getAttributes(Peep calldata peep) internal pure returns (string memory attributes) {
    uint256 genes = peep.genes;
    uint256 x1;
    uint256 x2;
    uint256 x3;

    attributes = string(abi.encodePacked(attributes,
      '[{"trait_type": "Adulthood", "value": "',
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
    x1 = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10;
    x2 = genes % MAX_COLOR;
    genes /= 10;
    x3 = genes % MAX_COLOR;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background type", "value": "',
      x1.toString(),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background color 1", "value": "#',
      SVGData.toColor(uint24(x2)),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Background color 2", "value": "#',
      SVGData.toColor(uint24(x3)),
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
    x1 = genes % NUMBER_OF_ARMS;
    genes /= 10;
    x2 = genes % NUMBER_OF_ARMS;
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
      SVGData.toColor(peep.bodyColor1),
      '"},'
    ));

    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Body color 2", "value": "#',
      SVGData.toColor(peep.bodyColor2),
      '"},'
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Eyebrows type", "value": "',
      x1.toString(),
      '"},'
    ));

    // eyes
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Eye color", "value": "#',
      SVGData.toColor(peep.eyesColor),
      '"},'
    ));

    // moustache
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUSTACHE;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Moustache type", "value": "',
      x1.toString(),
      '"},'
    ));

    // mouth
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUTHS;
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Mouth type", "value": "',
      x1.toString(),
      '"},'
    ));

    // hat
    attributes = string(abi.encodePacked(attributes,
      '{"trait_type": "Hat type", "value": "',
      getHat(peep.hasHat),
      '"}'
    ));

    attributes = string(abi.encodePacked(attributes,
      ']'
    ));
  }

  function generatePeep(Peep calldata peep, string memory id) internal view returns (string memory) {
    string memory header = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">';
    string memory footer = '</svg>';
    if (block.timestamp < peep.kidTime) {
      return string(abi.encodePacked(header,getKid(peep),footer));
    } else if (block.timestamp < peep.adultTime) {
      return string(abi.encodePacked(header,getAdult(peep, id),footer));
    } else if (block.timestamp < peep.oldTime) {
      return string(abi.encodePacked(header,getOld(peep),footer));
    } else {
      return string(abi.encodePacked(header,getDead(peep),footer));
    }
  }

  function getKid(Peep calldata peep) internal pure returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % MAX_COLOR;
    genes /= 10;
    x3 = genes % MAX_COLOR;
    // background
    svg = SVGData.getBackground(x1, uint24(x2), uint24(x3));

    // legs
    svg = string(abi.encodePacked(svg,
      '<path d="M190 180, 190 280, 180 290" fill="none" stroke="black" stroke-width="3"/>',
      '<path d="M210 180, 210 280, 220 290" fill="none" stroke="black" stroke-width="3"/>'
    ));

    // arms
    genes /= 10;
    x1 = genes % 2;
    genes /= 10;
    x2 = genes % 2;
    genes /= 10;
    x3 = genes % NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % NUMBER_OF_ARMS; 
    svg = string(abi.encodePacked(svg,
      SVGData.getKidArms(x1,x2,x3,x4)
    ));

    // body
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="200" rx="30" ry="45" fill="#',
      SVGData.toColor(peep.bodyColor1),
      '" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="145" rx="15" ry="20" fill="white"  stroke="black"/>'
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getKidEyebrows(x1)
    ));

    // eyes
    string memory color = SVGData.toColor(peep.eyesColor);
    svg = string(abi.encodePacked(svg,
      '<circle cx="193" cy="141" r="2" fill="#',
      color,
      '" stroke="black"/>',
      '<circle cx="205" cy="141" r="2" fill="#',
      color,
      '" stroke="black"/>'
    ));

    // mouth
    genes /= 100;
    x1 = genes % NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getKidMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getKidHat(peep.hasHat)
    ));
  }

  function getAdult(Peep calldata peep, string memory id) internal pure returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    // background
    x1 = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % MAX_COLOR;
    genes /= 10;
    x3 = genes % MAX_COLOR;
    svg = SVGData.getBackground(x1, uint24(x2), uint24(x3));

    // legs
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultLegs()
    ));

    // arms
    genes /= 10;
    x1 = genes % 2;
    genes /= 10;
    x2 = genes % 2;
    genes /= 10;
    x3 = genes % NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % NUMBER_OF_ARMS; 
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultArms(x1,x2,x3,x4,false)
    ));

    // body
    svg = string(abi.encodePacked(svg,
      '<defs><linearGradient id="',
      id,
      '" gradientUnits="userSpaceOnUse" x1="150" y1="150" x2="250" y2="250"><stop offset="0%" stop-color="#',
      SVGData.toColor(peep.bodyColor1),
      '"/><stop offset="120%" stop-color="#',
      SVGData.toColor(peep.bodyColor2),
      '"/></linearGradient></defs><ellipse cx="200" cy="200" rx="60" ry="90" fill="url(#',
      id,
      ')" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHead()
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyes(peep.eyesColor)
    ));

    // moustache
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHat(peep.hasHat)
    ));
  }

  function getOld(Peep calldata peep) internal pure returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % MAX_COLOR;
    genes /= 10;
    x3 = genes % MAX_COLOR;
    // background
    svg = SVGData.getBackground(x1, uint24(x2), uint24(x3));

    // legs
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultLegs()
    ));

    // arms
    genes /= 10;
    x1 = genes % 2;
    genes /= 10;
    x2 = genes % 2;
    genes /= 10;
    x3 = genes % NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % NUMBER_OF_ARMS; 
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultArms(x1,x2,x3,x4,true)
    ));

    // body
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="200" rx="60" ry="90" fill="#',
      SVGData.toColor(peep.bodyColor2),
      '" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHead()
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyes(peep.eyesColor)
    ));

    // wrinkles
    svg = string(abi.encodePacked(svg,
      SVGData.getWrinkles()
    ));

    // moustache
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHat(peep.hasHat)
    ));
  }

  function getDead(Peep calldata peep) internal pure returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % MAX_COLOR;
    genes /= 10;
    x3 = genes % MAX_COLOR;
    // background
    svg = SVGData.getBackground(x1, uint24(x2), uint24(x3));

    // legs
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultLegs()
    ));

    // arms
    genes /= 1000;
    x3 = genes % NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % NUMBER_OF_ARMS; 
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultArms(0,0,x3,x4,false)
    ));

    // body
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="200" rx="60" ry="90" fill="grey" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHead()
    ));

    // eyebrows
    genes /= 1000;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    svg = string(abi.encodePacked(svg,
      '<line x1="192" y1="76" x2="181" y2="84" stroke="black"/><line x1="182" y1="76" x2="191" y2="84" stroke="black"/><line x1="215" y1="76" x2="204" y2="84" stroke="black"/><line x1="205" y1="76" x2="214" y2="84" stroke="black"/>'
    ));

    // wrinkles
    svg = string(abi.encodePacked(svg,
      SVGData.getWrinkles()
    ));

    // moustache
    genes /= 100;
    x1 = genes % NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHat(peep.hasHat)
    ));
  }

  function generateSVGTokenURI(
    string memory name,
    string memory description,
    string memory image,
    string memory attributes
  ) internal pure returns (string memory) {
    return
      string(
        abi.encodePacked(
          "data:applicaton/json;base64,",
          Base64.encode(
            bytes(
              abi.encodePacked(
                '{"name": "',
                name,
                '", "description": "',
                description,
                '", "image": "data:image/svg+xml;base64,',
                image,
                '", "attributes": ',
                attributes,
                '}'
              )
            )
          )
        )
      );
  }

  function getTimes(uint256 genes) external view returns (
    uint32 kidTime,
    uint32 adultTime,
    uint32 oldTime
  ) {
      kidTime = uint32(genes % kidTime_MIN + block.timestamp + kidTime_MIN);
      adultTime = uint32(genes % adultTime_MIN + adultTime_MIN) + kidTime;
      oldTime = uint32(genes % oldTime_MIN + oldTime_MIN) + adultTime;
  }

  function boolToString(uint256 _bool) internal pure returns (string memory) {
    if (_bool == 0) return 'no';
    else return 'yes';
  }

  function getHat(uint256 hat) internal pure returns (string memory attributes) {
    if (hat == 0) return 'none';
    else {
      return string(abi.encodePacked(  
      (hat % NUMBER_OF_HATS).toString(),
      '"},',
      '{"trait_type": "Hat color", "value": "#',
      SVGData.toColor(uint24(hat))
      ));
    }
  }
}