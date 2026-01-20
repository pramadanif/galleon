// xReserve bridge contract interactions
import { CONTRACTS, X_RESERVE_ABI, BRIDGE_CONFIG } from "../config/contracts";
import { encodeStacksAddressForBridge } from "../bridge/encoder";
import type { Hex } from "viem";

// xReserve contract config for wagmi
export const xReserveContract = {
    address: CONTRACTS.ethereum.xReserve,
    abi: X_RESERVE_ABI,
} as const;

// Parameters for depositToRemote call
export interface DepositToRemoteParams {
    value: bigint; // Amount in micro USDC (6 decimals)
    stacksRecipient: string; // Stacks address to receive USDCx
}

/**
 * Prepare arguments for xReserve.depositToRemote call
 * This initiates the USDC → USDCx bridge
 */
export function prepareDepositToRemoteArgs(
    params: DepositToRemoteParams
): readonly [bigint, number, Hex, `0x${string}`, bigint, Hex] {
    const remoteRecipient = encodeStacksAddressForBridge(params.stacksRecipient);

    return [
        params.value, // value: uint256
        BRIDGE_CONFIG.stacksDomainId, // remoteDomain: uint32 (10003 for Stacks)
        remoteRecipient, // remoteRecipient: bytes32
        CONTRACTS.ethereum.usdc, // localToken: address
        BigInt(0), // maxFee: uint256 (0 for testnet)
        "0x" as Hex, // hookData: bytes (empty)
    ] as const;
}

/**
 * Estimate bridge completion time
 * @returns Estimated timestamp when bridge should complete
 */
export function estimateBridgeCompletion(): number {
    return Date.now() + BRIDGE_CONFIG.pegInTime;
}
