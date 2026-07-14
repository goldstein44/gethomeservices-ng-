"use client";

import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";

import categoriesData from "@/data/categories.json";
import locationsData from "@/data/locations.json";
import { createClient } from '@supabase/supabase-js';
import { useState, useEffect } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [featuredProviders, setFeaturedProviders] = useState<any[]>([]);

  useEffect(() => {
    const loadFeatured = async () => {
      const { data } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('status', 'approved')
        .limit(6);

      setFeaturedProviders(data || []);
    };

    loadFeatured();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const serviceSlug = formData.get("service") as string;
    const locationSlug = formData.get("location") as string;

    if (serviceSlug && locationSlug) {
      window.location.href = `/services/${serviceSlug}/${locationSlug}`;
    } else if (serviceSlug) {
      window.location.href = `/services/${serviceSlug}`;
    } else {
      alert("Please select a service");
    }
  };

  return (
    <>
      {/* HERO */}
      <section className="bg-gradient-to-br from-blue-600 to-emerald-600 text-white py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight">
            Find Trusted Home Service Providers<br />in Lagos Island
          </h1>
          <p className="mt-6 text-xl max-w-2xl mx-auto opacity-90">
            Instantly connect with verified professionals across all Lagos Island areas.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/services"
              className="bg-white text-blue-700 font-semibold px-10 py-4 rounded-3xl text-lg hover:bg-gray-100 transition"
            >
              Browse Services
            </Link>
            <Link 
              href="/providers/apply"
              className="border border-white/70 hover:bg-white/10 font-semibold px-10 py-4 rounded-3xl text-lg transition"
            >
              List Your Service
            </Link>
          </div>
        </div>
      </section>

      {/* SEARCH BAR */}
      <div className="max-w-4xl mx-auto -mt-8 relative z-10 px-6">
        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-2">What service do you need?</label>
              <select 
                name="service" 
                className="w-full border border-gray-400 rounded-2xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="" className="text-gray-400">Select a service...</option>
                {categoriesData.map(cat => (
                  <option key={cat.id} value={cat.slug} className="text-gray-900">{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-semibold text-gray-800 block mb-2">Your location in Lagos Island</label>
              <select 
                name="location" 
                className="w-full border border-gray-400 rounded-2xl px-5 py-4 text-lg text-gray-900 focus:outline-none focus:border-blue-600"
              >
                <option value="" className="text-gray-400">Select area...</option>
                {locationsData.map(loc => (
                  <option key={loc.id} value={loc.slug} className="text-gray-900">{loc.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-3xl font-semibold text-lg transition"
          >
            Find Providers Near Me
          </button>
        </form>
      </div>

      {/* POPULAR SERVICES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Popular Services</h2>
            <p className="text-gray-600 mt-2">Choose from professional services</p>
          </div>
          <Link href="/services" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
            View all services →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.slice(0, 8).map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* FEATURED PROVIDERS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4 text-gray-900">
            Featured Providers
          </h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">
            Recently approved and verified professionals
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProviders.length > 0 ? (
              featuredProviders.map((provider) => (
                <ProviderCard key={provider.id} provider={provider} />
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-500 py-12">No approved providers yet. They will appear here automatically once approved.</p>
            )}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">How It Works</h2>
        <p className="text-gray-600 mb-16">4 simple steps • Connect directly with providers</p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Search & Browse", desc: "Find service providers by category and location" },
            { step: "2", title: "View Profiles", desc: "See services, photos, reviews and past work" },
            { step: "3", title: "Message via WhatsApp", desc: "Contact the provider directly" },
            { step: "4", title: "Get It Done", desc: "Book and receive quality service" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-2xl font-bold mb-6">
                {item.step}
              </div>
              <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="bg-emerald-600 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Ready to get your home service sorted?</h2>
          <p className="mt-6 text-xl opacity-90">Message verified providers directly on WhatsApp.</p>
          <Link 
            href="/services"
            className="mt-10 inline-flex items-center gap-3 bg-white text-emerald-700 font-semibold px-12 py-5 rounded-3xl text-xl hover:bg-gray-100 transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </>
  );
}