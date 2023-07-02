//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

struct Peep {
    uint256 genes;
    uint8 hasHat;
    uint8 breedCount;
    uint24 bodyColor1;
    uint24 bodyColor2;
    uint24 eyesColor;
    uint32 kidTime;
    uint32 adultTime;
    uint32 oldTime;
    uint64[] parents;
    uint64[] children;
    string peepName;
}
