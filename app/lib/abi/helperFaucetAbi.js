export const HelperFaucetAbi = [
  {
    type: "constructor",
    inputs: [
      { name: "vc_", type: "address", internalType: "address" },
      {
        name: "factory_",
        type: "address",
        internalType: "contract XYKPoolFactory",
      },
      {
        name: "factory2_",
        type: "address",
        internalType: "contract StableSwapPoolFactory",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "amountADesired", type: "uint256", internalType: "uint256" },
      { name: "amountBDesired", type: "uint256", internalType: "uint256" },
      { name: "amountAMin", type: "uint256", internalType: "uint256" },
      { name: "amountBMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "addLiquidityETH",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "amountADesired", type: "uint256", internalType: "uint256" },
      { name: "amountAMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountETH", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "allPairs",
    inputs: [{ name: "i", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allPairsLength",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "deposit",
    inputs: [
      { name: "p", type: "address", internalType: "address" },
      { name: "a", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "execute1",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "execute2",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "t2", type: "address", internalType: "address" },
      { name: "m2", type: "uint8", internalType: "uint8" },
      { name: "a2", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "execute3",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "t2", type: "address", internalType: "address" },
      { name: "m2", type: "uint8", internalType: "uint8" },
      { name: "a2", type: "int128", internalType: "int128" },
      { name: "t3", type: "address", internalType: "address" },
      { name: "m3", type: "uint8", internalType: "uint8" },
      { name: "a3", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "factory",
    inputs: [],
    outputs: [
      { name: "", type: "address", internalType: "contract XYKPoolFactory" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPair",
    inputs: [
      { name: "t0", type: "address", internalType: "address" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
    ],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initializeFacet",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "query1",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "query2",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "t2", type: "address", internalType: "address" },
      { name: "m2", type: "uint8", internalType: "uint8" },
      { name: "a2", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "query3",
    inputs: [
      { name: "pool", type: "address", internalType: "contract IPool" },
      { name: "method", type: "uint8", internalType: "uint8" },
      { name: "t1", type: "address", internalType: "address" },
      { name: "m1", type: "uint8", internalType: "uint8" },
      { name: "a1", type: "int128", internalType: "int128" },
      { name: "t2", type: "address", internalType: "address" },
      { name: "m2", type: "uint8", internalType: "uint8" },
      { name: "a2", type: "int128", internalType: "int128" },
      { name: "t3", type: "address", internalType: "address" },
      { name: "m3", type: "uint8", internalType: "uint8" },
      { name: "a3", type: "int128", internalType: "int128" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [{ name: "", type: "int128[]", internalType: "int128[]" }],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "quoteAddLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "amountADesired", type: "uint256", internalType: "uint256" },
      { name: "amountBDesired", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "quoteRemoveLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      { name: "tokenA", type: "address", internalType: "address" },
      { name: "tokenB", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountAMin", type: "uint256", internalType: "uint256" },
      { name: "amountBMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountA", type: "uint256", internalType: "uint256" },
      { name: "amountB", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidityETH",
    inputs: [
      { name: "token", type: "address", internalType: "address" },
      { name: "stable", type: "bool", internalType: "bool" },
      { name: "liquidity", type: "uint256", internalType: "uint256" },
      { name: "amountTokenMin", type: "uint256", internalType: "uint256" },
      { name: "amountETHMin", type: "uint256", internalType: "uint256" },
      { name: "to", type: "address", internalType: "address" },
      { name: "deadline", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      { name: "amountToken", type: "uint256", internalType: "uint256" },
      { name: "amountETH", type: "uint256", internalType: "uint256" },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stableFactory",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract StableSwapPoolFactory",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "withdraw",
    inputs: [
      { name: "p", type: "address", internalType: "address" },
      { name: "a", type: "uint256", internalType: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "BribeAttached",
    inputs: [
      {
        name: "gauge",
        type: "address",
        indexed: true,
        internalType: "contract IGauge",
      },
      {
        name: "bribe",
        type: "address",
        indexed: true,
        internalType: "contract IBribe",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "BribeKilled",
    inputs: [
      {
        name: "gauge",
        type: "address",
        indexed: true,
        internalType: "contract IGauge",
      },
      {
        name: "bribe",
        type: "address",
        indexed: true,
        internalType: "contract IBribe",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Convert",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "contract IConverter",
      },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenRef",
        type: "bytes32[]",
        indexed: false,
        internalType: "Token[]",
      },
      {
        name: "delta",
        type: "int128[]",
        indexed: false,
        internalType: "int128[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DiamondCut",
    inputs: [
      {
        name: "_diamondCut",
        type: "tuple[]",
        indexed: false,
        internalType: "struct VaultStorage.FacetCut[]",
        components: [
          { name: "facetAddress", type: "address", internalType: "address" },
          {
            name: "action",
            type: "uint8",
            internalType: "enum VaultStorage.FacetCutAction",
          },
          {
            name: "functionSelectors",
            type: "bytes4[]",
            internalType: "bytes4[]",
          },
        ],
      },
      {
        name: "_init",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "_calldata",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Gauge",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "contract IGauge",
      },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenRef",
        type: "bytes32[]",
        indexed: false,
        internalType: "Token[]",
      },
      {
        name: "delta",
        type: "int128[]",
        indexed: false,
        internalType: "int128[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GaugeKilled",
    inputs: [
      {
        name: "gauge",
        type: "address",
        indexed: true,
        internalType: "contract IGauge",
      },
      { name: "killed", type: "bool", indexed: false, internalType: "bool" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "contract ISwap",
      },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenRef",
        type: "bytes32[]",
        indexed: false,
        internalType: "Token[]",
      },
      {
        name: "delta",
        type: "int128[]",
        indexed: false,
        internalType: "int128[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UserBalance",
    inputs: [
      { name: "to", type: "address", indexed: true, internalType: "address" },
      { name: "from", type: "address", indexed: true, internalType: "address" },
      {
        name: "tokenRef",
        type: "bytes32[]",
        indexed: false,
        internalType: "Token[]",
      },
      {
        name: "delta",
        type: "int128[]",
        indexed: false,
        internalType: "int128[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Vote",
    inputs: [
      {
        name: "pool",
        type: "address",
        indexed: true,
        internalType: "contract IGauge",
      },
      { name: "user", type: "address", indexed: true, internalType: "address" },
      {
        name: "voteDelta",
        type: "int256",
        indexed: false,
        internalType: "int256",
      },
    ],
    anonymous: false,
  },
];
