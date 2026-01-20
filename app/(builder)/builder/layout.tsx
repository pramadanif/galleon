"use client";

import { useRouter } from "next/navigation";
import { useStacksWallet } from "@/lib/hooks/useStacksWallet";
import { Icons } from "@/components/Icons";
import { formatUsdcx } from "@/lib/stacks/usdcx";

export default function BuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isConnected, address, usdcxBalance, connect, disconnect, isLoading } =
        useStacksWallet();

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-galleon-cream flex items-center justify-center">
                <div className="animate-pulse text-galleon-ink/50">
                    Loading wallet...
                </div>
            </div>
        );
    }

    // Not connected - show connect wallet
    if (!isConnected) {
        return (
            <div className="min-h-screen bg-galleon-cream flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-galleon-ink/5">
                    <div className="w-16 h-16 bg-galleon-orange/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icons.Wallet className="text-galleon-orange" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-galleon-ink mb-2">
                        Connect Stacks Wallet
                    </h1>
                    <p className="text-galleon-ink/60 mb-8">
                        Connect Leather or Xverse to access the Builder Dashboard
                    </p>

                    <button
                        onClick={connect}
                        className="w-full bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                    >
                        <Icons.Wallet size={18} />
                        Connect Stacks Wallet
                    </button>

                    <button
                        onClick={() => router.push("/")}
                        className="mt-4 text-sm text-galleon-ink/50 hover:text-galleon-ink"
                    >
                        ← Back to Home
                    </button>
                </div>
            </div>
        );
    }

    // Connected - render children with header
    return (
        <div className="min-h-screen bg-galleon-cream">
            {/* Builder Header */}
            <header className="bg-galleon-ink text-galleon-cream border-b border-galleon-cream/10 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="font-bold text-lg">
                            GALLEON
                        </a>
                        <span className="text-galleon-cream/30">|</span>
                        <span className="text-sm font-medium text-galleon-orange">
                            Builder Dashboard
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-galleon-cream/50 font-mono">
                                USDCx Balance
                            </div>
                            <div className="font-mono font-bold text-galleon-orange">
                                {usdcxBalance ? formatUsdcx(usdcxBalance) : "0.00"}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-galleon-cream/10" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-mono text-galleon-cream/60">
                                {address?.slice(0, 8)}...{address?.slice(-4)}
                            </span>
                        </div>
                        <button
                            onClick={disconnect}
                            className="text-sm text-galleon-cream/50 hover:text-galleon-cream"
                        >
                            Disconnect
                        </button>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main>{children}</main>
        </div>
    );
}
