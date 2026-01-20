// Contract addresses for GALLEON protocol
// Source: https://docs.stacks.co/bridging/usdcx/contracts

export const CONTRACTS = {
    // Ethereum Sepolia Testnet
    ethereum: {
        usdc: "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as const,
        xReserve: "0x008888878f94C0d87defdf0B07f46B93C1934442" as const,
    },
    // Stacks Testnet
    stacks: {
        usdcx: {
            address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM",
            contractName: "usdcx",
            tokenName: "usdcx-token",
        },
        // GALLEON Escrow contract - deploy before use
        escrow: {
            address: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM", // TODO: Update after deployment
            contractName: "galleon-escrow",
        },
    },
} as const;

// Bridge configuration
export const BRIDGE_CONFIG = {
    stacksDomainId: 10003, // Constant for all networks
    ethereumDomainId: 0,
    // Timing estimates (in milliseconds)
    pegInTime: 15 * 60 * 1000, // ~15 minutes testnet
    pegOutTime: 25 * 60 * 1000, // ~25 minutes testnet
    // Minimum amounts (in micro units, 6 decimals)
    minDepositTestnet: 1_000_000, // 1 USDC
    minWithdrawTestnet: 4_800_000, // 4.80 USDCx
} as const;

// ABI fragments for Ethereum contracts
export const ERC20_ABI = [
    {
        name: "approve",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "spender", type: "address" },
            { name: "amount", type: "uint256" },
        ],
        outputs: [{ name: "success", type: "bool" }],
    },
    {
        name: "balanceOf",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "account", type: "address" }],
        outputs: [{ name: "balance", type: "uint256" }],
    },
    {
        name: "allowance",
        type: "function",
        stateMutability: "view",
        inputs: [
            { name: "owner", type: "address" },
            { name: "spender", type: "address" },
        ],
        outputs: [{ name: "remaining", type: "uint256" }],
    },
] as const;

export const X_RESERVE_ABI = [
    {
        name: "depositToRemote",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [
            { name: "value", type: "uint256" },
            { name: "remoteDomain", type: "uint32" },
            { name: "remoteRecipient", type: "bytes32" },
            { name: "localToken", type: "address" },
            { name: "maxFee", type: "uint256" },
            { name: "hookData", type: "bytes" },
        ],
        outputs: [],
    },
] as const;
