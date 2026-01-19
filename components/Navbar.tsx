"use client";

import { useState } from "react";
import Image from "next/image";
import { Icons } from "./Icons";
import { Button } from "./Button";

export const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "Problem", href: "#problem" },
        { label: "Solution", href: "#solution" },
        { label: "Architecture", href: "#architecture" },
        { label: "Demo", href: "#demo" },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-galleon-cream/80 backdrop-blur-md border-b border-galleon-ink/5">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <a href="/" className="flex items-center gap-2">
                    <Image
                        src="/galleon.png"
                        alt="Galleon Logo"
                        width={36}
                        height={36}
                        className="rounded-md"
                    />
                    <span className="font-bold text-lg tracking-tight">GALLEON</span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-sm font-medium text-galleon-ink/60 hover:text-galleon-ink transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                {/* Desktop CTAs */}
                <div className="hidden md:flex items-center gap-3">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-full border border-galleon-ink/10 flex items-center justify-center hover:bg-galleon-sand/50 transition-colors"
                    >
                        <Icons.Github size={16} />
                    </a>
                    <Button className="h-9 px-4 text-sm">Launch App</Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-9 h-9 rounded-md flex items-center justify-center hover:bg-galleon-sand/50"
                >
                    {mobileMenuOpen ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-galleon-cream border-t border-galleon-ink/5 px-6 py-4 space-y-4 animate-fadeIn">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block text-sm font-medium text-galleon-ink/70 hover:text-galleon-ink py-2"
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-galleon-ink/5">
                        <Button className="w-full h-10 text-sm">Launch App</Button>
                    </div>
                </div>
            )}
        </header>
    );
};
