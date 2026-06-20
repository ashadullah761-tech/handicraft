"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#2d3748] text-[#fdfbf7] pt-16 pb-8 border-t-4 border-[#e07a5f]">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#f2cc8f]">
            <Globe className="w-6 h-6" />
            <h3 className="text-2xl font-bold font-serif">Marudhar Export</h3>
          </div>
          <p className="text-sm text-gray-300 max-w-xs">
            Bringing the finest traditional Indian handicrafts right to your doorstep. Exporting excellence, culture, and heritage worldwide.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#e07a5f]">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/shop" className="hover:text-[#f4a261] transition-colors">Wooden Diwan</Link></li>
            <li><Link href="/shop" className="hover:text-[#f4a261] transition-colors">Wooden Swing</Link></li>
            <li><Link href="/shop" className="hover:text-[#f4a261] transition-colors">Coffee Table</Link></li>
            <li><Link href="/shop" className="hover:text-[#f4a261] transition-colors">Wooden Chair</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#e07a5f]">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><Link href="/contact" className="hover:text-[#f4a261] transition-colors">Contact Us</Link></li>
            <li><Link href="/contact" className="hover:text-[#f4a261] transition-colors">Export Enquiries</Link></li>
            <li><Link href="/contact" className="hover:text-[#f4a261] transition-colors">Custom Orders</Link></li>
            <li><Link href="/contact" className="hover:text-[#f4a261] transition-colors">Bulk Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-4 text-[#e07a5f]">Contact Us</h4>
          <div className="text-sm text-gray-300 space-y-3">
            <p className="font-medium text-white">Durg Singh</p>
            <p><strong>Email:</strong> marudharExport9@gmail.com</p>
            <p><strong>Phone:</strong> +91 7877609451</p>
            <p><strong>WhatsApp:</strong> +91 7877609451</p>
            <p><strong>Location:</strong> Lawera Kallan, Jodhpur</p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
        <p>&copy; {new Date().getFullYear()} Marudhar Export. All rights reserved.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
