import { openContractCall } from "@stacks/connect";
import {
    Cl,
    Pc,
    cvToJSON,
    fetchCallReadOnlyFunction,
    PostConditionMode,
} from "@stacks/transactions";
import { CONTRACTS } from "../config/contracts";
import { STACKS_NETWORK, STACKS_API_URL, userSession } from "./connect";
import type { Escrow, Milestone } from "../types/escrow";

const ESCROW_CONTRACT = CONTRACTS.stacks.escrow;

/**
 * Create a new escrow on the GALLEON contract
 * Opens wallet popup for user to sign
 * @param builder - Builder's Stacks address
 * @param amount - Amount in micro USDCx
 * @param milestoneAmounts - Array of milestone amounts
 */
export async function createEscrow(
    builder: string,
    amount: bigint,
    milestoneAmounts: bigint[]
): Promise<void> {
    const userData = userSession.loadUserData();
    const senderAddress = userData.profile?.stxAddress?.testnet;

    if (!senderAddress) {
        throw new Error("Stacks wallet not connected");
    }

    // Build milestone list (Clarity list of uints)
    const milestonesClarity = Cl.list(milestoneAmounts.map((m) => Cl.uint(m)));

    // Post condition: sender will send exactly `amount` USDCx
    const postCondition = Pc.principal(senderAddress)
        .willSendEq(amount)
        .ft(
            `${CONTRACTS.stacks.usdcx.address}.${CONTRACTS.stacks.usdcx.contractName}`,
            CONTRACTS.stacks.usdcx.tokenName
        );

    await openContractCall({
        contractAddress: ESCROW_CONTRACT.address,
        contractName: ESCROW_CONTRACT.contractName,
        functionName: "create-escrow",
        functionArgs: [
            Cl.principal(builder),
            Cl.uint(amount),
            milestonesClarity,
        ],
        network: STACKS_NETWORK,
        postConditions: [postCondition],
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
            console.log("Create escrow tx:", data.txId);
        },
        onCancel: () => {
            console.log("User cancelled transaction");
        },
    });
}

/**
 * Release a milestone (investor action)
 * Opens wallet popup for user to sign
 */
export async function releaseMilestone(
    escrowId: number,
    milestoneIndex: number
): Promise<void> {
    await openContractCall({
        contractAddress: ESCROW_CONTRACT.address,
        contractName: ESCROW_CONTRACT.contractName,
        functionName: "release-milestone",
        functionArgs: [Cl.uint(escrowId), Cl.uint(milestoneIndex)],
        network: STACKS_NETWORK,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
            console.log("Release milestone tx:", data.txId);
        },
        onCancel: () => {
            console.log("User cancelled transaction");
        },
    });
}

/**
 * Claim a released milestone (builder action)
 * Opens wallet popup for user to sign
 */
export async function claimMilestone(
    escrowId: number,
    milestoneIndex: number
): Promise<void> {
    const userData = userSession.loadUserData();
    const senderAddress = userData.profile?.stxAddress?.testnet;

    if (!senderAddress) {
        throw new Error("Stacks wallet not connected");
    }

    await openContractCall({
        contractAddress: ESCROW_CONTRACT.address,
        contractName: ESCROW_CONTRACT.contractName,
        functionName: "claim-milestone",
        functionArgs: [Cl.uint(escrowId), Cl.uint(milestoneIndex)],
        network: STACKS_NETWORK,
        postConditionMode: PostConditionMode.Deny,
        onFinish: (data) => {
            console.log("Claim milestone tx:", data.txId);
        },
        onCancel: () => {
            console.log("User cancelled transaction");
        },
    });
}

/**
 * Get escrow details from contract (read-only)
 */
export async function getEscrow(escrowId: number): Promise<Escrow | null> {
    try {
        const result = await fetchCallReadOnlyFunction({
            contractAddress: ESCROW_CONTRACT.address,
            contractName: ESCROW_CONTRACT.contractName,
            functionName: "get-escrow",
            functionArgs: [Cl.uint(escrowId)],
            network: STACKS_NETWORK,
            senderAddress: ESCROW_CONTRACT.address,
        });

        const json = cvToJSON(result);

        if (json.value === null) {
            return null;
        }

        // Parse the contract response into our Escrow type
        return parseEscrowResponse(escrowId, json);
    } catch (error) {
        console.error("Failed to fetch escrow:", error);
        return null;
    }
}

/**
 * Get all escrows for a builder
 */
export async function getEscrowsForBuilder(
    builderAddress: string
): Promise<Escrow[]> {
    // For demo, we'll implement basic fetching
    const escrows: Escrow[] = [];

    // Try fetching escrows 1-10 (demo limitation)
    for (let i = 1; i <= 10; i++) {
        const escrow = await getEscrow(i);
        if (escrow && escrow.builder === builderAddress) {
            escrows.push(escrow);
        }
    }

    return escrows;
}

// Helper to parse contract response
function parseEscrowResponse(escrowId: number, json: unknown): Escrow {
    const data = json as {
        value: {
            investor: { value: string };
            builder: { value: string };
            amount: { value: string };
            milestones: {
                value: Array<{
                    value: { amount: { value: string }; status: { value: string } };
                }>;
            };
            status: { value: string };
            "created-at": { value: string };
        };
    };

    const v = data.value;
    const milestones: Milestone[] = v.milestones.value.map((m, i) => ({
        id: i,
        amount: BigInt(m.value.amount.value),
        status: m.value.status.value as "locked" | "released" | "claimed",
    }));

    const lockedBalance = milestones
        .filter((m) => m.status === "locked")
        .reduce((acc, m) => acc + m.amount, BigInt(0));

    const releasedBalance = milestones
        .filter((m) => m.status === "released")
        .reduce((acc, m) => acc + m.amount, BigInt(0));

    const claimableBalance = releasedBalance;

    return {
        id: escrowId.toString(),
        investor: v.investor.value,
        builder: v.builder.value,
        totalAmount: BigInt(v.amount.value),
        milestones,
        createdAt: parseInt(v["created-at"].value),
        status: v.status.value as "active" | "completed" | "clawback",
        lockedBalance,
        releasedBalance,
        claimableBalance,
    };
}
