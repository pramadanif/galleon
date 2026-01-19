import React from "react";

interface CodeBlockProps {
    title: string;
    code: string[];
    className?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
    title,
    code,
    className = "",
}) => {
    return (
        <div
            className={`bg-galleon-ink text-galleon-cream p-6 rounded-xl font-mono text-sm overflow-hidden relative ${className}`}
        >
            <div className="absolute top-0 right-0 w-32 h-32 bg-galleon-orange/5 blur-3xl rounded-full" />
            <div className="relative z-10">
                <div className="text-galleon-orange/60 text-xs mb-4">;; {title}</div>
                <div className="space-y-1">
                    {code.map((line, i) => (
                        <div key={i} className="text-galleon-cream/80">
                            <span className="text-purple-400">{line}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
