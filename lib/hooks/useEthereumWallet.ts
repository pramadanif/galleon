"use client";

import { useAccount, useChainId, useSwitchChain, useReadContract } from "wagmi";
import { CONTRACTS, ERC20_ABI } from "../config/contracts";
import { CHAIN_IDS } from "../config/networks";
import type { EthereumWalletState } from "../types/escrow";

/**
 * Hook for Ethereum wallet state and USDC balance
 * Validates chain ID and provides methods to switch chain
 */
export function useEthereumWallet(): EthereumWalletState & {
    switchToSepolia: () => void;
    isLoading: boolean;
} {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();
    const { switchChain } = useSwitchChain();

    // Check if on correct chain (Sepolia)
    const isCorrectChain = chainId === CHAIN_IDS.sepoliaTestnet;

    // Get USDC balance using readContract
    const { data: usdcBalance, isLoading } = useReadContract({
        address: CONTRACTS.ethereum.usdc,
        abi: ERC20_ABI,
        functionName: "balanceOf",
        args: address ? [address] : undefined,
        query: {
            enabled: isConnected && isCorrectChain && !!address,
            refetchInterval: 10000, // Refetch every 10 seconds
        },
    });

    const switchToSepolia = () => {
        switchChain({ chainId: CHAIN_IDS.sepoliaTestnet });
    };

    return {
        isConnected,
        address,
        chainId,
        isCorrectChain,
        usdcBalance: usdcBalance as bigint | undefined,
        switchToSepolia,
        isLoading,
    };
}

