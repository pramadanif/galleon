import { createConfig, http } from "wagmi";
import { sepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { RPC_URLS } from "../config/networks";

// wagmi configuration for Ethereum wallet integration
export const wagmiConfig = createConfig({
    chains: [sepolia],
    connectors: [
        injected({
            shimDisconnect: true,
        }),
    ],
    transports: {
        [sepolia.id]: http(RPC_URLS.ethereum),
    },
});

// Re-export chain for convenience
export { sepolia };
