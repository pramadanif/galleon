"use client";

import Link from "next/link";
import { Icons } from "@/components/Icons";
import { useEthereumWallet } from "@/lib/hooks/useEthereumWallet";
import { formatUsdc } from "@/lib/ethereum/usdc";

export default function InvestorDashboard() {
    const { usdcBalance } = useEthereumWallet();

    return (
        <div className="max-w-6xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Your Escrows
                </h1>
                <p className="text-galleon-ink/60">
                    Fund Bitcoin builders with programmable USDC escrows
                </p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Wallet USDC
                    </div>
                    <div className="text-2xl font-bold font-mono">
                        ${usdcBalance ? formatUsdc(usdcBalance) : "0.00"}
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Active Escrows
                    </div>
                    <div className="text-2xl font-bold font-mono">0</div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Total Funded
                    </div>
                    <div className="text-2xl font-bold font-mono">$0.00</div>
                </div>
                <div className="bg-white rounded-xl border border-galleon-ink/5 p-6">
                    <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                        Released
                    </div>
                    <div className="text-2xl font-bold font-mono">$0.00</div>
                </div>
            </div>

            {/* Create New Escrow CTA */}
            <div className="bg-galleon-sand/30 rounded-2xl border border-galleon-ink/5 p-8 mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h2 className="text-xl font-bold mb-2">Fund a Bitcoin Builder</h2>
                        <p className="text-galleon-ink/60 max-w-lg">
                            Create a new escrow with milestone-based releases. Your USDC will
                            be bridged to Stacks as USDCx and locked in a Clarity smart
                            contract.
                        </p>
                    </div>
                    <Link
                        href="/investor/create"
                        className="bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2 shrink-0"
                    >
                        <Icons.Plus size={18} />
                        Create Escrow
                    </Link>
                </div>
            </div>

            {/* Escrows List */}
            <div>
                <h2 className="text-xl font-bold mb-6">Your Funded Escrows</h2>

                {/* Empty State */}
                <div className="bg-white rounded-2xl border border-galleon-ink/5 p-12 text-center">
                    <div className="w-16 h-16 bg-galleon-sand/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icons.FileText className="text-galleon-ink/30" size={28} />
                    </div>
                    <h3 className="text-lg font-bold text-galleon-ink/70 mb-2">
                        No escrows yet
                    </h3>
                    <p className="text-galleon-ink/50 mb-6">
                        Create your first escrow to start funding builders
                    </p>
                    <Link
                        href="/investor/create"
                        className="inline-flex items-center gap-2 text-galleon-orange font-semibold hover:underline"
                    >
                        Create your first escrow
                        <Icons.ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
