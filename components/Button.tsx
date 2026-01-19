

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  icon,
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center gap-2 px-6 py-3 font-semibold text-sm transition-all duration-200 active:scale-95 border-2 border-transparent";

  const variants = {
    // Primary: Orange bg, Dark text (Industrial look)
    primary: "bg-galleon-orange text-galleon-ink hover:opacity-90 shadow-md",
    // Secondary: Sand bg, Dark text
    secondary: "bg-galleon-sand text-galleon-ink hover:bg-opacity-80",
    // Outline: Transparent bg, Dark border
    outline: "bg-transparent border-galleon-ink text-galleon-ink hover:bg-galleon-sand"
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="w-4 h-4">{icon}</span>}
    </button>
  );
};