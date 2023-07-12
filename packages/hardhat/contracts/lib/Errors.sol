//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

library Errors {
  error NotOwner();
  error NotOwnerOrApproved();
  error NotAllowed();
  error WrongPeep();
  error NotEnoughEth();
}
