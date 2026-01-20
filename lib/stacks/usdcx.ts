// USDCx token interactions on Stacks
import { CONTRACTS } from "../config/contracts";
import { RPC_URLS } from "../config/networks";
import type { StacksBalanceResponse } from "../types/escrow";

// USDCx contract identifier
export const USDCX_CONTRACT_ID = `${CONTRACTS.stacks.usdcx.address}.${CONTRACTS.stacks.usdcx.contractName}::${CONTRACTS.stacks.usdcx.tokenName}`;

/**
 * Fetch USDCx balance for a Stacks address
 * @param address - Stacks address
 * @returns Balance in micro USDCx (6 decimals)
 */
export async function getUsdcxBalance(address: string): Promise<bigint> {
    const url = `${RPC_URLS.stacks}/extended/v1/address/${address}/balances`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch balance: ${response.statusText}`);
    }

    const data: StacksBalanceResponse = await response.json();

    // Find USDCx token balance
    const usdcxKey = Object.keys(data.fungible_tokens).find((key) =>
        key.includes("usdcx")
    );

    if (!usdcxKey) {
        return BigInt(0);
    }

    return BigInt(data.fungible_tokens[usdcxKey].balance);
}

/**
 * Format USDCx amount from bigint to string
 */
export function formatUsdcx(amount: bigint): string {
    const value = Number(amount) / 1e6;
    return value.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 6,
    });
}

/**
 * Check if USDCx balance is sufficient for escrow creation
 */
export function hasMinimumUsdcxBalance(
    balance: bigint,
    requiredAmount: bigint
): boolean {
    return balance >= requiredAmount;
}
