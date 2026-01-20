"use client";

import { useState, useCallback, useEffect } from "react";
import type { BridgeState, BridgeStatus } from "../types/escrow";
import {
    createBridgePoller,
    getEstimatedTimeRemaining,
    formatBridgeStatus,
} from "../bridge/tracker";

/**
 * Hook for tracking bridge status
 */
export function useBridgeStatus(stacksAddress: string | undefined) {
    const [state, setState] = useState<BridgeState>({ status: "idle" });
    const [poller, setPoller] = useState<ReturnType<typeof createBridgePoller> | null>(null);

    // Update status
    const setStatus = useCallback((status: BridgeStatus) => {
        setState((prev) => ({ ...prev, status }));
    }, []);

    // Start tracking after Ethereum deposit
    const startTracking = useCallback(
        (depositTxHash: string, expectedAmount: bigint) => {
            if (!stacksAddress) return;

            setState({
                status: "deposited",
                depositTxHash,
                startedAt: Date.now(),
            });

            const newPoller = createBridgePoller(
                stacksAddress,
                expectedAmount,
                setStatus,
                () => {
                    setState((prev) => ({ ...prev, status: "completed" }));
                },
                (error) => {
                    setState((prev) => ({ ...prev, status: "failed", error }));
                }
            );

            setPoller(newPoller);
            newPoller.start();
        },
        [stacksAddress, setStatus]
    );

    // Record approval tx
    const setApproving = useCallback((txHash?: string) => {
        setState({
            status: "approving",
            approveTxHash: txHash,
            startedAt: Date.now(),
        });
    }, []);

    const setApproved = useCallback((txHash: string) => {
        setState((prev) => ({
            ...prev,
            status: "approved",
            approveTxHash: txHash,
        }));
    }, []);

    const setDepositing = useCallback(() => {
        setState((prev) => ({ ...prev, status: "depositing" }));
    }, []);

    // Reset state
    const reset = useCallback(() => {
        poller?.stop();
        setState({ status: "idle" });
    }, [poller]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            poller?.stop();
        };
    }, [poller]);

    // Get formatted status
    const formatted = formatBridgeStatus(state.status);
    const timeRemaining = state.startedAt
        ? getEstimatedTimeRemaining(state.startedAt)
        : undefined;

    return {
        ...state,
        ...formatted,
        timeRemaining,
        setApproving,
        setApproved,
        setDepositing,
        startTracking,
        reset,
    };
}
