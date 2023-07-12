//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

/**
 * @title SVGData
 * @dev returns parts of a peep's body
 */
library SVGData {
  bytes16 internal constant ALPHABET = '0123456789abcdef';
  uint256 constant NUMBER_OF_HATS = 3;

  function getAdultLegs() internal pure returns (string memory) {
    return string(abi.encodePacked(
      '<path d="M180 280, 180 360, 160 375" fill="none" stroke="black" stroke-width="5"/>',
      '<path d="M215 280, 215 360, 235 375" fill="none" stroke="black" stroke-width="5"/>'));
  }

  function getAdultHead() internal pure returns (string memory) {
    return 
      '<ellipse cx="200" cy="90" rx="30" ry="40" fill="white" stroke="black"/>';
  }

  function getAdultEyes(uint256 eyeColor) internal pure returns (string memory) {
    string memory color = toColor(uint24(eyeColor));
    return string(abi.encodePacked(
      '<circle cx="187" cy="80" r="5" fill="#',
      color,
      '" stroke="black"/>',
      '<circle cx="210" cy="80" r="5" fill="#',
      color,
      '" stroke="black"/>'
    ));
  }

  function getWrinkles() internal pure returns (string memory) {
    return 
      '<line x1="180" y1="77" x2="175" y2="75" stroke="black"/><line x1="180" y1="80" x2="175" y2="80" stroke="black"/><line x1="180" y1="83" x2="175" y2="85" stroke="black"/><line x1="217" y1="77" x2="222" y2="75" stroke="black"/><line x1="217" y1="80" x2="222" y2="80" stroke="black"/><line x1="217" y1="83" x2="222" y2="85" stroke="black"/>';
  }

  function getKidArms(
    uint256 isLeftAnimated,
    uint256 isRightAnimated,
    uint256 leftArm,
    uint256 rightArm
  ) internal pure returns (string memory arms) { 
    if (isLeftAnimated == 0) {
      if (leftArm == 0) arms = 
        '<line x1="181" y1="168" x2="155" y2="215" stroke="black" stroke-width="3"/>';
      else if (leftArm == 1) arms = 
        '<line x1="180" y1="168" x2="153" y2="127" stroke="black" stroke-width="3"/>';
      else if (leftArm == 2) arms = 
        '<path d="M181 168 L168 168 C148 150, 150 185, 125 168" fill="none" stroke="black" stroke-width="3"/>';
      else arms = 
        '<path d="M181 168 L168 168 C148 190, 150 145, 125 165" fill="none" stroke="black" stroke-width="3"/>';
    } else {
      if (leftArm < 2) arms = 
        '<line x1="181" y1="168" x2="155" y2="215" stroke="black" stroke-width="3"><animate attributeName="x2" attributeType="XML" values="155;125;155;125;155" dur="2s" repeatCount="indefinite"/><animate attributeName="y2" attributeType="XML" values="215;170;127;170;215" dur="2s" repeatCount="indefinite"/></line>';
      else arms = 
        '<path fill="none" stroke="black" stroke-width="3"><animate attributeName="d" attributeType="XML" values="M181 168 L168 168 C148 150, 150 185, 125 168; M181 168 L168 168 C148 190, 150 145, 125 165; M181 168 L168 168 C148 150, 150 185, 125 168" dur="2s" repeatCount="indefinite"/></path>';
    }
    if (isRightAnimated == 0) {
      if (rightArm == 0) arms = string(abi.encodePacked(arms,
        '<line x1="219" y1="168" x2="246" y2="215" stroke="black" stroke-width="3"/>'));
      else if (rightArm == 1) arms = string(abi.encodePacked(arms,
        '<line x1="220" y1="168" x2="248" y2="127" stroke="black" stroke-width="3"/>'));
      else if (rightArm == 2) arms = string(abi.encodePacked(arms,
        '<path d="M218 168 L231 168 C251 150, 249 185, 274 168" fill="none" stroke="black" stroke-width="3"/>'));
      else arms = string(abi.encodePacked(arms,
        '<path d="M218 168 L231 168 C251 190, 249 145, 274 165" fill="none" stroke="black" stroke-width="3"/>'));
    } else {
      if (rightArm < 2) arms = string(abi.encodePacked(arms,
        '<line x1="219" y1="168" x2="246" y2="215" stroke="black" stroke-width="3"><animate attributeName="x2" attributeType="XML" values="246;276;246;276;246" dur="2s" repeatCount="indefinite"/><animate attributeName="y2" attributeType="XML" values="215;170;127;170;215" dur="2s" repeatCount="indefinite" /></line>'));
      else arms = string(abi.encodePacked(arms,
        '<path fill="none" stroke="black" stroke-width="3"><animate attributeName="d" attributeType="XML" values="M218 168 L231 168 C251 150, 249 185, 274 168; M218 168 L231 168 C251 190, 249 145, 274 165; M218 168 L231 168 C251 150, 249 185, 274 168" dur="2s" repeatCount="indefinite"/></path>'));
    }    
  }

  function getAdultArms(
    uint256 isLeftAnimated,
    uint256 isRightAnimated,
    uint256 leftArm,
    uint256 rightArm,
    bool isOld
  ) internal pure returns (string memory arms) { 
    string memory dur;
    if (isOld) dur = "4s"; 
    else dur = "2s";

    if (isLeftAnimated == 0) {
      if (leftArm == 0) arms = 
        '<line x1="165" y1="130" x2="100" y2="240" stroke="black" stroke-width="5"/>';
      else if (leftArm == 1) arms = 
        '<line x1="165" y1="130" x2="100" y2="50" stroke="black" stroke-width="5"/>';
      else if (leftArm == 2) arms = 
        '<path d="M165 130 L145 130 C95 70, 85 190, 35 130" fill="none" stroke="black" stroke-width="5"/>';
      else arms = 
        '<path d="M165 130 L145 130 C95 190, 85 70, 35 125" fill="none" stroke="black" stroke-width="5"/>';
    } else {
      if (leftArm < 2) arms = string(abi.encodePacked(
        '<line x1="165" y1="130" x2="100" y2="240" stroke="black" stroke-width="5"><animate attributeName="x2" attributeType="XML" values="100;50;80;50;100" dur="',
        dur,
        '" repeatCount="indefinite"/><animate attributeName="y2" attributeType="XML" values="240;130;40;130;240" dur="',
        dur,
        '" repeatCount="indefinite"/></line>'));
      else arms = string(abi.encodePacked(
        '<path fill="none" stroke="black" stroke-width="5"><animate attributeName="d" attributeType="XML" values="M165 130 L145 130 C95 70, 85 190, 35 130; M165 130 L145 130 C95 190, 85 70, 35 125; M165 130 L145 130 C95 70, 85 190, 35 130" dur="',
        dur,
        '" repeatCount="indefinite"/></path>'));
    }
    if (isRightAnimated == 0) {
      if (rightArm == 0) arms = string(abi.encodePacked(arms,
        '<line x1="235" y1="130" x2="300" y2="240" stroke="black" stroke-width="5"/>'));
      else if (rightArm == 1) arms = string(abi.encodePacked(arms,
        '<line x1="235" y1="130" x2="300" y2="40" stroke="black" stroke-width="5"/>'));
      else if (rightArm == 2) arms = string(abi.encodePacked(arms,
        '<path d="M235 130 L255 130 C305 70, 315 190, 365 130" fill="none" stroke="black" stroke-width="5"/>'));
      else arms = string(abi.encodePacked(arms,
        '<path d="M235 130 L255 130 C305 190, 315 70, 365 125" fill="none" stroke="black" stroke-width="5"/>'));
    } else {
      if (rightArm < 2) arms = string(abi.encodePacked(arms,
        '<line x1="235" y1="130" x2="300" y2="240" stroke="black" stroke-width="5"><animate attributeName="x2" attributeType="XML" values="300;350;320;350;300" dur="',
        dur,
        '" repeatCount="indefinite"/>  <animate attributeName="y2" attributeType="XML" values="240;130;40;130;240" dur="',
        dur,
        '" repeatCount="indefinite"/></line>'));
      else arms = string(abi.encodePacked(arms,
        '<path fill="none" stroke="black" stroke-width="5"><animate attributeName="d" attributeType="XML" values="M235 130 L255 130 C305 70, 315 190, 365 130; M235 130 L255 130 C305 190, 315 70, 365 125; M235 130 L255 130 C305 70, 315 190, 365 130" dur="',
        dur,
        '" repeatCount="indefinite"/></path>'));
    }    
  }

  function getKidEyebrows(uint256 eyebrows) internal pure returns (string memory) {
    if (eyebrows == 0) return 
      '<path d="M190 136, 196 136" fill="none" stroke="black"/><path d="M201 136, 205 134, 209 136" fill="none" stroke="black"/>';
    else if (eyebrows == 1) return 
      '<path d="M190 136, 192 135, 194 135, 197 136" fill="none" stroke="black"/><path d="M202 136, 204 135, 206 135, 209 136" fill="none" stroke="black"/>';
    else return 
      '<path d="M190 136, 197 136" fill="none" stroke="black"/><path d="M202 136, 209 136" fill="none" stroke="black"/>';
  }

  function getAdultEyebrows(uint256 eyebrows) internal pure returns (string memory) {
    if (eyebrows == 0) return 
      '<path d="M180 71, 194 71" fill="none" stroke="black"/><path d="M203 71, 210 69, 217 71" fill="none" stroke="black"/>';
    else if (eyebrows == 1) return 
      '<path d="M180 73, 182 72, 185 71, 187 71, 189 71, 194 73" fill="none" stroke="black"/><path d="M203 73, 205 72, 208 71, 210 71, 212 71, 217 73" fill="none" stroke="black"/>';
    else return 
      '<path d="M180 71, 194 71" fill="none" stroke="black"/><path d="M203 71, 217 71" fill="none" stroke="black"/>';
  }

  function getMoustache(uint256 moustache) internal pure returns (string memory) {
    if (moustache == 0) return 
      '<path d="M 180 90, 178 91, 178 93, 180 95, 185 97, 195 94, 197 90" fill="none" stroke="black"/><path d="M202 90, 204 94, 214 97, 219 95, 221 93, 221 91, 219 90" fill="none" stroke="black"/>';
    else if (moustache == 1) return 
      '<line x1="187" y1="95" x2="195" y2="95" stroke="black"/><line x1="203" y1="95" x2="211" y2="95" stroke="black"/>';
    else if (moustache == 2) return
      '<path d="M188 96 Q 201 91 211 96" fill="none" stroke="black" stroke-width="2"/>';
    else if (moustache == 3) return
      '<path d="M185 97, 195 94, 197 90" fill="none" stroke="black"/><path d="M202 90, 204 94, 214 97" fill="none" stroke="black"/>';
    else return 
      '';
  }

  function getKidMouth(uint256 mouth) internal pure returns (string memory) {
    if (mouth == 0) return 
      '<path d="M191 153 C197 144, 203 162, 208 153" fill="none" stroke="black"/>';
    else if (mouth == 1) return 
      '<line x1="193" y1="153" x2="206" y2="153" stroke="black"/>';
    else if (mouth == 2) return 
      '<path d="M193 153 C198 157, 201 157, 206 153" fill="none" stroke="black"/>';
    else if (mouth == 3) return 
      '<path d="M193 155, 200 154, 206 151" fill="none" stroke="black"/>';
    else if (mouth == 4) return 
      '<path d="M194 156, 196 153, 197 152, 198 151, 200 150, 202 150, 204 151, 205 152, 206 156" fill="black" stroke="black"/><path d="M194 156 Q 206 147 206 156 z" fill="red" stroke="black"/>';
    else return 
      '<path d="M194 150, 195 153, 196 155, 197 156, 199 157, 200 157, 203 157, 200 157, 203 156, 205 154, 206 150 z" fill="black"/><path d="M196 154, 197 155, 198 156, 200 156, 200 156, 202 156, 204 155, 204 153, 204 153, 203 153, 202 153, 201 153, 200 153" fill="red"/>';
  }

  function getAdultMouth(uint256 mouth) internal pure returns (string memory) {
    if (mouth == 0) return 
      '<path d="M183 107 C193 92, 203 122, 213 107" fill="none" stroke="black"/>';
    else if (mouth == 1) return 
      '<line x1="187" y1="107" x2="210" y2="107" stroke="black"/>';
    else if (mouth == 2) return 
      '<path d="M185 104 C194 112, 202 112, 213 104" fill="none" stroke="black"/>';
    else if (mouth == 3) return 
      '<path d="M187 106, 205 104, 206 104, 207 103, 208 103, 209 102, 210 102, 211 101, 212 101, 213 100" fill="none" stroke="black"/>';
    else if (mouth == 4) return 
      '<path d="M190 110, 191 106, 192 104, 195 101, 198 99, 200 99, 202 99, 207 101, 209 104, 209 107, 210 110 z" fill="black" stroke="black"/><path d="M190 110 Q 210 95 210 110 z" fill="red" stroke="black"/>';
    else return 
      '<path d="M190 102, 191 106, 192 108, 195 112, 198 113, 200 113, 202 113, 207 111, 209 107, 210 102 z" fill="black" stroke="black"/><path d="M192 108, 195 112, 198 113, 200 113, 202 113, 205 112, 207 111, 209 107, 204 106, 203 106, 202 106, 201 106, 200 106" fill="red"/>';
  }

  function getKidHat(uint256 hat) internal pure returns (string memory) {
    if (hat == 0) return '';
    uint256 hatType = hat % NUMBER_OF_HATS;
    string memory color = toColor(uint24(hat));
    if (hatType == 0) return string(abi.encodePacked(
      '<ellipse cx="200" cy="127" rx="24" ry="5" fill="#',
      color,
      '" stroke="black"/><path d="M185 126 A80 800 0 0 1 215 126" fill="#',
      color,
      '" stroke="black"/>'));
    else if (hatType == 1) return string(abi.encodePacked(
      '<ellipse cx="200" cy="127" rx="10" ry="5" fill="#',
      color,
      '" stroke="black"/><path d="M195 127 195 112 200 120 205 112 205 127" fill="#',
      color,
      '" stroke="black"/>'));
    else return string(abi.encodePacked(
      '<path d="M187 131, 191 122, 196 117, 200 116, 203 116, 208 118, 215 121, 225 127, 228 135, 228 143, 226 143, 224 142, 220 139, 217 135, 210 130, 205 129, 197 128 187 131" fill="#',
      color,
      '" stroke="black"/>'));
  }

  function getAdultHat(uint256 hat) internal pure returns (string memory) {
    if (hat == 0) return '';
    uint256 hatType = hat % NUMBER_OF_HATS;
    string memory color = toColor(uint24(hat));
    if (hatType == 0) return string(abi.encodePacked(
      '<ellipse cx="200" cy="55" rx="50" ry="10" fill="#',
      color,
      '" stroke="black"/><path d="M170 53 A120 900 0 0 1 230 53" fill="#',
      color,
      '" stroke="black"/>'));
    else if (hatType == 1) return string(abi.encodePacked(
      '<ellipse cx="200" cy="55" rx="20" ry="10" fill="#',
      color,
      '" stroke="black"/><path d="M190 53 190 20 200 40 210 20 210 53" fill="#',
      color,
      '" stroke="black"/>'));
    else return string(abi.encodePacked(
      '<path d="M175 63, 180 55, 185 47, 187 45, 190 43, 195 40, 200 40, 205 41, 210 42, 215 43, 240 53, 245 56, 253 65, 255 69, 257 80, 255 85, 250 85, 240 80, 235 75, 230 70, 225 67, 210 61, 200 60, 175 63" fill="#',
      color,
      '" stroke="black"/>'));
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
    
}
