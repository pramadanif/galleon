

interface ProblemCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ProblemCard: React.FC<ProblemCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-6 border-l-4 border-aegis-orange bg-aegis-sand/30 h-full">
      <div className="mb-4 text-aegis-orange p-2 bg-aegis-cream rounded-md border border-aegis-sand">
        {icon}
      </div>
      <h3 className="text-lg font-bold font-sans tracking-tight mb-2 text-aegis-ink">{title}</h3>
      <p className="text-sm text-aegis-ink/80 leading-relaxed">{description}</p>
    </div>
  );
};