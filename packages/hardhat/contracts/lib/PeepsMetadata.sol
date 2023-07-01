//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

import "./base64.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import "./Structs.sol";
import "./SVGData.sol";

library PeepsMetadata {
  using Strings for uint256;
  uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff
  uint256 constant kidTime_MIN = 2 hours;
  uint256 constant adultTime_MIN = 1 days;
  uint256 constant oldTime_MIN = 10 hours;
  uint256 constant NUMBER_OF_BACKGROUNDS = 4;

  function tokenURI(Peep storage peep) internal view returns (string memory) {
    //string memory description = "This is a Peep!";
    //string memory image = Base64.encode(bytes(generatePeep(peep)));

    //return generateSVGTokenURI(peep.name, description, description, image);
    return generatePeep(peep);
  }

  function generatePeep(Peep storage peep) internal view returns (string memory) {
    string memory header = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">';
    string memory footer = '</svg>';
    //if (block.timestamp < peep.kidTime) {
      return string(abi.encodePacked(header,getKid(peep),footer));
    /*} else if (block.timestamp < peep.adultTime) {
      return getAdult(peep);
    } else {
      return getOld(peep);*/
    //}
  }

  function getKid(Peep storage peep) internal view returns (string memory) {
    uint256 genes = peep.genes;
    uint256 backgroundId = genes % NUMBER_OF_BACKGROUNDS;
    genes /= 10; // changing the number
    uint24 backgroundColor1 = uint24(genes % MAX_COLOR);
    genes /= 10;
    uint24 backgroundColor2 = uint24(genes % MAX_COLOR);
    genes /= 10;
    uint24 bodyColor1 = uint24(genes % MAX_COLOR);
    genes /= 100; // skipping bodyColor2
    uint24 eyeColor = uint24(genes % MAX_COLOR);
    return string(abi.encodePacked(
    SVGData.getBackground(
      backgroundId,
      backgroundColor1,
      backgroundColor2
    ),
    // legs
    '<path d="M190 180, 190 280, 180 290" fill="none" stroke="black" stroke-width="3"/>',
    '<path d="M210 180, 210 280, 220 290" fill="none" stroke="black" stroke-width="3"/>',
    //arms

    // body
    '<ellipse cx="200" cy="200" rx="30" ry="45" fill="#',
    SVGData.toColor(bodyColor1),
    '" stroke="black"/>',
    // head
    '<ellipse cx="200" cy="145" rx="15" ry="20" fill="white"  stroke="black"/>',
    //eyes
    '<circle cx="193" cy="141" r="2" fill="#',
    SVGData.toColor(eyeColor),
    '" stroke="black"/>',
    '<circle cx="205" cy="141" r="2" fill="#',
    SVGData.toColor(eyeColor),
    '" stroke="black"/>'));
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