import { sepolia } from "wagmi/chains";

// Supported networks
export const SUPPORTED_CHAINS = {
    ethereum: sepolia,
    stacks: {
        name: "Stacks Testnet",
        network: "testnet" as const,
        apiUrl: "https://api.testnet.hiro.so",
        explorerUrl: "https://explorer.hiro.so",
    },
} as const;

// Chain IDs for validation
export const CHAIN_IDS = {
    sepoliaTestnet: 11155111,
} as const;

// RPC endpoints
export const RPC_URLS = {
    ethereum: "https://ethereum-sepolia.publicnode.com",
    stacks: "https://api.testnet.hiro.so",
} as const;

// Explorer URLs for transaction links
export const EXPLORER_URLS = {
    ethereum: "https://sepolia.etherscan.io",
    stacks: "https://explorer.hiro.so",
} as const;

// Helper to get explorer tx URL
export function getEthereumTxUrl(txHash: string): string {
    return `${EXPLORER_URLS.ethereum}/tx/${txHash}`;
}

export function getStacksTxUrl(txId: string): string {
    return `${EXPLORER_URLS.stacks}/txid/${txId}?chain=testnet`;
}
