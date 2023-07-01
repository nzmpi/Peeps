//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import "./Structs.sol";
import "./SVGData.sol";

library PeepsMetadata {
  using Strings for uint256;
  uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff
  uint256 constant NUMBER_OF_BACKGROUNDS = 4;
  uint256 constant NUMBER_OF_ARMS = 4;
  uint256 constant NUMBER_OF_EYEBROWS = 3;
  uint256 constant NUMBER_OF_MOUTHS = 6;
  uint256 constant NUMBER_OF_MOUSTACHE = 5;
  uint256 constant kidTime_MIN = 2 hours;
  uint256 constant adultTime_MIN = 1 days;
  uint256 constant oldTime_MIN = 10 hours;

  function tokenURI(Peep storage peep) internal view returns (string memory) {
    //string memory description = "This is a Peep!";
    //string memory image = Base64.encode(bytes(generatePeep(peep)));

    //return generateSVGTokenURI(peep.name, description, description, image);
    return generatePeep(peep,0);
  }

  function generatePeep(Peep storage peep, uint256 p) internal view returns (string memory) {
    string memory header = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">';
    string memory footer = '</svg>';
    //if (block.timestamp < peep.kidTime) {
      //return string(abi.encodePacked(header,getKid(peep),footer));
    //} else if (block.timestamp < peep.adultTime) {
      //return string(abi.encodePacked(header,getAdult(peep),footer));
    //} else if (block.timestamp < peep.oldTime) {
      //return string(abi.encodePacked(header,getOld(peep),footer));
    //} else {
      //return string(abi.encodePacked(header,getDead(peep),footer));
    //}
    if (p == 0) return string(abi.encodePacked(header,getKid(peep),footer));
    else if (p == 1) return string(abi.encodePacked(header,getAdult(peep),footer));
    else if (p == 2) return string(abi.encodePacked(header,getOld(peep),footer));
    else return string(abi.encodePacked(header,getDead(peep),footer));
  }

  function getKid(Peep storage peep) internal view returns (string memory svg) {
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
    genes /= 10;
    x1 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="200" rx="30" ry="45" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="145" rx="15" ry="20" fill="white"  stroke="black"/>'
    ));

    // eyebrows
    genes /= 100; // skipping bodyColor2
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getKidEyebrows(x1)
    ));

    // eyes
    genes /= 10;
    x1 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<circle cx="193" cy="141" r="2" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>',
      '<circle cx="205" cy="141" r="2" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>'
    ));

    // mouth
    genes /= 10;
    x1 = genes % NUMBER_OF_MOUTHS;
    svg = string(abi.encodePacked(svg,
      SVGData.getKidMouth(x1)
    ));

  }

  function getAdult(Peep storage peep) internal view returns (string memory svg) {
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
      '<path d="M180 280, 180 360, 160 375" fill="none" stroke="black" stroke-width="5"/>',
      '<path d="M215 280, 215 360, 235 375" fill="none" stroke="black" stroke-width="5"/>'
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
    genes /= 10;
    x1 = genes % MAX_COLOR;
    genes /= 10;
    x2 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<defs><linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="150" y1="150" x2="250" y2="250"><stop offset="00%" stop-color="#',
      SVGData.toColor(uint24(x1)),
      '"/><stop offset="120%" stop-color="#',
      SVGData.toColor(uint24(x2)),
      '"/></linearGradient></defs><ellipse cx="200" cy="200" rx="60" ry="90" fill="url(#gradient)" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="90" rx="30" ry="40" fill="white" stroke="black"/>'
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    genes /= 10;
    x1 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<circle cx="187" cy="80" r="5" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>',
      '<circle cx="210" cy="80" r="5" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>'
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

  }

  function getOld(Peep storage peep) internal view returns (string memory svg) {
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
      '<path d="M180 280, 180 360, 160 375" fill="none" stroke="black" stroke-width="5"/>',
      '<path d="M215 280, 215 360, 235 375" fill="none" stroke="black" stroke-width="5"/>'
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
    genes /= 100;
    x2 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="200" rx="60" ry="90" fill="#',
      SVGData.toColor(uint24(x2)),
      '" stroke="black"/>'
    ));

    // head
    svg = string(abi.encodePacked(svg,
      '<ellipse cx="200" cy="90" rx="30" ry="40" fill="white" stroke="black"/>'
    ));

    // eyebrows
    genes /= 10;
    x1 = genes % NUMBER_OF_EYEBROWS;
    svg = string(abi.encodePacked(svg,
      SVGData.getAdultEyebrows(x1)
    ));

    // eyes
    genes /= 10;
    x1 = genes % MAX_COLOR;
    svg = string(abi.encodePacked(svg,
      '<circle cx="187" cy="80" r="5" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>',
      '<circle cx="210" cy="80" r="5" fill="#',
      SVGData.toColor(uint24(x1)),
      '" stroke="black"/>'
    ));

    // wrinkles
    svg = string(abi.encodePacked(svg,
      '<line x1="180" y1="77" x2="175" y2="75" stroke="black"/><line x1="180" y1="80" x2="175" y2="80" stroke="black"/><line x1="180" y1="83" x2="175" y2="85" stroke="black"/><line x1="217" y1="77" x2="222" y2="75" stroke="black"/><line x1="217" y1="80" x2="222" y2="80" stroke="black"/><line x1="217" y1="83" x2="222" y2="85" stroke="black"/>'
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

  }

  function getDead(Peep storage peep) internal view returns (string memory svg) {
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
      '<path d="M180 280, 180 360, 160 375" fill="none" stroke="black" stroke-width="5"/>',
      '<path d="M215 280, 215 360, 235 375" fill="none" stroke="black" stroke-width="5"/>'
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
      '<ellipse cx="200" cy="90" rx="30" ry="40" fill="white" stroke="black"/>'
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
      '<line x1="180" y1="77" x2="175" y2="75" stroke="black"/><line x1="180" y1="80" x2="175" y2="80" stroke="black"/><line x1="180" y1="83" x2="175" y2="85" stroke="black"/><line x1="217" y1="77" x2="222" y2="75" stroke="black"/><line x1="217" y1="80" x2="222" y2="80" stroke="black"/><line x1="217" y1="83" x2="222" y2="85" stroke="black"/>'
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

  }

  function generateSVGTokenURI(
    string storage name,
    string memory description,
    string memory image,
    string memory attributes
  )internal pure returns (string memory) {
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
                "}"
              )
            )
          )
        )
      );
  }

  function getTimes(uint256 genes) internal view returns (
    uint32 kidTime,
    uint32 adultTime,
    uint32 oldTime
    ) {
      kidTime = uint32(genes % kidTime_MIN + block.timestamp + kidTime_MIN);
      adultTime = uint32(genes % adultTime_MIN + block.timestamp + adultTime_MIN);
      oldTime = uint32(genes % oldTime_MIN + block.timestamp + oldTime_MIN);
    }
}