"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5">
            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-blue-600">GetHome</span>
            <span className="text-2xl md:text-3xl font-bold tracking-tighter text-emerald-600">Services</span>
            <span className="text-[10px] font-medium bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded">NG</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/services/electrician" className="hover:text-blue-600 transition">Services</Link>
            <Link href="/providers/apply" className="hover:text-blue-600 transition">List Your Service</Link>
          </div>

          {/* Mobile Hamburger Menu */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="md:hidden text-gray-700 p-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t">
            <div className="flex flex-col gap-4 text-sm font-medium">
              <Link href="/" className="hover:text-blue-600">Home</Link>
              <Link href="/services/electrician" className="hover:text-blue-600">Services</Link>
              <Link href="/providers/apply" className="hover:text-blue-600">List Your Service</Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}