"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEthereumWallet } from "@/lib/hooks/useEthereumWallet";
import { Icons } from "@/components/Icons";

export default function InvestorLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { isConnected, isCorrectChain, usdcBalance, switchToSepolia } =
        useEthereumWallet();
    const { connectors, connect } = useConnect();
    const { disconnect } = useDisconnect();
    const { address } = useAccount();

    // Redirect if not on Ethereum
    useEffect(() => {
        if (isConnected && !isCorrectChain) {
            // Don't redirect, just show warning
        }
    }, [isConnected, isCorrectChain]);

    // Not connected - show connect wallet
    if (!isConnected) {
        return (
            <div className="min-h-screen bg-galleon-cream flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-galleon-ink/5">
                    <div className="w-16 h-16 bg-galleon-sand/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icons.Wallet className="text-galleon-orange" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-galleon-ink mb-2">
                        Connect Ethereum Wallet
                    </h1>
                    <p className="text-galleon-ink/60 mb-8">
                        Connect MetaMask to access the Investor Dashboard
                    </p>

                    {connectors.map((connector) => (
                        <button
                            key={connector.uid}
                            onClick={() => connect({ connector })}
                            className="w-full bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                        >
                            <Icons.Wallet size={18} />
                            Connect {connector.name}
                        </button>
                    ))}

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

    // Wrong chain - show switch prompt
    if (!isCorrectChain) {
        return (
            <div className="min-h-screen bg-galleon-cream flex items-center justify-center p-6">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center border border-galleon-ink/5">
                    <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icons.AlertTriangle className="text-red-500" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-galleon-ink mb-2">
                        Wrong Network
                    </h1>
                    <p className="text-galleon-ink/60 mb-8">
                        Please switch to Ethereum Sepolia Testnet
                    </p>

                    <button
                        onClick={switchToSepolia}
                        className="w-full bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        Switch to Sepolia
                    </button>

                    <button
                        onClick={() => disconnect()}
                        className="mt-4 text-sm text-galleon-ink/50 hover:text-galleon-ink"
                    >
                        Disconnect Wallet
                    </button>
                </div>
            </div>
        );
    }

    // Connected and on correct chain - render children with header
    return (
        <div className="min-h-screen bg-galleon-cream">
            {/* Investor Header */}
            <header className="bg-white border-b border-galleon-ink/5 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="font-bold text-lg">
                            GALLEON
                        </a>
                        <span className="text-galleon-ink/30">|</span>
                        <span className="text-sm font-medium text-galleon-orange">
                            Investor Dashboard
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-xs text-galleon-ink/50 font-mono">
                                USDC Balance
                            </div>
                            <div className="font-mono font-bold">
                                {usdcBalance
                                    ? (Number(usdcBalance) / 1e6).toLocaleString()
                                    : "0.00"}
                            </div>
                        </div>
                        <div className="w-px h-8 bg-galleon-ink/10" />
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span className="text-xs font-mono text-galleon-ink/60">
                                {address?.slice(0, 6)}...{address?.slice(-4)}
                            </span>
                        </div>
                        <button
                            onClick={() => disconnect()}
                            className="text-sm text-galleon-ink/50 hover:text-galleon-ink"
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
