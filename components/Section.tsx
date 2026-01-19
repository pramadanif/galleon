import React from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = "",
  id,
  containerClassName = "",
}) => {
  return (
    <section id={id} className={`w-full px-6 py-20 md:py-28 ${className}`}>
      <div className={`max-w-7xl mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};