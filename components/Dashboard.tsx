"use client";

import React, { useState } from 'react';
import { Icons } from './Icons';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'investor' | 'builder'>('investor');

  return (
    <div className="w-full bg-galleon-sand rounded-xl shadow-lg border border-galleon-ink/5 overflow-hidden">
      {/* Header / Tab Switcher */}
      <div className="flex border-b border-galleon-ink/10">
        <button
          onClick={() => setActiveTab('investor')}
          className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'investor' ? 'bg-galleon-sand text-galleon-orange' : 'bg-galleon-cream text-galleon-ink/50 hover:text-galleon-ink'}`}
        >
          INVESTOR VIEW
        </button>
        <button
          onClick={() => setActiveTab('builder')}
          className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors ${activeTab === 'builder' ? 'bg-galleon-sand text-galleon-orange' : 'bg-galleon-cream text-galleon-ink/50 hover:text-galleon-ink'}`}
        >
          BUILDER VIEW
        </button>
      </div>

      {/* Dashboard Body */}
      <div className="p-6 md:p-8 h-[400px] flex flex-col">
        {activeTab === 'investor' ? (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-galleon-ink/60 uppercase">Total Escrowed</span>
                <div className="text-4xl font-mono font-bold text-galleon-ink mt-2">
                  $250,000.00 <span className="text-base text-galleon-ink/60">USDCx</span>
                </div>
              </div>
              <div className="bg-galleon-orange/10 text-galleon-orange px-3 py-1 rounded text-xs font-mono font-bold border border-galleon-orange/20">
                LIVE MAINNET
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-galleon-cream p-4 rounded-lg border border-galleon-ink/5">
                <span className="text-xs font-mono text-galleon-ink/60">LOCKED</span>
                <div className="text-xl font-mono font-bold text-galleon-ink mt-1">$150,000.00</div>
                <div className="w-full bg-galleon-sand h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-galleon-ink h-full w-[60%]"></div>
                </div>
              </div>
              <div className="bg-galleon-cream p-4 rounded-lg border border-galleon-ink/5">
                <span className="text-xs font-mono text-galleon-ink/60">RELEASED</span>
                <div className="text-xl font-mono font-bold text-galleon-orange mt-1">$100,000.00</div>
                <div className="w-full bg-galleon-sand h-1 mt-3 rounded-full overflow-hidden">
                  <div className="bg-galleon-orange h-full w-[40%]"></div>
                </div>
              </div>
            </div>

            <div className="mt-auto">
              <h4 className="text-sm font-bold text-galleon-ink mb-3">Recent Activity</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs border-b border-galleon-ink/5 pb-2">
                  <span className="font-mono text-galleon-ink/70">0x7f...a92</span>
                  <span className="text-galleon-ink">Milestone 2 Verified</span>
                  <span className="font-mono text-galleon-orange">- $50,000.00</span>
                </div>
                <div className="flex justify-between items-center text-xs border-b border-galleon-ink/5 pb-2">
                  <span className="font-mono text-galleon-ink/70">0x3c...b11</span>
                  <span className="text-galleon-ink">Grant Deposited</span>
                  <span className="font-mono text-galleon-ink">+ $250,000.00</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="text-xs font-mono text-galleon-ink/60 uppercase">Available to Claim</span>
                <div className="text-4xl font-mono font-bold text-galleon-orange mt-2">
                  $50,000.00 <span className="text-base text-galleon-ink/60">USDCx</span>
                </div>
              </div>
              <button className="bg-galleon-orange text-galleon-ink px-4 py-2 rounded text-sm font-bold shadow-sm hover:shadow active:scale-95 transition-all">
                Claim Funds
              </button>
            </div>

            <h4 className="text-sm font-bold text-galleon-ink mb-4">Grant Milestones</h4>

            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
              <div className="bg-galleon-cream p-4 rounded-lg border border-galleon-ink/5 flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-galleon-ink text-galleon-cream flex items-center justify-center">
                    <Icons.CheckCircle size={12} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-galleon-ink line-through">Project Inception</div>
                    <div className="text-xs font-mono text-galleon-ink/60">Released: Oct 12</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-galleon-ink/50">$50,000</span>
              </div>

              <div className="bg-galleon-cream p-4 rounded-lg border border-galleon-orange flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-galleon-orange text-galleon-ink flex items-center justify-center animate-pulse">
                    <div className="w-2 h-2 bg-galleon-ink rounded-full"></div>
                  </div>
                  <div>
                    <div className="text-sm font-bold text-galleon-ink">MVP Testnet Launch</div>
                    <div className="text-xs font-mono text-galleon-orange">Ready for Submission</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-galleon-ink">$50,000</span>
              </div>

              <div className="bg-galleon-cream p-4 rounded-lg border border-galleon-ink/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border border-galleon-ink/30 text-galleon-ink flex items-center justify-center">
                    <Icons.Lock size={12} className="text-galleon-ink/30" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-galleon-ink/70">Mainnet Audit</div>
                    <div className="text-xs font-mono text-galleon-ink/40">Locked</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-galleon-ink/70">$150,000</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};