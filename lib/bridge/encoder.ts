// Bridge encoder utilities
// Converts Stacks addresses to bytes32 format required by Ethereum xReserve contract

import * as P from "micro-packed";
import {
    createAddress,
    addressToString,
    AddressVersion,
    StacksWireType,
} from "@stacks/transactions";
import { hex } from "@scure/base";
import { type Hex, pad, toHex } from "viem";

/**
 * Encoder/decoder for Stacks addresses to bytes32 format
 * Required for cross-chain communication with xReserve
 *
 * Format: 11 zero bytes + 1 version byte + 20 hash160 bytes = 32 bytes
 */
export const remoteRecipientCoder = P.wrap<string>({
    encodeStream(w, value: string) {
        const address = createAddress(value);
        // Left pad with 11 zero bytes
        P.bytes(11).encodeStream(w, new Uint8Array(11).fill(0));
        // Add version byte
        P.U8.encodeStream(w, address.version);
        // Add 20-byte hash160
        P.bytes(20).encodeStream(w, hex.decode(address.hash160));
    },
    decodeStream(r) {
        // Skip left padding
        P.bytes(11).decodeStream(r);
        // Read version byte
        const version = P.U8.decodeStream(r);
        // Read 20 hash bytes
        const hash = P.bytes(20).decodeStream(r);
        return addressToString({
            hash160: hex.encode(hash),
            version: version as AddressVersion,
            type: StacksWireType.Address,
        });
    },
});

/**
 * Convert a Uint8Array to bytes32 hex string
 */
export function bytes32FromBytes(bytes: Uint8Array): Hex {
    return toHex(pad(bytes, { size: 32 }));
}

/**
 * Encode a Stacks address to bytes32 format for Ethereum contracts
 * @param stacksAddress - Stacks address (e.g., "ST1F1M4YP67NV360FBYR28V7C599AC46F8C4635SH")
 * @returns bytes32 hex string for use in Ethereum contract calls
 */
export function encodeStacksAddressForBridge(stacksAddress: string): Hex {
    try {
        const encoded = remoteRecipientCoder.encode(stacksAddress);
        return bytes32FromBytes(encoded);
    } catch (error) {
        throw new Error(`Invalid Stacks address: ${stacksAddress}`);
    }
}

/**
 * Validate a Stacks address format
 */
export function isValidStacksAddress(address: string): boolean {
    try {
        createAddress(address);
        return true;
    } catch {
        return false;
    }
}

/**
 * Encode an Ethereum address to bytes32 for Stacks withdrawal
 * @param ethAddress - Ethereum address (20 bytes)
 * @returns bytes32 hex string with left-padded zeros
 */
export function encodeEthAddressForWithdrawal(ethAddress: string): Hex {
    // Remove 0x prefix if present
    const cleanAddress = ethAddress.startsWith("0x")
        ? ethAddress.slice(2)
        : ethAddress;
    // Left-pad to 32 bytes
    return pad(`0x${cleanAddress}` as Hex, { size: 32 });
}
