"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ServiceLocationPage({ params }: { params: { slug: string; locationSlug: string } }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProviders = async () => {
      const { data } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('status', 'approved');

      const filtered = data?.filter(provider => 
        provider.services_offered.toLowerCase().includes(params.slug.replace(/-/g, ' ')) &&
        provider.residential_address.toLowerCase().includes(params.locationSlug.replace(/-/g, ' '))
      ) || [];

      setProviders(filtered);
      setLoading(false);
    };

    loadProviders();
  }, [params.slug, params.locationSlug]);

  const handleWhatsAppClick = (provider: any) => {
    window.open(`https://wa.me/${provider.whatsapp}`, '_blank');
  };

  if (loading) return <div className="p-20 text-center">Loading providers...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold tracking-tight">
        {params.slug.replace(/-/g, ' ')} in {params.locationSlug.replace(/-/g, ' ')}
      </h1>
      <p className="text-gray-600 mt-2">Approved Professionals</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {providers.length > 0 ? (
          providers.map((provider) => (
            <div key={provider.id} className="border rounded-3xl overflow-hidden hover:shadow-lg transition">
              <div className="h-56 bg-gray-200 relative">
                {provider.documents && provider.documents.length > 0 ? (
                  <img 
                    src={provider.documents[0]} 
                    alt={provider.full_name} 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
                )}
              </div>

              <div className="p-6">
                <h3 className="font-bold text-xl">{provider.full_name}</h3>
                <p className="text-sm text-gray-600 mt-1">{provider.services_offered}</p>
                <p className="text-sm text-gray-500 mt-1">📍 {provider.residential_address}</p>

                <div className="mt-6 flex gap-3">
                  <button 
                    onClick={() => router.push(`/providers/${provider.id}`)}
                    className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-2xl hover:bg-gray-50"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => handleWhatsAppClick(provider)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 bg-gray-50 rounded-3xl">
            <p className="text-2xl text-gray-600">No approved providers yet in this area.</p>
          </div>
        )}
      </div>
    </div>
  );
}