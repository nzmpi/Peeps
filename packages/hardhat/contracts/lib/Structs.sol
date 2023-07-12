//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

struct Peep {
  uint256 genes;
  bool isBuried;
  bool breedingAllowed;
  uint8 breedCount;
  uint24 hasHat;
  uint24 bodyColor1;
  uint24 bodyColor2;
  uint24 eyesColor;
  uint32 birthTime;
  uint32 kidTime;
  uint32 adultTime;
  uint32 oldTime;
  uint64[2] parents;
  uint64[] children;
  string peepName;
}
