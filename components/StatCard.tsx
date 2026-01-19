import React from "react";

interface StatCardProps {
    label: string;
    value: string;
    subtext?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, subtext }) => {
    return (
        <div className="bg-galleon-sand/30 border border-galleon-ink/5 rounded-xl p-6 text-center">
            <div className="text-xs font-mono text-galleon-ink/50 uppercase tracking-wider mb-2">
                {label}
            </div>
            <div className="text-3xl md:text-4xl font-bold text-galleon-ink font-mono">
                {value}
            </div>
            {subtext && (
                <div className="text-xs text-galleon-ink/40 mt-2">{subtext}</div>
            )}
        </div>
    );
};
