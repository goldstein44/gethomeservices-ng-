"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";
import { use } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProviderProfile({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [provider, setProvider] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProvider = async () => {
      const { data, error } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('id', resolvedParams.id)
        .single();

      if (error || !data || data.status !== 'approved') {
        router.push("/services");
        return;
      }

      setProvider(data);
      setLoading(false);
    };

    loadProvider();
  }, [resolvedParams.id, router]);

  const handleWhatsAppClick = () => {
    if (provider) {
      window.open(`https://wa.me/${provider.whatsapp}`, '_blank');
    }
  };

  if (loading) return <div className="p-20 text-center">Loading profile...</div>;

  if (!provider) return <div className="p-20 text-center">Provider not found.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Photo */}
        <div className="md:w-2/5">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-200 shadow-lg">
            {provider.documents && provider.documents.length > 0 ? (
              <img 
                src={provider.documents[0]} 
                alt={provider.full_name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">👤</div>
            )}
          </div>
        </div>

        {/* Main Info */}
        <div className="md:w-3/5">
          <h1 className="text-5xl font-bold tracking-tight">{provider.full_name}</h1>
          <p className="text-2xl text-gray-600 mt-2">{provider.provider_type}</p>

          <div className="mt-10 grid grid-cols-2 gap-8 text-lg">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{provider.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="font-medium">{provider.whatsapp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="font-medium">{provider.experience}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{provider.residential_address}</p>
            </div>
          </div>

          <div className="mt-12">
            <h3 className="font-semibold text-3xl mb-4">About Me</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              {provider.bio || "Experienced professional with a commitment to quality service."}
            </p>
          </div>

          {provider.previous_work && provider.previous_work.length > 0 && (
            <div className="mt-12">
              <h3 className="font-semibold text-3xl mb-6">Previous Work</h3>
              <div className="grid grid-cols-3 gap-4">
                {provider.previous_work.map((url: string, i: number) => (
                  <img key={i} src={url} alt="Previous work" className="rounded-2xl aspect-square object-cover" />
                ))}
              </div>
            </div>
          )}

          <div className="mt-16">
            <button 
              onClick={handleWhatsAppClick}
              className="w-full bg-green-600 text-white py-6 rounded-3xl text-xl font-semibold hover:bg-green-700"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}