import React from "react";

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index?: number;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({
  icon,
  title,
  description,
  index,
}) => {
  return (
    <div className="group relative bg-galleon-cream p-6 rounded-xl border border-galleon-ink/5 hover:border-galleon-orange/30 transition-all duration-300 hover:shadow-lg">
      {index !== undefined && (
        <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-galleon-ink text-galleon-cream text-xs font-mono font-bold flex items-center justify-center">
          {index}
        </div>
      )}
      <div className="mb-4 text-galleon-orange p-3 bg-galleon-sand/50 rounded-lg inline-block group-hover:bg-galleon-orange/10 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-bold tracking-tight mb-2 text-galleon-ink">
        {title}
      </h3>
      <p className="text-sm text-galleon-ink/70 leading-relaxed">{description}</p>
    </div>
  );
};