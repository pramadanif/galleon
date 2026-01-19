

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = "", id }) => {
  return (
    <section id={id} className={`w-full px-6 py-20 md:py-28 max-w-7xl mx-auto ${className}`}>
      {children}
    </section>
  );
};