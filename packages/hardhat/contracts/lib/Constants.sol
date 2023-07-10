//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

library Constants {  
  uint256 constant MAX_COLOR = type(uint24).max; // 0xffffff
  uint256 constant NUMBER_OF_BACKGROUNDS = 4;
  uint256 constant NUMBER_OF_ARMS = 4;
  uint256 constant NUMBER_OF_EYEBROWS = 3;
  uint256 constant NUMBER_OF_MOUTHS = 6;
  uint256 constant NUMBER_OF_MOUSTACHE = 5;
  uint256 constant NUMBER_OF_HATS = 3;
  uint256 constant kidTime_MIN = 1 minutes;//2 hours;
  uint256 constant adultTime_MIN = 10 minutes;//2 weeks;
  uint256 constant oldTime_MIN = 1 minutes;//10 hours;
}