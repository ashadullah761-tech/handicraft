"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Search, User, Menu, Globe } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useEffect, useState } from "react";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

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

        {/* Icons */}
        <div className="flex items-center gap-4 text-[#2d3748]">
          <button aria-label="Search" className="hover:text-[#e07a5f] transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <Link href="/wishlist" aria-label="Wishlist" className="hover:text-[#e07a5f] transition-colors hidden sm:block relative">
            <Heart className="w-5 h-5" />
          </Link>
          <Link href="/cart" aria-label="Cart" className="hover:text-[#e07a5f] transition-colors relative">
            <ShoppingCart className="w-5 h-5" />
            {isMounted && cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#81b29a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
          <Link href="/auth" aria-label="Account" className="hover:text-[#e07a5f] transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </Link>
          <button aria-label="Menu" className="md:hidden hover:text-[#e07a5f] transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

