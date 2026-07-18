"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PremiumPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const packages = [
    { name: "10 Clicks", price: 5000, clicks: 10 },
    { name: "30 Clicks", price: 15000, clicks: 30 },
    { name: "50 Clicks", price: 35000, clicks: 50 },
    { name: "100 Clicks", price: 70000, clicks: 100 },
  ];

  const handlePurchase = (pkg: any) => {
    setLoading(true);

    const paystack = new (window as any).PaystackPop();

    paystack.newTransaction({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email: "user@example.com", // Replace with real user email later
      amount: pkg.price * 100, // in kobo
      currency: "NGN",
      reference: `CLICK-${Date.now()}`,
      callback: (response: any) => {
        alert(`✅ Purchased ${pkg.clicks} clicks successfully!`);
        router.push("/providers/dashboard");
      },
      onClose: () => setLoading(false)
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold">Get More Leads</h1>
        <p className="text-xl text-gray-600 mt-4">Choose a package or go unlimited</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="border rounded-3xl p-8 bg-white">
          <h3 className="text-2xl font-semibold">Free Plan</h3>
          <p className="text-5xl font-bold mt-4">5 Clicks</p>
          <p className="text-gray-500">per month</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ Basic access</li>
            <li>✓ 5 WhatsApp contacts</li>
          </ul>
          <div className="mt-10 text-center text-gray-500 text-sm">Current Plan</div>
        </div>

        {/* Click Packages */}
        {packages.map((pkg, i) => (
          <div key={i} className="border rounded-3xl p-8 bg-white hover:border-blue-600 transition">
            <h3 className="text-2xl font-semibold">{pkg.name}</h3>
            <p className="text-5xl font-bold mt-4">₦{pkg.price.toLocaleString()}</p>
            <button 
              onClick={() => handlePurchase(pkg)}
              disabled={loading}
              className="mt-10 w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
            >
              Buy Now
            </button>
          </div>
        ))}

        {/* Monthly Unlimited */}
        <div className="border border-emerald-600 rounded-3xl p-8 bg-emerald-50">
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-1 rounded-full w-fit">MOST POPULAR</div>
          <h3 className="text-2xl font-semibold mt-6">Monthly Unlimited</h3>
          <p className="text-5xl font-bold mt-4">₦18,000</p>
          <p className="text-emerald-600">per month</p>
          <ul className="mt-8 space-y-3 text-sm">
            <li>✓ Unlimited WhatsApp contacts</li>
            <li>✓ Featured listing</li>
            <li>✓ Priority support</li>
          </ul>
          <button className="mt-10 w-full bg-emerald-600 text-white py-4 rounded-2xl hover:bg-emerald-700">
            Upgrade to Unlimited
          </button>
        </div>
      </div>
    </div>
  );
}