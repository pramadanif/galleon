import React from 'react';
import { Section } from './components/Section';
import { Button } from './components/Button';
import { Icons, EthIcon, StacksIcon } from './components/Icons';
import { ProblemCard } from './components/ProblemCard';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div className="min-h-screen bg-aegis-cream font-sans text-aegis-ink selection:bg-aegis-orange selection:text-aegis-ink">

      {/* 1. HERO SECTION */}
      <Section className="flex flex-col items-center justify-center min-h-[90vh] text-center pt-32 pb-20">
        <div className="mb-6 px-3 py-1 border border-aegis-ink/10 bg-aegis-sand/30 rounded-full inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-aegis-orange"></span>
          <span className="text-xs font-mono uppercase tracking-wide font-bold">Protocol V1 Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-[1.1]">
          Programmable <span className="text-aegis-orange">USDCx Escrow</span>
        </h1>

        <p className="text-xl md:text-2xl text-aegis-ink/70 max-w-2xl mx-auto mb-16 leading-relaxed">
          Bringing Ethereum capital to Bitcoin builders through deterministic execution.
        </p>

        {/* Architecture Diagram */}
        <div className="w-full max-w-3xl mb-16 px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 relative">

            {/* Mobile Line Connector */}
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-dashed border-l border-aegis-ink/20 -z-10 md:hidden"></div>
            {/* Desktop Line Connector */}
            <div className="hidden md:block absolute left-0 right-0 top-1/2 h-0.5 border-t border-dashed border-aegis-ink/20 -z-10"></div>

            <div className="flex flex-col items-center bg-aegis-cream p-4 z-10">
              <div className="w-16 h-16 rounded-2xl bg-aegis-sand flex items-center justify-center mb-3 shadow-sm border border-aegis-ink/5">
                <EthIcon />
              </div>
              <span className="font-mono text-sm font-bold">Ethereum</span>
              <span className="text-xs text-aegis-ink/50 mt-1">USDC Deposit</span>
            </div>

            <Icons.ArrowRight className="text-aegis-ink/40 rotate-90 md:rotate-0 bg-aegis-cream z-10 p-1 rounded-full" />

            <div className="flex flex-col items-center bg-aegis-cream p-4 z-10">
              <div className="w-16 h-16 rounded-2xl bg-aegis-sand flex items-center justify-center mb-3 shadow-sm border border-aegis-ink/5">
                <StacksIcon />
              </div>
              <span className="font-mono text-sm font-bold">Stacks</span>
              <span className="text-xs text-aegis-ink/50 mt-1">Mint USDCx</span>
            </div>

            <Icons.ArrowRight className="text-aegis-ink/40 rotate-90 md:rotate-0 bg-aegis-cream z-10 p-1 rounded-full" />

            <div className="flex flex-col items-center bg-aegis-cream p-4 z-10">
              <div className="w-16 h-16 rounded-2xl bg-aegis-ink text-aegis-cream flex items-center justify-center mb-3 shadow-sm">
                <Icons.Lock size={24} />
              </div>
              <span className="font-mono text-sm font-bold">Escrow</span>
              <span className="text-xs text-aegis-ink/50 mt-1">Clarity Contract</span>
            </div>

            <Icons.ArrowRight className="text-aegis-ink/40 rotate-90 md:rotate-0 bg-aegis-cream z-10 p-1 rounded-full" />

            <div className="flex flex-col items-center bg-aegis-cream p-4 z-10">
              <div className="w-16 h-16 rounded-2xl bg-aegis-orange text-aegis-ink flex items-center justify-center mb-3 shadow-sm">
                <Icons.Code size={24} />
              </div>
              <span className="font-mono text-sm font-bold">Builder</span>
              <span className="text-xs text-aegis-ink/50 mt-1">Milestone Unlock</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button icon={<Icons.ArrowRight size={16} />}>Start Escrow</Button>
          <a href="#" className="flex items-center justify-center px-6 py-3 text-sm font-semibold text-aegis-ink/60 hover:text-aegis-ink transition-colors">
            Read Documentation
          </a>
        </div>
      </Section>

      {/* 2. PROBLEM SECTION */}
      <Section className="bg-aegis-cream" id="problem">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center tracking-tight">
            Why Funding Bitcoin L2 Builders Is <span className="border-b-4 border-aegis-orange/30">Broken</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProblemCard
              icon={<Icons.ShieldAlert size={24} />}
              title="Risky Manual Bridging"
              description="Investors fear complex bridges. Manual wrapping introduces human error and custody risk."
            />
            <ProblemCard
              icon={<Icons.TrendingUp size={24} />}
              title="Volatility Exposure"
              description="Grants in BTC or STX fluctuate wildly. Builders need stablecoin predictability for payroll."
            />
            <ProblemCard
              icon={<Icons.Link size={24} />}
              title="No On-Chain Trust"
              description="Ethereum investors have no visibility or enforcement on Bitcoin layers. Blind trust is required."
            />
          </div>
        </div>
      </Section>

      {/* 3. SOLUTION SECTION */}
      <Section className="bg-aegis-sand/30 border-y border-aegis-ink/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Aegis Solves This With <span className="text-aegis-orange">Programmable Escrow</span>
            </h2>
            <p className="text-lg text-aegis-ink/70 max-w-2xl mx-auto">
              A trustless tunnel for stable capital, enforced by Bitcoin finality.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4 relative">
            {/* Connector Line Desktop */}
            <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-[80%] h-0.5 bg-aegis-ink/10 -z-10"></div>

            {[
              { id: 1, title: "Deposit USDC", desc: "Investor deposits USDC into Aegis Vault on Ethereum Mainnet." },
              { id: 2, title: "Bridge & Mint", desc: "Circle xReserve protocol mints 1:1 USDCx on Stacks L2." },
              { id: 3, title: "Smart Lock", desc: "USDCx enters a Clarity contract governed by pre-set milestones." },
              { id: 4, title: "Milestone Release", desc: "Builder submits proof. Oracle verifies. Funds unlock automatically." },
            ].map((step) => (
              <div key={step.id} className="bg-aegis-cream p-6 rounded-lg border border-aegis-ink/5 relative group hover:-translate-y-1 transition-transform duration-300">
                <div className="w-8 h-8 bg-aegis-ink text-aegis-cream font-mono font-bold flex items-center justify-center rounded mb-4 text-sm z-10 relative">
                  0{step.id}
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-aegis-ink/70 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 4. WHY STACKS */}
      <Section>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-block px-3 py-1 mb-6 border border-aegis-ink/20 rounded font-mono text-xs uppercase font-bold tracking-widest text-aegis-ink/60">
              Technical Architecture
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-6">
              Why This Works Only On <br className="hidden md:block" /> Stacks
            </h2>
            <p className="text-lg text-aegis-ink/70 mb-8 leading-relaxed">
              Aegis leverages Stacks' unique property as a Bitcoin Layer 2 with read-access to Bitcoin state, enabling truly decentralized financial logic settled on the world's most secure chain.
            </p>

            <ul className="space-y-6">
              {[
                { label: "Bitcoin Security", text: "All transactions settle on Bitcoin." },
                { label: "Clarity Contracts", text: "Decidable language prevents reentrancy bugs." },
                { label: "Deterministic Execution", text: "Predictable gas and precise logic." },
                { label: "USDCx Native", text: "Official programmable stablecoin standard." }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 min-w-[6px] h-[6px] bg-aegis-orange rounded-full"></div>
                  <div>
                    <span className="font-bold block mb-1">{item.label}</span>
                    <span className="text-sm text-aegis-ink/70">{item.text}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-aegis-ink text-aegis-cream p-8 rounded-xl font-mono text-sm leading-relaxed overflow-hidden relative shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Icons.Code size={48} />
            </div>
            <div className="opacity-80">
              <p className="text-aegis-orange mb-4">;; Aegis Escrow Logic (Clarity)</p>
              <p className="mb-2"><span className="text-purple-300">(define-public</span> (release-milestone)</p>
              <p className="pl-4 mb-2"><span className="text-purple-300">(begin</span></p>
              <p className="pl-8 mb-2"><span className="text-purple-300">(asserts!</span> (is-eq (var-get status) "LOCKED") (err u101))</p>
              <p className="pl-8 mb-2"><span className="text-purple-300">(asserts!</span> (is-valid-proof tx-sender) (err u102))</p>
              <p className="pl-8 mb-2"><span className="text-aegis-sand">;; Unlock USDCx to builder</span></p>
              <p className="pl-8 mb-2"><span className="text-purple-300">(try!</span> (ft-transfer? usdcx amount (as-contract tx-sender) builder))</p>
              <p className="pl-4 mb-2"><span className="text-purple-300">(ok true)</span></p>
              <p className="mb-2"><span className="text-purple-300">)</span></p>
              <p><span className="text-purple-300">)</span></p>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. PRODUCT UI PREVIEW */}
      <Section className="bg-aegis-sand/20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">One Protocol, Two Views</h2>
          <p className="text-aegis-ink/60">Transparency for the investor. Clarity for the builder.</p>
        </div>
        <div className="max-w-4xl mx-auto">
          <Dashboard />
        </div>
      </Section>

      {/* 6. USE CASES */}
      <Section>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4">Built for Capital at Scale</h2>
            <p className="text-lg text-aegis-ink/70">Infrastructure robust enough for foundations, flexible enough for hackathons.</p>
          </div>
          <Button variant="secondary" icon={<Icons.ArrowRight size={16} />}>Read Whitepaper</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Icons.Trophy />, title: "Grants & Foundations", text: "Disburse large ecosystem funds with automated milestones." },
            { icon: <Icons.Users />, title: "DAO Funding", text: "Community-governed treasuries deploying capital to sub-DAOs." },
            { icon: <Icons.Code />, title: "Builder Bounties", text: "Trustless rewards for code contributions and bug fixes." },
            { icon: <Icons.Briefcase />, title: "Payroll & Freelance", text: "Stream payroll in stablecoins based on deliverable tracking." },
          ].map((card, i) => (
            <div key={i} className="bg-aegis-sand/40 p-6 rounded-lg hover:bg-aegis-sand transition-colors duration-300 border border-transparent hover:border-aegis-ink/5">
              <div className="mb-4 text-aegis-ink">{card.icon}</div>
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-sm text-aegis-ink/70 leading-relaxed">{card.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. TRUST & SECURITY */}
      <Section className="bg-aegis-ink text-aegis-cream py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">Security by Design</h2>
            <div className="space-y-6">
              {[
                "Non-custodial escrow architecture",
                "Fully on-chain enforcement logic",
                "Audited Clarity smart contracts",
                "Powered by Circle xReserve Bridge"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-aegis-orange flex items-center justify-center shrink-0">
                    <Icons.CheckCircle size={14} className="text-aegis-ink" />
                  </div>
                  <span className="font-mono text-lg">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-full min-h-[300px] flex items-center justify-center border-l border-aegis-cream/10 pl-12">
            <div className="text-center opacity-40">
              <Icons.ShieldAlert size={120} strokeWidth={1} />
              <div className="font-mono mt-4 text-sm">AUDITED BY<br />SENTINEL SECURITY</div>
            </div>
          </div>
        </div>
      </Section>

      {/* 8. FINAL CTA */}
      <Section className="text-center py-32">
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-tight">
          Bring Ethereum Capital to <br /> <span className="text-aegis-orange">Bitcoin Builders</span>
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <Button className="w-full sm:w-auto h-14 px-8 text-base" icon={<Icons.Play size={16} />}>Launch Demo</Button>
          <Button variant="outline" className="w-full sm:w-auto h-14 px-8 text-base" icon={<Icons.Github size={16} />}>View GitHub</Button>
        </div>

        <div className="mt-20 border-t border-aegis-ink/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-aegis-ink/40 w-full">
          <p>© 2024 Aegis Protocol. Open Source.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-aegis-ink">Documentation</a>
            <a href="#" className="hover:text-aegis-ink">Governance</a>
            <a href="#" className="hover:text-aegis-ink">Security</a>
          </div>
        </div>
      </Section>

    </div>
  );
}

export default App;