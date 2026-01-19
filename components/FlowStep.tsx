import React from "react";

interface FlowStepProps {
    number: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    layer: "ethereum" | "bridge" | "stacks";
    isLast?: boolean;
}

export const FlowStep: React.FC<FlowStepProps> = ({
    number,
    title,
    description,
    icon,
    layer,
    isLast = false,
}) => {
    const layerStyles = {
        ethereum: {
            bg: "bg-galleon-cream",
            badge: "bg-galleon-ink/10 text-galleon-ink",
            icon: "bg-galleon-ink/5",
            label: "L1 ETHEREUM",
        },
        bridge: {
            bg: "bg-galleon-sand/30",
            badge: "bg-galleon-orange/20 text-galleon-orange",
            icon: "bg-galleon-orange/10",
            label: "BRIDGE LAYER",
        },
        stacks: {
            bg: "bg-galleon-cream border-l-4 border-l-galleon-orange",
            badge: "bg-galleon-orange text-galleon-ink",
            icon: "bg-galleon-sand/50",
            label: "L2 STACKS",
        },
    };

    const style = layerStyles[layer];

    return (
        <div className="relative">
            <div
                className={`${style.bg} p-6 rounded-xl border border-galleon-ink/5 flex flex-col md:flex-row gap-6 items-start`}
            >
                <div
                    className={`w-12 h-12 ${style.icon} rounded-xl flex items-center justify-center shrink-0`}
                >
                    {icon}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono font-bold text-galleon-ink/40">
                            {number}
                        </span>
                        <h3 className="font-bold text-lg">{title}</h3>
                    </div>
                    <p className="text-sm text-galleon-ink/60 leading-relaxed">
                        {description}
                    </p>
                </div>
                <div
                    className={`${style.badge} px-3 py-1 rounded text-xs font-mono font-bold shrink-0`}
                >
                    {style.label}
                </div>
            </div>
            {!isLast && (
                <div className="h-8 border-l-2 border-dashed border-galleon-ink/10 mx-auto w-0" />
            )}
        </div>
    );
};
