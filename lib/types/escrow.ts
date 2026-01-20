// GALLEON Protocol TypeScript Types

export type MilestoneStatus = "locked" | "released" | "claimed";
export type EscrowStatus = "active" | "completed" | "clawback";

export interface Milestone {
    id: number;
    amount: bigint; // in micro USDCx (6 decimals)
    status: MilestoneStatus;
    proofHash?: string;
    releasedAt?: number; // block height
    claimedAt?: number; // block height
}

export interface Escrow {
    id: string;
    investor: string; // Ethereum address
    builder: string; // Stacks address
    totalAmount: bigint; // in micro USDCx
    milestones: Milestone[];
    createdAt: number; // block height
    status: EscrowStatus;

    // Derived from on-chain state
    lockedBalance: bigint;
    releasedBalance: bigint;
    claimableBalance: bigint;
}

// Form input types
export interface CreateEscrowInput {
    builderAddress: string; // Stacks address
    amount: string; // USDC amount as string (e.g., "100.00")
    milestones: MilestoneInput[];
}

export interface MilestoneInput {
    percentage: number; // 0-100
    description: string;
}

// Bridge tracking types
export type BridgeStatus =
    | "idle"
    | "approving"
    | "approved"
    | "depositing"
    | "deposited"
    | "pending_attestation"
    | "minting"
    | "completed"
    | "failed";

export interface BridgeState {
    status: BridgeStatus;
    approveTxHash?: string;
    depositTxHash?: string;
    stacksMintTxId?: string;
    error?: string;
    startedAt?: number;
}

// Wallet state types
export interface EthereumWalletState {
    isConnected: boolean;
    address?: `0x${string}`;
    chainId?: number;
    isCorrectChain: boolean;
    usdcBalance?: bigint;
}

export interface StacksWalletState {
    isConnected: boolean;
    address?: string;
    network?: "mainnet" | "testnet";
    isCorrectNetwork: boolean;
    usdcxBalance?: bigint;
}

// API response types for Stacks
export interface StacksBalanceResponse {
    stx: { balance: string };
    fungible_tokens: {
        [key: string]: { balance: string };
    };
}

export interface StacksTransactionStatus {
    tx_id: string;
    tx_status: "pending" | "success" | "abort_by_response" | "abort_by_post_condition";
    tx_type: string;
}
