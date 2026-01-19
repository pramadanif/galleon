import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Icons, EthIcon, StacksIcon, BridgeIcon } from "@/components/Icons";
import { ProblemCard } from "@/components/ProblemCard";
import { FlowStep } from "@/components/FlowStep";
import { CodeBlock } from "@/components/CodeBlock";
import { FeatureCard } from "@/components/FeatureCard";

export default function Home() {
    return (
        <div className="min-h-screen bg-galleon-cream font-sans text-galleon-ink selection:bg-galleon-orange selection:text-galleon-ink">
            <Navbar />

            {/* ========================================
          1. HERO SECTION
      ======================================== */}
            <Section className="pt-32 pb-20 min-h-screen flex flex-col justify-center">
                <div className="text-center max-w-5xl mx-auto">
                    {/* Protocol Badge */}
                    <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-galleon-sand/50 border border-galleon-ink/10 rounded-full">
                        <span className="w-2 h-2 rounded-full bg-galleon-orange animate-pulse" />
                        <span className="text-xs font-mono font-bold uppercase tracking-wider">
                            Bitcoin Olympics Hackathon
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.95]">
                        GALLEON
                    </h1>

                    {/* Subheadline */}
                    <h2 className="text-xl md:text-2xl font-medium text-galleon-ink/80 mb-4 max-w-3xl mx-auto leading-relaxed">
                        Programmable <span className="text-galleon-orange font-bold">USDCx Escrow</span> Bringing Ethereum Capital to Bitcoin Builders
                    </h2>

                    {/* Target Audience */}
                    <p className="text-base text-galleon-ink/50 font-mono mb-12">
                        For Ecosystem Funds, DAOs, and Institutional Grants
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                        <Button className="h-12 px-8 text-base" icon={<Icons.ArrowRight size={18} />}>
                            Fund Builders Trustlessly
                        </Button>
                        <Button variant="outline" className="h-12 px-8 text-base" icon={<Icons.Play size={18} />}>
                            View Demo Flow
                        </Button>
                    </div>

                    {/* Visual: Cross-chain Capital Flow */}
                    <div className="mt-12 p-8 bg-galleon-sand/30 rounded-2xl border border-galleon-ink/5 max-w-3xl mx-auto">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            {/* Ethereum */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-galleon-cream rounded-2xl border border-galleon-ink/10 flex items-center justify-center mb-3 shadow-sm">
                                    <EthIcon size={32} />
                                </div>
                                <span className="font-mono text-sm font-bold">Ethereum</span>
                                <span className="text-xs text-galleon-ink/50">USDC Pool</span>
                            </div>

                            {/* Arrow */}
                            <div className="flex flex-col items-center gap-1">
                                <Icons.ArrowRight className="text-galleon-orange rotate-90 md:rotate-0" size={24} />
                                <span className="text-xs font-mono text-galleon-ink/30">BRIDGE</span>
                            </div>

                            {/* Stacks */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-galleon-cream rounded-2xl border border-galleon-ink/10 flex items-center justify-center mb-3 shadow-sm">
                                    <StacksIcon size={32} />
                                </div>
                                <span className="font-mono text-sm font-bold">Stacks</span>
                                <span className="text-xs text-galleon-ink/50">USDCx Escrow</span>
                            </div>

                            {/* Arrow */}
                            <div className="flex flex-col items-center gap-1">
                                <Icons.ArrowRight className="text-galleon-orange rotate-90 md:rotate-0" size={24} />
                                <span className="text-xs font-mono text-galleon-ink/30">RELEASE</span>
                            </div>

                            {/* Builder */}
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-galleon-orange rounded-2xl flex items-center justify-center mb-3 shadow-sm">
                                    <Icons.Code className="text-galleon-ink" size={28} />
                                </div>
                                <span className="font-mono text-sm font-bold">Builder</span>
                                <span className="text-xs text-galleon-ink/50">Milestone Unlock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========================================
          2. THE PROBLEM (Ecosystem-Level Framing)
      ======================================== */}
            <Section className="bg-galleon-cream border-t border-galleon-ink/5" id="problem">
                <div className="max-w-5xl mx-auto">
                    {/* Section Header */}
                    <div className="mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                            The Bottleneck
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                            Ethereum Liquidity Does Not Flow Into Bitcoin.
                        </h2>
                        <p className="text-lg text-galleon-ink/70 leading-relaxed max-w-2xl">
                            Ethereum holds the capital—VCs, DAOs, and relentless stablecoin volume.
                            Real Bitcoin L2 innovation is happening on Stacks.
                            But the bridge between them is broken.
                        </p>
                    </div>

                    {/* Problem Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <ProblemCard
                            index={1}
                            icon={<Icons.ShieldAlert size={24} />}
                            title="Manual Bridging Friction"
                            description="Investors refuse to navigate complex, multi-step bridges. Liquidity remains trapped on Ethereum."
                        />
                        <ProblemCard
                            index={2}
                            icon={<Icons.Lock size={24} />}
                            title="No On-Chain Enforcement"
                            description="Grants are sent on trust. There is no programmable clawback if a builder disappears."
                        />
                        <ProblemCard
                            index={3}
                            icon={<Icons.TrendingUp size={24} />}
                            title="Volatility Risk"
                            description="Funding in BTC or STX exposes builders to market crashes. Payroll requires stablecoins."
                        />
                    </div>

                    {/* Outcome Statement */}
                    <div className="mt-12 p-6 bg-galleon-ink text-galleon-cream rounded-xl text-center">
                        <p className="font-mono text-lg">
                            Outcome: <span className="text-galleon-orange font-bold">Ethereum liquidity does not flow into Bitcoin builders.</span>
                        </p>
                    </div>
                </div>
            </Section>

            {/* ========================================
          3. THE SOLUTION: GALLEON
      ======================================== */}
            <Section className="bg-galleon-ink text-galleon-cream" id="solution">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Left: Copy */}
                        <div>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                                Protocol Infrastructure
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                                GALLEON
                            </h2>
                            <p className="text-xl text-galleon-cream/80 mb-8 leading-relaxed">
                                A trustless, programmable cross-chain escrow protocol.
                            </p>

                            <div className="space-y-5 text-galleon-cream/70">
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-galleon-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                    </div>
                                    <p>Investors deposit <span className="text-galleon-cream font-medium">USDC on Ethereum</span></p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-galleon-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                    </div>
                                    <p>USDC is bridged and minted as <span className="text-galleon-cream font-medium">USDCx on Stacks</span></p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-galleon-orange/20 flex items-center justify-center shrink-0 mt-0.5">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                    </div>
                                    <p>Funds are <span className="text-galleon-cream font-medium">locked in Clarity smart contracts</span></p>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-galleon-orange flex items-center justify-center shrink-0 mt-0.5">
                                        <Icons.CheckCircle size={14} className="text-galleon-ink" />
                                    </div>
                                    <p className="text-galleon-cream font-bold">Capital is released only when milestones are met</p>
                                </div>
                            </div>

                            {/* Key Quote */}
                            <blockquote className="mt-10 pl-6 border-l-4 border-galleon-orange">
                                <p className="text-2xl font-serif italic text-galleon-orange">
                                    &ldquo;USDCx is not just transferred. It is programmed.&rdquo;
                                </p>
                            </blockquote>
                        </div>

                        {/* Right: Code Preview */}
                        <div className="relative">
                            <div className="absolute -inset-4 bg-galleon-orange/10 blur-3xl rounded-full" />
                            <CodeBlock
                                title="GALLEON Clarity Contract"
                                code={[
                                    "(define-public (create-escrow",
                                    "    (investor principal)",
                                    "    (builder principal)",
                                    "    (amount uint)",
                                    "    (milestones (list 5 uint))))",
                                    "",
                                    "(define-public (release-milestone",
                                    "    (escrow-id uint)",
                                    "    (milestone-index uint)))",
                                    "",
                                    "(define-public (clawback",
                                    "    (escrow-id uint)))",
                                ]}
                                className="relative z-10 shadow-2xl"
                            />
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========================================
          4. HOW IT WORKS (Step-by-Step Flow)
      ======================================== */}
            <Section className="bg-galleon-sand/20" id="architecture">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                            Technical Flow
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Protocol Architecture
                        </h2>
                        <p className="text-galleon-ink/60 max-w-xl mx-auto">
                            A clean 3-layer system bridging Ethereum capital to Bitcoin builders.
                        </p>
                    </div>

                    <div className="space-y-0">
                        <FlowStep
                            number="01"
                            title="Investor Deposits USDC"
                            description="Investor connects MetaMask, defines builder address, amount, and milestone schedule. USDC enters the GALLEON Vault on Ethereum Mainnet."
                            icon={<EthIcon size={28} />}
                            layer="ethereum"
                        />
                        <FlowStep
                            number="02"
                            title="Circle xReserve Bridge"
                            description="Powered by Circle xReserve protocol + Stacks attestation. USDC is burned on Ethereum and minted 1:1 as USDCx on Stacks L2."
                            icon={<BridgeIcon size={28} />}
                            layer="bridge"
                        />
                        <FlowStep
                            number="03"
                            title="Clarity Escrow Holds Funds"
                            description="USDCx enters a Clarity smart contract. Funds are owned by the contract, not the builder. Milestone-based releases. Clawback if conditions fail."
                            icon={<StacksIcon size={28} />}
                            layer="stacks"
                            isLast
                        />
                    </div>
                </div>
            </Section>

            {/* ========================================
          5. CORE SMART CONTRACT CAPABILITIES
      ======================================== */}
            <Section className="bg-galleon-cream">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                            Clarity Contract
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Core Smart Contract Capabilities
                        </h2>
                        <p className="text-galleon-ink/60 max-w-xl mx-auto">
                            Enforcement is on-chain, not social. Funds are owned by the contract, not the builder.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                        {[
                            {
                                fn: "create-escrow",
                                desc: "Initializes vault with investor, builder, amount, and milestone schedule.",
                            },
                            {
                                fn: "release-milestone",
                                desc: "Unlocks a portion of funds upon verified proof submission.",
                            },
                            {
                                fn: "clawback",
                                desc: "Returns remaining funds to investor if milestones fail or timeout.",
                            },
                            {
                                fn: "dao-approve",
                                desc: "Optional multisig hook for DAO governance or committee voting.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="bg-galleon-sand/30 p-6 rounded-xl border border-galleon-ink/5 hover:border-galleon-orange/30 transition-colors group"
                            >
                                <div className="font-mono text-galleon-orange font-bold text-sm mb-3 group-hover:underline">
                                    ({item.fn})
                                </div>
                                <p className="text-sm text-galleon-ink/70 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ========================================
          6. USER EXPERIENCE FLOW
      ======================================== */}
            <Section className="border-y border-galleon-ink/5" id="demo">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                            Dual Interface
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            User Experience Flow
                        </h2>
                        <p className="text-galleon-ink/60 max-w-xl mx-auto font-mono">
                            &ldquo;All cross-chain complexity is abstracted away.&rdquo;
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                        {/* Investor Column */}
                        <div className="bg-galleon-cream p-8 rounded-2xl border border-galleon-ink/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-galleon-ink text-galleon-cream flex items-center justify-center">
                                    <EthIcon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Investor</h3>
                                    <span className="text-xs text-galleon-ink/50 font-mono">ETHEREUM</span>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { icon: <Icons.Wallet size={18} />, text: "Connect MetaMask" },
                                    { icon: <Icons.FileText size={18} />, text: "Define builder, amount, milestones" },
                                    { icon: <Icons.DollarSign size={18} />, text: "Deposit USDC" },
                                    { icon: <Icons.TrendingUp size={18} />, text: "Track escrowed, released, remaining USDCx" },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 p-4 bg-galleon-sand/30 rounded-lg border border-galleon-ink/5"
                                    >
                                        <span className="text-galleon-ink/40">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Builder Column */}
                        <div className="bg-galleon-cream p-8 rounded-2xl border border-galleon-orange/20 shadow-lg">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-galleon-orange text-galleon-ink flex items-center justify-center">
                                    <StacksIcon size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Builder</h3>
                                    <span className="text-xs text-galleon-ink/50 font-mono">STACKS</span>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {[
                                    { icon: <Icons.Wallet size={18} />, text: "Connect Leather or Xverse" },
                                    { icon: <Icons.Lock size={18} />, text: "View locked USDCx" },
                                    { icon: <Icons.CheckCircle size={18} />, text: "Submit milestones" },
                                    { icon: <Icons.Zap size={18} />, text: "Receive released funds instantly" },
                                ].map((item, i) => (
                                    <li
                                        key={i}
                                        className="flex items-center gap-4 p-4 bg-galleon-sand/30 rounded-lg border border-galleon-ink/5"
                                    >
                                        <span className="text-galleon-orange">{item.icon}</span>
                                        <span className="text-sm font-medium">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========================================
          7. DEMO SCOPE (Hackathon-Realistic)
      ======================================== */}
            <Section className="bg-galleon-sand/10">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-galleon-ink text-galleon-cream rounded-lg text-xs font-mono font-bold uppercase tracking-widest mb-6">
                            Live Demo Environment
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                            Production-Ready Architecture
                        </h2>
                        <p className="text-galleon-ink/60 max-w-xl mx-auto">
                            Judges: This is what we built. Honest + feasible, not hand-waving.
                        </p>
                    </div>

                    <div className="bg-galleon-cream p-8 rounded-2xl border border-galleon-ink/10 shadow-sm">
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-bold mb-4 text-galleon-orange flex items-center gap-2">
                                    <Icons.Code size={18} />
                                    Backend & Contracts
                                </h4>
                                <ul className="space-y-3 text-sm text-galleon-ink/70 font-mono">
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        Clarity Escrow Contract (Deployed on Testnet)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        USDCx Minting Oracle (Mocked for Demo)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        Stacks Node Connection
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-bold mb-4 text-galleon-orange flex items-center gap-2">
                                    <Icons.Layers size={18} />
                                    Frontend Interface
                                </h4>
                                <ul className="space-y-3 text-sm text-galleon-ink/70 font-mono">
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        Dual Dashboard (Investor / Builder)
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        Web3 Wallet Integration
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Icons.CheckCircle size={14} className="text-galleon-orange" />
                                        Real-time Escrow Tracking
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========================================
          8. WHY GALLEON WINS (Judge-Focused)
      ======================================== */}
            <Section className="bg-galleon-ink text-galleon-cream">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                            Competitive Edge
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Why GALLEON Wins
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            {
                                title: "Deep USDCx Programmability",
                                desc: "Not a simple bridge. We verify deliverables on L2 before releasing L1 capital.",
                            },
                            {
                                title: "Solves A Real Ecosystem Bottleneck",
                                desc: "Bitcoin builders are starving for stable capital. Ethereum has it. We connect them.",
                            },
                            {
                                title: "Uniquely Stacks",
                                desc: "Only Stacks can read Bitcoin state, allowing future expansion to BTC-based milestones.",
                            },
                            {
                                title: "Immediately Usable",
                                desc: "Ready today for Stacks Foundation, ICC, DAOs, bounties, and freelance payroll.",
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="p-6 border border-galleon-cream/10 rounded-xl hover:border-galleon-orange/30 transition-colors"
                            >
                                <h3 className="font-bold text-lg mb-3 text-galleon-orange">
                                    {item.title}
                                </h3>
                                <p className="text-galleon-cream/70 text-sm leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            {/* ========================================
          9. WHY THIS MATTERS FOR STACKS
      ======================================== */}
            <Section className="bg-galleon-cream">
                <div className="max-w-3xl mx-auto text-center">
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-galleon-orange mb-4 block">
                        Ecosystem Impact
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                        More Than An App. It&apos;s Infrastructure.
                    </h2>
                    <p className="text-lg text-galleon-ink/70 leading-relaxed mb-8">
                        GALLEON is a liquidity gateway. By making it safe for Ethereum capital to enter the ecosystem,
                        we permanently increase the GDP of Stacks. This is not a toy dApp—it&apos;s a long-term funding primitive.
                    </p>

                    <div className="grid grid-cols-3 gap-4 mt-12">
                        <div className="p-6 bg-galleon-sand/30 rounded-xl border border-galleon-ink/5">
                            <div className="text-2xl font-bold font-mono text-galleon-ink mb-1">$∞</div>
                            <div className="text-xs text-galleon-ink/50 font-mono">ETH Liquidity</div>
                        </div>
                        <div className="p-6 bg-galleon-sand/30 rounded-xl border border-galleon-ink/5">
                            <div className="text-2xl font-bold font-mono text-galleon-orange mb-1">→</div>
                            <div className="text-xs text-galleon-ink/50 font-mono">GALLEON</div>
                        </div>
                        <div className="p-6 bg-galleon-sand/30 rounded-xl border border-galleon-ink/5">
                            <div className="text-2xl font-bold font-mono text-galleon-ink mb-1">BTC</div>
                            <div className="text-xs text-galleon-ink/50 font-mono">Builders</div>
                        </div>
                    </div>
                </div>
            </Section>

            {/* ========================================
          10. FINAL CALL TO ACTION
      ======================================== */}
            <Section className="bg-galleon-sand/20 border-t border-galleon-ink/5 py-24 md:py-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 leading-tight">
                        GALLEON brings Ethereum capital into Bitcoin<br />
                        <span className="text-galleon-orange">safely, transparently, and programmatically.</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                        <Button className="h-14 px-10 text-lg" icon={<Icons.Play size={20} />}>
                            Explore the Demo
                        </Button>
                        <Button variant="outline" className="h-14 px-10 text-lg" icon={<Icons.FileText size={20} />}>
                            Read the Architecture
                        </Button>
                    </div>
                </div>
            </Section>

            {/* ========================================
          FOOTER
      ======================================== */}
            <footer className="bg-galleon-cream border-t border-galleon-ink/5 py-12">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <Image
                            src="/galleon.png"
                            alt="Galleon Logo"
                            width={32}
                            height={32}
                            className="rounded-md"
                        />
                        <span className="text-xs font-mono text-galleon-ink/40">
                            © 2024 GALLEON Protocol. Built for Bitcoin Olympics.
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-xs font-mono text-galleon-ink/40 hover:text-galleon-ink transition-colors">
                            Documentation
                        </a>
                        <a href="#" className="text-xs font-mono text-galleon-ink/40 hover:text-galleon-ink transition-colors">
                            GitHub
                        </a>
                        <a href="#" className="text-xs font-mono text-galleon-ink/40 hover:text-galleon-ink transition-colors">
                            Architecture
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
