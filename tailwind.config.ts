import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                galleon: {
                    cream: "#FAF3E1",
                    sand: "#F5E7C6",
                    orange: "#FF6D1F",
                    ink: "#222222",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "sans-serif"],
                mono: ["var(--font-jetbrains-mono)", "monospace"],
            },
            animation: {
                fadeIn: "fadeIn 0.3s ease-in-out",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: "0" },
                    to: { opacity: "1" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
