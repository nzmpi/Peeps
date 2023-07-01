//SPDX-License-Identifier: MIT
pragma solidity 0.8.20;

struct Peep {
    uint256 genes;
    uint8 hasHat;
    uint32 kidTime;
    uint32 adultTime;
    uint32 oldTime;
    uint64[] parents;
    uint64[] children;
    uint64[] grandChildren;
    string name;
}
