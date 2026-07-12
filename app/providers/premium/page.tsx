"use client";

import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpgrade = () => {
    setLoading(true);

    const paystack = new (window as any).PaystackPop();

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Add this in .env.local
      email: "user@example.com", // Replace with logged in user email later
      amount: 1000000, // ₦10,000 in kobo
      currency: "NGN",
      reference: "PREM-" + Math.floor(Math.random() * 1000000000),
      callback: async (response: any) => {
        // Payment successful
        alert("Payment successful! Your plan has been upgraded to Premium.");
        // Here you can update user plan in database
        router.push("/providers/dashboard");
      },
      onClose: () => {
        alert("Payment cancelled.");
        setLoading(false);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-5xl font-bold mb-6">Upgrade to Premium</h1>
      <p className="text-2xl mb-8">₦10,000 / month</p>

      <div className="bg-white border rounded-3xl p-10 max-w-md mx-auto">
        <ul className="text-left space-y-4 mb-10">
          <li>✅ Unlimited WhatsApp Leads</li>
          <li>✅ Featured Listing</li>
          <li>✅ Priority Support</li>
          <li>✅ Profile Boost</li>
        </ul>

        <button
          onClick={handleUpgrade}
          disabled={loading}
          className="w-full bg-emerald-600 text-white py-6 rounded-3xl text-xl font-semibold hover:bg-emerald-700 disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Pay ₦10,000 Now"}
        </button>
      </div>
    </div>
  );
}