"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import Link from "next/link";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
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
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">GetHomeServices</Link>

        <div className="flex items-center gap-8">
          <Link href="/services" className="hover:text-blue-600">Services</Link>
          <Link href="/providers/apply" className="hover:text-blue-600">List Your Service</Link>

          {user ? (
            <>
              <Link href="/providers/dashboard" className="hover:text-blue-600">Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link 
              href="/auth/login" 
              className="bg-blue-600 text-white px-8 py-3 rounded-2xl hover:bg-blue-700"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}