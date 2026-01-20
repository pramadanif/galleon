"use client";

import { useState, useEffect, useCallback } from "react";
import {
    isStacksWalletConnected,
    getStacksAddress,
    connectStacksWallet,
    disconnectStacksWallet,
} from "../stacks/connect";
import { getUsdcxBalance } from "../stacks/usdcx";
import type { StacksWalletState } from "../types/escrow";

/**
 * Hook for Stacks wallet state and USDCx balance
 */
export function useStacksWallet(): StacksWalletState & {
    connect: () => void;
    disconnect: () => void;
    isLoading: boolean;
    refetchBalance: () => Promise<void>;
} {
    const [state, setState] = useState<StacksWalletState>({
        isConnected: false,
        isCorrectNetwork: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    // Check wallet connection and fetch balance
    const checkWallet = useCallback(async () => {
        setIsLoading(true);
        try {
            const connected = isStacksWalletConnected();
            const address = getStacksAddress();

            if (connected && address) {
                // Fetch USDCx balance
                const balance = await getUsdcxBalance(address);

                setState({
                    isConnected: true,
                    address,
                    network: "testnet",
                    isCorrectNetwork: true,
                    usdcxBalance: balance,
                });
            } else {
                setState({
                    isConnected: false,
                    isCorrectNetwork: false,
                });
            }
        } catch (error) {
            console.error("Error checking Stacks wallet:", error);
            setState({
                isConnected: false,
                isCorrectNetwork: false,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Initial check on mount
    useEffect(() => {
        checkWallet();
    }, [checkWallet]);

    // Refetch balance
    const refetchBalance = async () => {
        if (state.address) {
            try {
                const balance = await getUsdcxBalance(state.address);
                setState((prev) => ({ ...prev, usdcxBalance: balance }));
            } catch (error) {
                console.error("Error refetching balance:", error);
            }
        }
    };

    return {
        ...state,
        connect: connectStacksWallet,
        disconnect: disconnectStacksWallet,
        isLoading,
        refetchBalance,
    };
}
