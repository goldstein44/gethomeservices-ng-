"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-600 select-none">GetHomeServices</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-base">
            <Link href="/services" className="hover:text-blue-600 transition">Services</Link>
            <Link href="/providers/apply" className="hover:text-blue-600 transition">List Your Service</Link>

            {user ? (
              <>
                <Link href="/providers/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
                <button 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link 
                href="/auth/login" 
                className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700 transition"
              >
                Login / Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pt-6 border-t bg-white">
            <div className="flex flex-col gap-6 text-lg">
              <Link href="/services" className="text-blue-600 hover:text-blue-700" onClick={() => setIsMenuOpen(false)}>Services</Link>
              <Link href="/providers/apply" className="text-blue-600 hover:text-blue-700" onClick={() => setIsMenuOpen(false)}>List Your Service</Link>

              {user ? (
                <>
                  <Link href="/providers/dashboard" className="text-blue-600 hover:text-blue-700" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  <button onClick={handleLogout} className="text-red-600 text-left">Logout</button>
                </>
              ) : (
                <Link href="/auth/login" className="text-blue-600" onClick={() => setIsMenuOpen(false)}>Login / Register</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}