import {
  ArrowRight,
  ShieldAlert,
  Link,
  TrendingUp,
  Layers,
  Code,
  Lock,
  CheckCircle,
  Briefcase,
  Users,
  Trophy,
  CreditCard,
  Github,
  Play,
  Wallet,
  FileText,
  ArrowDown,
  ChevronRight,
  ExternalLink,
  Zap,
  Target,
  Shield,
  DollarSign,
  Menu,
  X,
} from "lucide-react";

export const Icons = {
  ArrowRight,
  ShieldAlert,
  Link,
  TrendingUp,
  Layers,
  Code,
  Lock,
  CheckCircle,
  Briefcase,
  Users,
  Trophy,
  CreditCard,
  Github,
  Play,
  Wallet,
  FileText,
  ArrowDown,
  ChevronRight,
  ExternalLink,
  Zap,
  Target,
  Shield,
  DollarSign,
  Menu,
  X,
};

// Custom Ethereum Icon
export const EthIcon = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-galleon-ink"
  >
    <path
      d="M11.9999 1.55859L11.8389 2.10626L7.96191 14.8824L11.9999 17.3888V1.55859Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M11.9999 1.55859L12.1619 2.10626L16.0389 14.8824L11.9999 17.3888V1.55859Z"
      fill="currentColor"
    />
    <path
      d="M7.96191 15.6946L11.8389 21.0886L11.9999 22.1396V18.1976L7.96191 15.6946Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
    <path
      d="M11.9999 22.1396L12.1619 21.0886L16.0399 15.6946L11.9999 18.1976V22.1396Z"
      fill="currentColor"
    />
    <path
      d="M7.96191 14.8825L11.9999 17.3889L16.0389 14.8825L11.9999 12.5186L7.96191 14.8825Z"
      fill="currentColor"
      fillOpacity="0.8"
    />
  </svg>
);

// Custom Stacks Icon
export const StacksIcon = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-galleon-ink"
  >
    <path
      d="M2.45 15.82L12 21.34L21.55 15.82L12 21.34V10.3L2.45 15.82Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M21.55 8.17999L12 2.65999L2.45 8.17999L12 13.7L21.55 8.17999Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

// Custom Bridge Icon
export const BridgeIcon = ({ size = 40 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-galleon-orange"
  >
    <path
      d="M4 16V8C4 6 6 4 8 4H16C18 4 20 6 20 8V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M2 20H22"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M8 20V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M16 20V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="12" cy="10" r="2" fill="currentColor" />
  </svg>
);

// Galleon Logo Icon
export const GalleonLogo = ({ size = 32 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="32" height="32" rx="8" fill="#222222" />
    <path
      d="M16 6L8 10L16 14L24 10L16 6Z"
      stroke="#FF6D1F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8 14L16 18L24 14"
      stroke="#FF6D1F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M8 18L16 22L24 18"
      stroke="#FF6D1F"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);