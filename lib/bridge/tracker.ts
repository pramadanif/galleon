// Bridge status tracker
// Polls Stacks API to check for USDCx mint after Ethereum deposit

import { BRIDGE_CONFIG } from "../config/contracts";
import { RPC_URLS } from "../config/networks";
import type { BridgeState, BridgeStatus } from "../types/escrow";

const POLL_INTERVAL = 30000; // 30 seconds
const MAX_POLL_TIME = 45 * 60 * 1000; // 45 minutes max

/**
 * Check if USDCx has been minted on Stacks
 * @param address - Stacks address to check
 * @param expectedAmount - Expected USDCx amount (optional)
 * @returns true if balance detected
 */
export async function checkUsdcxMint(
    address: string,
    expectedAmount?: bigint
): Promise<boolean> {
    const url = `${RPC_URLS.stacks}/extended/v1/address/${address}/balances`;

    try {
        const response = await fetch(url);
        if (!response.ok) return false;

        const data = await response.json();
        const usdcxKey = Object.keys(data.fungible_tokens || {}).find((key) =>
            key.includes("usdcx")
        );

        if (!usdcxKey) return false;

        const balance = BigInt(data.fungible_tokens[usdcxKey].balance);

        if (expectedAmount) {
            return balance >= expectedAmount;
        }

        return balance > BigInt(0);
    } catch (error) {
        console.error("Error checking USDCx mint:", error);
        return false;
    }
}

/**
 * Get estimated time remaining for bridge
 */
export function getEstimatedTimeRemaining(startedAt: number): string {
    const elapsed = Date.now() - startedAt;
    const remaining = BRIDGE_CONFIG.pegInTime - elapsed;

    if (remaining <= 0) return "Any moment now...";

    const minutes = Math.ceil(remaining / 60000);
    return `~${minutes} min remaining`;
}

/**
 * Create a bridge status poller
 * Used to track USDC → USDCx bridge progress
 */
export function createBridgePoller(
    stacksAddress: string,
    expectedAmount: bigint,
    onStatusChange: (status: BridgeStatus) => void,
    onComplete: () => void,
    onError: (error: string) => void
): { start: () => void; stop: () => void } {
    let intervalId: NodeJS.Timeout | null = null;
    let startTime: number | null = null;

    const poll = async () => {
        try {
            const hasMinted = await checkUsdcxMint(stacksAddress, expectedAmount);

            if (hasMinted) {
                onStatusChange("completed");
                onComplete();
                stop();
                return;
            }

            // Check if we've exceeded max poll time
            if (startTime && Date.now() - startTime > MAX_POLL_TIME) {
                onError("Bridge timeout. Please check manually.");
                stop();
                return;
            }
        } catch (error) {
            console.error("Bridge poll error:", error);
        }
    };

    const start = () => {
        startTime = Date.now();
        onStatusChange("pending_attestation");
        poll(); // Initial check
        intervalId = setInterval(poll, POLL_INTERVAL);
    };

    const stop = () => {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    };

    return { start, stop };
}

/**
 * Format bridge state for display
 */
export function formatBridgeStatus(status: BridgeStatus): {
    label: string;
    description: string;
    color: "orange" | "green" | "red" | "ink";
} {
    const statusMap: Record<
        BridgeStatus,
        { label: string; description: string; color: "orange" | "green" | "red" | "ink" }
    > = {
        idle: { label: "Ready", description: "Ready to start bridge", color: "ink" },
        approving: {
            label: "Approving",
            description: "Waiting for USDC approval...",
            color: "orange",
        },
        approved: { label: "Approved", description: "USDC approved", color: "green" },
        depositing: {
            label: "Depositing",
            description: "Initiating cross-chain deposit...",
            color: "orange",
        },
        deposited: {
            label: "Deposited",
            description: "USDC deposited. Waiting for bridge...",
            color: "orange",
        },
        pending_attestation: {
            label: "Bridging",
            description: "Cross-chain attestation in progress...",
            color: "orange",
        },
        minting: {
            label: "Minting",
            description: "USDCx is being minted on Stacks...",
            color: "orange",
        },
        completed: {
            label: "Completed",
            description: "Bridge successful! USDCx available.",
            color: "green",
        },
        failed: { label: "Failed", description: "Bridge failed", color: "red" },
    };

    return statusMap[status];
}
