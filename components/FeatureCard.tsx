import React from "react";

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    highlight?: boolean;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    icon,
    title,
    description,
    highlight = false,
}) => {
    return (
        <div
            className={`p-6 rounded-xl border transition-all duration-300 ${highlight
                ? "bg-galleon-orange/10 border-galleon-orange/30 shadow-lg"
                : "bg-galleon-cream border-galleon-ink/5 hover:border-galleon-ink/10"
                }`}
        >
            <div
                className={`mb-4 p-3 rounded-lg inline-block ${highlight ? "bg-galleon-orange text-galleon-ink" : "bg-galleon-sand/50 text-galleon-ink"
                    }`}
            >
                {icon}
            </div>
            <h3 className="text-lg font-bold tracking-tight mb-2">{title}</h3>
            <p className="text-sm text-galleon-ink/70 leading-relaxed">{description}</p>
        </div>
    );
};
