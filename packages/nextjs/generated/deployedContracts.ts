const contracts = {
  137: [
    {
      chainId: "137",
      name: "polygon",
      contracts: {
        Peeps: {
          address: "0x3F07E723Cc4CCD8F6B5D7fB84893E2d20F52DB7C",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_PM",
                  type: "address",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "NotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughEth",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwnerOrApproved",
              type: "error",
            },
            {
              inputs: [],
              name: "WrongPeep",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep1",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep2",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "kid",
                  type: "uint256",
                },
              ],
              name: "Breed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "BreedingChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "BreedingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Buried",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FundsWithdrawn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "GiftHat",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Mint",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "MintingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "NameChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerProposed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipAccepted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "PeepsMetadataChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "allOwners",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allTokenURI",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenId2",
                  type: "uint256",
                },
              ],
              name: "breed",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "breedingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "buryPeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeBreedingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeMintingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "changeName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "changePeepsMetadata",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "funds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMintedPeeps",
              outputs: [
                {
                  internalType: "uint64[20]",
                  name: "",
                  type: "uint64[20]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "getOwnedPeeps",
              outputs: [
                {
                  internalType: "uint64[]",
                  name: "",
                  type: "uint64[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeeps",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeepsMetadatas",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "giftHat",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mint",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "mintingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pendingOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "proposeOwner",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "toggleBreeding",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        PeepsMetadata: {
          address: "0xfc76bc6f979Efdae2B175b231A44032b18F3a892",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "getPM2",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "genes",
                  type: "uint256",
                },
              ],
              name: "getTimes",
              outputs: [
                {
                  internalType: "uint32",
                  name: "kidTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "adultTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "oldTime",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep",
                  name: "peep",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  31337: [
    {
      chainId: "31337",
      name: "localhost",
      contracts: {
        Peeps: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_PM",
                  type: "address",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "NotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughEth",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwnerOrApproved",
              type: "error",
            },
            {
              inputs: [],
              name: "WrongPeep",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep1",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep2",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "kid",
                  type: "uint256",
                },
              ],
              name: "Breed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "BreedingChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "BreedingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Buried",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FundsWithdrawn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "GiftHat",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Mint",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "MintingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "NameChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerProposed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipAccepted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "PeepsMetadataChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "allOwners",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allTokenURI",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenId2",
                  type: "uint256",
                },
              ],
              name: "breed",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "breedingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "buryPeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeBreedingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeMintingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "changeName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "changePeepsMetadata",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "funds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMintedPeeps",
              outputs: [
                {
                  internalType: "uint64[20]",
                  name: "",
                  type: "uint64[20]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "getOwnedPeeps",
              outputs: [
                {
                  internalType: "uint64[]",
                  name: "",
                  type: "uint64[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeeps",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeepsMetadatas",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "giftHat",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mint",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "mintingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pendingOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "proposeOwner",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "toggleBreeding",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        PeepsMetadata: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "getPM2",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "genes",
                  type: "uint256",
                },
              ],
              name: "getTimes",
              outputs: [
                {
                  internalType: "uint32",
                  name: "kidTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "adultTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "oldTime",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep",
                  name: "peep",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      chainId: "80001",
      name: "polygonMumbai",
      contracts: {
        Peeps: {
          address: "0xf5F3C8CB83af69B76d85162D5EdC5705677F7647",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_PM",
                  type: "address",
                },
              ],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "NotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "NotEnoughEth",
              type: "error",
            },
            {
              inputs: [],
              name: "NotOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "WrongPeep",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep1",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "peep2",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "kid",
                  type: "uint256",
                },
              ],
              name: "Breed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "BreedingChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "BreedingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Buried",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FundsWithdrawn",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "GiftHat",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "minter",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Mint",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint64",
                  name: "id",
                  type: "uint64",
                },
              ],
              name: "Minted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "MintingFeeChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "NameChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnerProposed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipAccepted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "sender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "PeepsMetadataChanged",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "allOwners",
              outputs: [
                {
                  internalType: "address[]",
                  name: "",
                  type: "address[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "allTokenURI",
              outputs: [
                {
                  internalType: "string[]",
                  name: "",
                  type: "string[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId1",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenId2",
                  type: "uint256",
                },
              ],
              name: "breed",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "breedingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "buryPeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeBreedingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "newFee",
                  type: "uint256",
                },
              ],
              name: "changeMintingFee",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "newName",
                  type: "string",
                },
              ],
              name: "changeName",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newPM",
                  type: "address",
                },
              ],
              name: "changePeepsMetadata",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "funds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getMintedPeeps",
              outputs: [
                {
                  internalType: "uint64[20]",
                  name: "",
                  type: "uint64[20]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_owner",
                  type: "address",
                },
              ],
              name: "getOwnedPeeps",
              outputs: [
                {
                  internalType: "uint64[]",
                  name: "",
                  type: "uint64[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeeps",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getPeepsMetadatas",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "giverId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "receiverId",
                  type: "uint256",
                },
              ],
              name: "giftHat",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "mint",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "mintingFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "pendingOwner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "proposeOwner",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "toggleBreeding",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdraw",
              outputs: [],
              stateMutability: "payable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFunds",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        PeepsMetadata: {
          address: "0xC53ACfE8D5a5b40D9bfB2Ea9c17827cB4569345F",
          abi: [
            {
              inputs: [],
              stateMutability: "payable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "getPM2",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "genes",
                  type: "uint256",
                },
              ],
              name: "getTimes",
              outputs: [
                {
                  internalType: "uint32",
                  name: "kidTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "adultTime",
                  type: "uint32",
                },
                {
                  internalType: "uint32",
                  name: "oldTime",
                  type: "uint32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "genes",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "isBuried",
                      type: "bool",
                    },
                    {
                      internalType: "bool",
                      name: "breedingAllowed",
                      type: "bool",
                    },
                    {
                      internalType: "uint8",
                      name: "breedCount",
                      type: "uint8",
                    },
                    {
                      internalType: "uint24",
                      name: "hasHat",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor1",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "bodyColor2",
                      type: "uint24",
                    },
                    {
                      internalType: "uint24",
                      name: "eyesColor",
                      type: "uint24",
                    },
                    {
                      internalType: "uint32",
                      name: "birthTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "kidTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "adultTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint32",
                      name: "oldTime",
                      type: "uint32",
                    },
                    {
                      internalType: "uint64[2]",
                      name: "parents",
                      type: "uint64[2]",
                    },
                    {
                      internalType: "uint64[]",
                      name: "children",
                      type: "uint64[]",
                    },
                    {
                      internalType: "string",
                      name: "peepName",
                      type: "string",
                    },
                  ],
                  internalType: "struct Peep",
                  name: "peep",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "id",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
