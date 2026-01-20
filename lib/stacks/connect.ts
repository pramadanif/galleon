import { AppConfig, UserSession, showConnect } from "@stacks/connect";

// Stacks app configuration
const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

// Stacks testnet network configuration
// Using 'testnet' string which @stacks/transactions understands
export const STACKS_NETWORK = "testnet" as const;
export const STACKS_API_URL = "https://api.testnet.hiro.so";

// App details for wallet connection popup
export const appDetails = {
    name: "GALLEON",
    icon: typeof window !== "undefined" ? `${window.location.origin}/galleon.png` : "/galleon.png",
};

// Connect to Stacks wallet (Leather/Xverse)
export function connectStacksWallet(onFinish?: () => void): void {
    showConnect({
        appDetails,
        onFinish: () => {
            if (onFinish) onFinish();
            // Reload to update wallet state
            if (typeof window !== "undefined") {
                window.location.reload();
            }
        },
        onCancel: () => {
            console.log("User cancelled Stacks wallet connection");
        },
        userSession,
    });
}

// Disconnect Stacks wallet
export function disconnectStacksWallet(): void {
    userSession.signUserOut();
    if (typeof window !== "undefined") {
        window.location.reload();
    }
}

// Check if user is signed in
export function isStacksWalletConnected(): boolean {
    return userSession.isUserSignedIn();
}

// Get user's Stacks address
export function getStacksAddress(): string | null {
    if (!userSession.isUserSignedIn()) return null;
    const userData = userSession.loadUserData();
    // Use testnet address
    return userData.profile?.stxAddress?.testnet || null;
}

// Get user data
export function getStacksUserData() {
    if (!userSession.isUserSignedIn()) return null;
    return userSession.loadUserData();
}
