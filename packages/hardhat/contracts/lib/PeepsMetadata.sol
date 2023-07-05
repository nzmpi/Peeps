//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import "./Structs.sol";
import "./Constants.sol";
import "./SVGData.sol";
import { PeepsMetadata2 } from "./PeepsMetadata2.sol";
import { IERC721short } from "./Interfaces.sol";

contract PeepsMetadata {
  using Strings for uint256;
  PeepsMetadata2 immutable PM2;

  constructor() payable {
    PM2 = new PeepsMetadata2();
  }

  function tokenURI(Peep calldata peep, uint256 id) external view returns (string memory) {
    string memory description = "This is a Peep!";
    string memory attributes = PM2.getAttributes(peep);
    string memory image = Base64.encode(bytes(
      generatePeep(peep, id)
    ));

    return generateSVGTokenURI(peep.peepName, description, image, attributes);
  }

  function generatePeep(Peep calldata peep, uint256 id) internal view returns (string memory) {
    string memory header = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">';
    string memory footer = '</svg>';
    if (!peep.isBuried) {
      if (block.timestamp < peep.kidTime) {
        return string(abi.encodePacked(header,getKid(peep),footer));
      } else if (block.timestamp < peep.adultTime) {
        return string(abi.encodePacked(header,getAdult(peep, id),footer));
      } else if (block.timestamp < peep.oldTime) {
        return string(abi.encodePacked(header,getOld(peep),footer));
      } else {
        return string(abi.encodePacked(header,getDead(peep),footer));
      } 
    } else {
      return string(abi.encodePacked(header,PM2.getGravestone(
        peep,
        IERC721short(msg.sender).ownerOf(id)
      ),footer));
    }
  }

  function getKid(Peep calldata peep) internal view returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    // background
    svg = PM2.getBackground(x1, uint24(x2), uint24(x3));

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
    x3 = genes % Constants.NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % Constants.NUMBER_OF_ARMS; 
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
    x1 = genes % Constants.NUMBER_OF_EYEBROWS;
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
    x1 = genes % Constants.NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getKidMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getKidHat(peep.hasHat)
    ));
  }

  function getAdult(Peep calldata peep, uint256 id) internal view returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    // background
    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    svg = PM2.getBackground(x1, uint24(x2), uint24(x3));

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
    x3 = genes % Constants.NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % Constants.NUMBER_OF_ARMS; 
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultArms(x1,x2,x3,x4,false)
    ));

    // body
    string memory idString = id.toString();
    svg = string(abi.encodePacked(svg,
      '<defs><linearGradient id="',
      idString,
      '" gradientUnits="userSpaceOnUse" x1="150" y1="150" x2="250" y2="250"><stop offset="0%" stop-color="#',
      SVGData.toColor(peep.bodyColor1),
      '"/><stop offset="120%" stop-color="#',
      SVGData.toColor(peep.bodyColor2),
      '"/></linearGradient></defs><ellipse cx="200" cy="200" rx="60" ry="90" fill="url(#',
      idString,
      ')" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHead()
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyes(peep.eyesColor)
    ));

    // moustache
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHat(peep.hasHat)
    ));
  }

  function getOld(Peep calldata peep) internal view returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    // background
    svg = PM2.getBackground(x1, uint24(x2), uint24(x3));

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
    x3 = genes % Constants.NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % Constants.NUMBER_OF_ARMS; 
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
    x1 = genes % Constants.NUMBER_OF_EYEBROWS;
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
    x1 = genes % Constants.NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultMouth(x1)
    ));

    // hat
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultHat(peep.hasHat)
    ));
  }

  function getDead(Peep calldata peep) internal view returns (string memory svg) {
    uint256 genes = peep.genes;    
    // avoiding 'Stack too deep' error
    uint256 x1;
    uint256 x2;
    uint256 x3;
    uint256 x4;

    x1 = genes % Constants.NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    x2 = genes % Constants.MAX_COLOR;
    genes /= 10;
    x3 = genes % Constants.MAX_COLOR;
    // background
    svg = PM2.getBackground(x1, uint24(x2), uint24(x3));

    // legs
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultLegs()
    ));

    // arms
    genes /= 1000;
    x3 = genes % Constants.NUMBER_OF_ARMS;
    genes /= 10;
    x4 = genes % Constants.NUMBER_OF_ARMS; 
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
    x1 = genes % Constants.NUMBER_OF_EYEBROWS;
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
    x1 = genes % Constants.NUMBER_OF_MOUSTACHE;
    svg = string(abi.encodePacked(svg,
      SVGData.getMoustache(x1)
    ));

    // mouth
    genes /= 10;
    x1 = genes % Constants.NUMBER_OF_MOUTHS;
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
      kidTime = uint32(genes % Constants.kidTime_MIN + block.timestamp + Constants.kidTime_MIN);
      adultTime = uint32(genes % Constants.adultTime_MIN + Constants.adultTime_MIN) + kidTime;
      oldTime = uint32(genes % Constants.oldTime_MIN + Constants.oldTime_MIN) + adultTime;
  }

  function getPM2() external view returns (address) {
    return address(PM2);
  }
}