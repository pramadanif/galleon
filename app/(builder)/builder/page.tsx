"use client";

import { useEffect, useState } from "react";
import { Icons } from "@/components/Icons";
import { useStacksWallet } from "@/lib/hooks/useStacksWallet";
import { getEscrowsForBuilder } from "@/lib/stacks/escrow";
import { formatUsdcx } from "@/lib/stacks/usdcx";
import type { Escrow } from "@/lib/types/escrow";

export default function BuilderDashboard() {
    const { address, usdcxBalance } = useStacksWallet();
    const [escrows, setEscrows] = useState<Escrow[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch escrows for this builder
    useEffect(() => {
        async function fetchEscrows() {
            if (!address) return;
            setLoading(true);
            try {
                const data = await getEscrowsForBuilder(address);
                setEscrows(data);
            } catch (error) {
                console.error("Failed to fetch escrows:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchEscrows();
    }, [address]);

    // Calculate totals
    const totalLocked = escrows.reduce((acc, e) => acc + e.lockedBalance, BigInt(0));
    const totalClaimable = escrows.reduce((acc, e) => acc + e.claimableBalance, BigInt(0));

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Your Escrows
                </h1>
                <p className="text-galleon-ink/60">
                    View and claim funds from your escrow agreements
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Wallet USDCx
                    </div>
                    <div className="text-2xl font-bold font-mono text-galleon-orange">
                        ${usdcxBalance ? formatUsdcx(usdcxBalance) : "0.00"}
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Active Escrows
                    </div>
                    <div className="text-2xl font-bold font-mono">{escrows.length}</div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Total Locked
                    </div>
                    <div className="text-2xl font-bold font-mono">
                        ${formatUsdcx(totalLocked)}
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6 border-l-4 border-l-galleon-orange">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Claimable
                    </div>
                    <div className="text-2xl font-bold font-mono text-galleon-orange">
                        ${formatUsdcx(totalClaimable)}
                    </div>
                </div>
            </div>

            {/* Escrows List */}
            <div>
                <h2 className="text-xl font-bold mb-6">Your Funded Projects</h2>

                {loading ? (
                    <div className="bg-white rounded-2xl border border-galleon-ink/5 p-12 text-center">
                        <div className="animate-pulse text-galleon-ink/50">
                            Loading escrows...
                        </div>
                    </div>
                ) : escrows.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-galleon-ink/5 p-12 text-center">
                        <div className="w-16 h-16 bg-galleon-sand/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Icons.FileText className="text-galleon-ink/30" size={28} />
                        </div>
                        <h3 className="text-lg font-bold text-galleon-ink/70 mb-2">
                            No escrows found
                        </h3>
                        <p className="text-galleon-ink/50">
                            When investors fund your projects, they will appear here
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {escrows.map((escrow) => (
                            <div
                                key={escrow.id}
                                className="bg-white rounded-xl border border-galleon-ink/5 p-6 hover:border-galleon-orange/30 transition-colors"
                            >
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="font-mono font-bold">
                                                Escrow #{escrow.id}
                                            </span>
                                            <span
                                                className={`px-2 py-0.5 rounded text-xs font-bold ${escrow.status === "active"
                                                        ? "bg-green-100 text-green-700"
                                                        : escrow.status === "completed"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {escrow.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="text-sm text-galleon-ink/50">
                                            From: {escrow.investor.slice(0, 10)}...
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm text-galleon-ink/50">Total</div>
                                        <div className="font-mono font-bold">
                                            ${formatUsdcx(escrow.totalAmount)}
                                        </div>
                                    </div>
                                </div>

                                {/* Milestones */}
                                <div className="mt-4 pt-4 border-t border-galleon-ink/5">
                                    <div className="text-xs font-mono text-galleon-ink/50 mb-2">
                                        MILESTONES
                                    </div>
                                    <div className="flex gap-2">
                                        {escrow.milestones.map((m) => (
                                            <div
                                                key={m.id}
                                                className={`flex-1 h-2 rounded-full ${m.status === "claimed"
                                                        ? "bg-green-500"
                                                        : m.status === "released"
                                                            ? "bg-galleon-orange"
                                                            : "bg-galleon-sand"
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Claim button if claimable */}
                                {escrow.claimableBalance > BigInt(0) && (
                                    <div className="mt-4">
                                        <button className="bg-galleon-orange text-galleon-ink font-semibold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity text-sm">
                                            Claim ${formatUsdcx(escrow.claimableBalance)}
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
