"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits } from "viem";
import { Icons } from "@/components/Icons";
import { useEthereumWallet } from "@/lib/hooks/useEthereumWallet";
import { useBridgeStatus } from "@/lib/hooks/useBridgeStatus";
import { CONTRACTS, ERC20_ABI, X_RESERVE_ABI } from "@/lib/config/contracts";
import { prepareDepositToRemoteArgs } from "@/lib/ethereum/xreserve";
import { isValidStacksAddress } from "@/lib/bridge/encoder";
import { formatUsdc, parseUsdc, validateUsdcAmount } from "@/lib/ethereum/usdc";
import { BRIDGE_CONFIG } from "@/lib/config/contracts";

type Step = "form" | "approve" | "deposit" | "bridge" | "complete";

export default function CreateEscrowPage() {
    const router = useRouter();
    const { address: investorAddress } = useAccount();
    const { usdcBalance } = useEthereumWallet();

    // Form state
    const [builderAddress, setBuilderAddress] = useState("");
    const [amount, setAmount] = useState("");
    const [milestones, setMilestones] = useState([{ percentage: 100, description: "Full completion" }]);
    const [step, setStep] = useState<Step>("form");
    const [error, setError] = useState<string | null>(null);

    // Bridge tracking
    const bridgeStatus = useBridgeStatus(builderAddress);

    // Contract writes
    const { writeContract: approveUsdc, data: approveHash, isPending: isApproving } = useWriteContract();
    const { writeContract: depositToRemote, data: depositHash, isPending: isDepositing } = useWriteContract();

    // Wait for transactions
    const { isSuccess: approveSuccess } = useWaitForTransactionReceipt({ hash: approveHash });
    const { isSuccess: depositSuccess } = useWaitForTransactionReceipt({ hash: depositHash });

    // Validate form
    const validateForm = (): boolean => {
        setError(null);

        if (!builderAddress) {
            setError("Builder address is required");
            return false;
        }

        if (!isValidStacksAddress(builderAddress)) {
            setError("Invalid Stacks address format");
            return false;
        }

        if (!amount || parseFloat(amount) <= 0) {
            setError("Amount must be greater than 0");
            return false;
        }

        try {
            const parsedAmount = parseUsdc(amount);
            const validation = validateUsdcAmount(
                parsedAmount,
                usdcBalance || BigInt(0),
                BigInt(BRIDGE_CONFIG.minDepositTestnet)
            );

            if (!validation.valid) {
                setError(validation.error || "Invalid amount");
                return false;
            }
        } catch {
            setError("Invalid amount format");
            return false;
        }

        const totalPercentage = milestones.reduce((acc, m) => acc + m.percentage, 0);
        if (totalPercentage !== 100) {
            setError("Milestone percentages must total 100%");
            return false;
        }

        return true;
    };

    // Handle approve
    const handleApprove = async () => {
        if (!validateForm()) return;

        setStep("approve");
        bridgeStatus.setApproving();

        try {
            const parsedAmount = parseUsdc(amount);

            approveUsdc({
                address: CONTRACTS.ethereum.usdc,
                abi: ERC20_ABI,
                functionName: "approve",
                args: [CONTRACTS.ethereum.xReserve, parsedAmount],
            });
        } catch (err) {
            setError("Failed to approve USDC");
            setStep("form");
        }
    };

    // Handle deposit after approval
    const handleDeposit = async () => {
        if (!approveSuccess) return;

        setStep("deposit");
        bridgeStatus.setDepositing();

        try {
            const parsedAmount = parseUsdc(amount);
            const args = prepareDepositToRemoteArgs({
                value: parsedAmount,
                stacksRecipient: builderAddress,
            });

            depositToRemote({
                address: CONTRACTS.ethereum.xReserve,
                abi: X_RESERVE_ABI,
                functionName: "depositToRemote",
                args,
            });
        } catch (err) {
            setError("Failed to deposit USDC");
            setStep("form");
        }
    };

    // Start bridge tracking after deposit
    if (depositSuccess && step === "deposit" && depositHash) {
        setStep("bridge");
        bridgeStatus.startTracking(depositHash, parseUsdc(amount));
    }

    // Complete when bridge is done
    if (bridgeStatus.status === "completed" && step === "bridge") {
        setStep("complete");
    }

    // Add milestone
    const addMilestone = () => {
        if (milestones.length < 10) {
            setMilestones([...milestones, { percentage: 0, description: "" }]);
        }
    };

    // Remove milestone
    const removeMilestone = (index: number) => {
        if (milestones.length > 1) {
            setMilestones(milestones.filter((_, i) => i !== index));
        }
    };

    // Update milestone
    const updateMilestone = (index: number, field: "percentage" | "description", value: string | number) => {
        const updated = [...milestones];
        updated[index] = { ...updated[index], [field]: value };
        setMilestones(updated);
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={() => router.push("/investor")}
                    className="text-sm text-galleon-ink/50 hover:text-galleon-ink flex items-center gap-1 mb-4"
                >
                    <Icons.ArrowLeft size={16} />
                    Back to Dashboard
                </button>
                <h1 className="text-3xl font-bold tracking-tight mb-2">
                    Create Escrow
                </h1>
                <p className="text-galleon-ink/60">
                    Fund a Bitcoin builder with milestone-based releases
                </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-8">
                {["form", "approve", "deposit", "bridge", "complete"].map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step === s
                                    ? "bg-galleon-orange text-galleon-ink"
                                    : i < ["form", "approve", "deposit", "bridge", "complete"].indexOf(step)
                                        ? "bg-green-500 text-white"
                                        : "bg-galleon-sand text-galleon-ink/50"
                                }`}
                        >
                            {i < ["form", "approve", "deposit", "bridge", "complete"].indexOf(step) ? (
                                <Icons.CheckCircle size={16} />
                            ) : (
                                i + 1
                            )}
                        </div>
                        {i < 4 && (
                            <div className={`w-8 h-0.5 ${i < ["form", "approve", "deposit", "bridge", "complete"].indexOf(step)
                                    ? "bg-green-500"
                                    : "bg-galleon-sand"
                                }`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Error display */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center gap-2">
                    <Icons.AlertTriangle size={18} />
                    {error}
                </div>
            )}

            {/* Form Step */}
            {step === "form" && (
                <div className="bg-white rounded-2xl border border-galleon-ink/5 p-8">
                    <div className="space-y-6">
                        {/* Builder Address */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Builder Stacks Address
                            </label>
                            <input
                                type="text"
                                value={builderAddress}
                                onChange={(e) => setBuilderAddress(e.target.value)}
                                placeholder="ST1..."
                                className="w-full px-4 py-3 border border-galleon-ink/10 rounded-lg focus:outline-none focus:border-galleon-orange"
                            />
                            <p className="text-xs text-galleon-ink/50 mt-1">
                                The Stacks address that will receive the escrowed funds
                            </p>
                        </div>

                        {/* Amount */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                USDC Amount
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="100.00"
                                    className="w-full px-4 py-3 pr-20 border border-galleon-ink/10 rounded-lg focus:outline-none focus:border-galleon-orange"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-galleon-ink/50 font-mono">
                                    USDC
                                </span>
                            </div>
                            <p className="text-xs text-galleon-ink/50 mt-1">
                                Balance: {usdcBalance ? formatUsdc(usdcBalance) : "0.00"} USDC
                            </p>
                        </div>

                        {/* Milestones */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Milestones
                            </label>
                            <div className="space-y-3">
                                {milestones.map((m, i) => (
                                    <div key={i} className="flex gap-3">
                                        <input
                                            type="number"
                                            value={m.percentage}
                                            onChange={(e) => updateMilestone(i, "percentage", parseInt(e.target.value) || 0)}
                                            placeholder="%"
                                            min="0"
                                            max="100"
                                            className="w-20 px-3 py-2 border border-galleon-ink/10 rounded-lg focus:outline-none focus:border-galleon-orange text-center"
                                        />
                                        <input
                                            type="text"
                                            value={m.description}
                                            onChange={(e) => updateMilestone(i, "description", e.target.value)}
                                            placeholder="Milestone description"
                                            className="flex-1 px-3 py-2 border border-galleon-ink/10 rounded-lg focus:outline-none focus:border-galleon-orange"
                                        />
                                        {milestones.length > 1 && (
                                            <button
                                                onClick={() => removeMilestone(i)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                                            >
                                                <Icons.X size={18} />
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <button
                                onClick={addMilestone}
                                className="mt-3 text-sm text-galleon-orange flex items-center gap-1 hover:underline"
                            >
                                <Icons.Plus size={16} />
                                Add Milestone
                            </button>
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleApprove}
                            disabled={isApproving}
                            className="w-full bg-galleon-orange text-galleon-ink font-semibold py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isApproving ? "Approving..." : "Approve & Bridge USDC"}
                        </button>
                    </div>
                </div>
            )}

            {/* Approve/Deposit/Bridge Steps */}
            {step !== "form" && step !== "complete" && (
                <div className="bg-white rounded-2xl border border-galleon-ink/5 p-8 text-center">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${bridgeStatus.color === "orange" ? "bg-orange-100" :
                            bridgeStatus.color === "green" ? "bg-green-100" :
                                bridgeStatus.color === "red" ? "bg-red-100" : "bg-galleon-sand"
                        }`}>
                        {step === "bridge" ? (
                            <Icons.Layers className="text-galleon-orange animate-pulse" size={28} />
                        ) : (
                            <Icons.Wallet className="text-galleon-orange" size={28} />
                        )}
                    </div>

                    <h2 className="text-xl font-bold mb-2">{bridgeStatus.label}</h2>
                    <p className="text-galleon-ink/60 mb-6">{bridgeStatus.description}</p>

                    {bridgeStatus.timeRemaining && (
                        <p className="text-sm text-galleon-ink/50 font-mono mb-6">
                            {bridgeStatus.timeRemaining}
                        </p>
                    )}

                    {approveSuccess && step === "approve" && (
                        <button
                            onClick={handleDeposit}
                            disabled={isDepositing}
                            className="bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                        >
                            {isDepositing ? "Depositing..." : "Continue to Deposit"}
                        </button>
                    )}
                </div>
            )}

            {/* Complete Step */}
            {step === "complete" && (
                <div className="bg-white rounded-2xl border border-galleon-ink/5 p-8 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Icons.CheckCircle className="text-green-500" size={28} />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Escrow Created!</h2>
                    <p className="text-galleon-ink/60 mb-6">
                        Your USDC has been bridged and locked in the escrow contract.
                    </p>
                    <button
                        onClick={() => router.push("/investor")}
                        className="bg-galleon-orange text-galleon-ink font-semibold py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
                    >
                        View Dashboard
                    </button>
                </div>
            )}
        </div>
    );
}
