
export const chainId = "11155111";

export const contractAddresses: { [key: string]: string } = {
  "11155111": "0x74B1Fa531aA53AC18bE9eB5A5B6D1dc0F118c822", // Sepolia
  "2": "0x0bf7FC2bA86001438f4c9cca000B9cE993595f66", // Hedera Testnet
  "3": "0xB3D1988C476B679ed16D115e7e6CEE87fC79b46F", // Morphtestnet
  "545": "0xeAE50FF954bF205485959Bd5E051942E793D9d2E", //flow
};

export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ideaId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "CollaboratorAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ideaId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "CollaboratorRejected",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "ideaId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "publisher",
        type: "address",
      },
    ],
    name: "IdeaSubmitted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ideaId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "InterestExpressed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "ideaId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "voter",
        type: "address",
      },
    ],
    name: "Voted",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_collaborator",
        type: "address",
      },
    ],
    name: "acceptCollaborator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
    ],
    name: "closeIdea",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
    ],
    name: "expressInterest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
    ],
    name: "getInterestedUsers",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
    ],
    name: "getVoteCount",
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
    name: "ideaCounter",
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
        name: "",
        type: "uint256",
      },
    ],
    name: "ideas",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "address",
        name: "publisher",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "voteCount",
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
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "interests",
    outputs: [
      {
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isAccepted",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_collaborator",
        type: "address",
      },
    ],
    name: "isCollaboratorAccepted",
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
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "_collaborator",
        type: "address",
      },
    ],
    name: "rejectCollaborator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "submitIdea",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_ideaId",
        type: "uint256",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
