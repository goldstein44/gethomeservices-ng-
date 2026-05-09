"use client";   

import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import ProviderCard from "@/components/ProviderCard";
import ReviewCard from "@/components/ReviewCard";

import categoriesData from "@/data/categories.json";
import providersData from "@/data/providers.json";
import reviewsData from "@/data/reviews.json";
import locationsData from "@/data/locations.json";

export default function Home() {
  const featuredProviders = providersData.slice(0, 6);
  const recentReviews = reviewsData.slice(0, 6);
  const popularLocations = locationsData.slice(0, 12);

  // Handle search form submission
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
      alert("Please select both a service and a location");
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
              href="/services/electrician"
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

      {/* SEARCH BAR - Dynamic & Client-Side */}
      <div className="max-w-4xl mx-auto -mt-8 relative z-10 px-6">
        <form onSubmit={handleSearch} className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">What service do you need?</label>
              <select name="service" className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-blue-500">
                <option value="">Select a service...</option>
                {categoriesData.map(cat => (
                  <option key={cat.id} value={cat.slug}>{cat.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Your location in Lagos Island</label>
              <select name="location" className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-lg focus:outline-none focus:border-blue-500">
                <option value="">Select area...</option>
                {locationsData.map(loc => (
                  <option key={loc.id} value={loc.slug}>{loc.name}</option>
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
          <p className="text-center text-xs text-gray-400 mt-4">Message providers directly via WhatsApp • Instant response</p>
        </form>
      </div>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl font-bold tracking-tight">Popular Services</h2>
            <p className="text-gray-600 mt-2">20+ categories • Available across all Lagos Island areas</p>
          </div>
          <Link href="/services/electrician" className="text-blue-600 font-medium flex items-center gap-2 hover:underline">
            View all services <span>→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">Popular Locations</h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">Choose your area for hyper-local service providers</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
            {popularLocations.map((location) => (
              <Link
                key={location.id}
                href={`/locations/${location.slug}`}
                className="bg-white border border-gray-200 rounded-3xl p-6 text-center hover:border-blue-300 hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg">{location.name}</h3>
                <p className="text-sm text-gray-500 mt-1">View providers →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROVIDERS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-tight text-center mb-4">Featured Providers</h2>
          <p className="text-center text-gray-600 max-w-md mx-auto">Verified professionals ready for your next job</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {featuredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-bold tracking-tight mb-4">How It Works</h2>
        <p className="text-gray-600 mb-16">4 simple steps • Connect directly with providers</p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "1", title: "Search & Browse", desc: "Find service providers by category and your exact location" },
            { step: "2", title: "View Profiles", desc: "See services, photos, reviews and past work" },
            { step: "3", title: "Message via WhatsApp", desc: "Contact the provider directly — they respond instantly" },
            { step: "4", title: "Get It Done", desc: "Book, get the job completed and leave a review" }
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

      {/* REVIEWS TEASER */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {recentReviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <div className="bg-emerald-600 text-white py-20 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-4xl font-bold">Ready to get your home service sorted?</h2>
          <p className="mt-6 text-xl opacity-90">Message any provider directly on WhatsApp and get it done fast.</p>
          <a 
            href="https://wa.me/2348125146666?text=Hi%2C%20I%20need%20a%20home%20service%20in%20Lagos%20Island"
            target="_blank"
            className="mt-10 inline-flex items-center gap-3 bg-white text-emerald-700 font-semibold px-12 py-5 rounded-3xl text-xl hover:bg-gray-100 transition"
          >
            💬 Message a Provider Now
          </a>
        </div>
      </div>
    </>
  );
}