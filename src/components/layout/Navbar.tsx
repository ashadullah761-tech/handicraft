"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Globe } from "lucide-react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e07a5f]/20 bg-[#fdfbf7]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-[#e07a5f] p-2 rounded-lg text-white">
            <Globe className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-[#2d3748] font-serif leading-none">
              Marudhar Export<span className="text-[#e07a5f]">.</span>
            </span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-widest mt-1">Premium Handicrafts</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 items-center text-[#2d3748] font-medium">
          <Link href="/" className="hover:text-[#e07a5f] transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-[#e07a5f] transition-colors">Shop</Link>
          <Link href="/#about" className="hover:text-[#e07a5f] transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-[#e07a5f] transition-colors">Contact</Link>
        </nav>

        {/* Mobile Menu Icon */}
        <div className="flex items-center gap-4 text-[#2d3748]">
          <button 
            aria-label="Toggle Menu" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -mr-2 hover:text-[#e07a5f] transition-colors relative z-[60]"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute top-20 left-0 w-full shadow-2xl z-[55] flex flex-col">
          <nav className="flex flex-col p-4">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 px-2 text-[#2d3748] font-medium border-b border-gray-100 hover:text-[#e07a5f] transition-colors">Home</Link>
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 px-2 text-[#2d3748] font-medium border-b border-gray-100 hover:text-[#e07a5f] transition-colors">Shop</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 px-2 text-[#2d3748] font-medium border-b border-gray-100 hover:text-[#e07a5f] transition-colors">About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 px-2 text-[#2d3748] font-medium hover:text-[#e07a5f] transition-colors">Contact</Link>
          </nav>
        </div>
      )}
    </header>
  );
}

