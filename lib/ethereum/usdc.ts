// USDC contract interactions on Ethereum
import { CONTRACTS, ERC20_ABI } from "../config/contracts";

// Get USDC contract config for wagmi hooks
export const usdcContract = {
    address: CONTRACTS.ethereum.usdc,
    abi: ERC20_ABI,
} as const;

// Format USDC amount from bigint to string (6 decimals)
export function formatUsdc(amount: bigint): string {
    const value = Number(amount) / 1e6;
    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
}

// Parse USDC string to bigint (6 decimals)
export function parseUsdc(amount: string): bigint {
    const cleanAmount = amount.replace(/,/g, "");
    const value = parseFloat(cleanAmount);
    if (isNaN(value) || value < 0) {
        throw new Error("Invalid USDC amount");
    }
    return BigInt(Math.floor(value * 1e6));
}

// Validate USDC amount is within limits
export function validateUsdcAmount(
    amount: bigint,
    balance: bigint,
    minAmount: bigint = BigInt(1_000_000) // 1 USDC minimum
): { valid: boolean; error?: string } {
    if (amount < minAmount) {
        return {
            valid: false,
            error: `Minimum amount is ${formatUsdc(minAmount)} USDC`,
        };
    }
    if (amount > balance) {
        return {
            valid: false,
            error: `Insufficient balance. You have ${formatUsdc(balance)} USDC`,
        };
    }
    return { valid: true };
}
