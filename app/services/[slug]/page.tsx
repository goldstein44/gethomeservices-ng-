"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ServicePage({ params }: { params: { slug: string } }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [clickCount, setClickCount] = useState(0);
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;

      // Fetch approved providers
      const { data: approved } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('status', 'approved');

      setProviders(approved || []);

      if (user) {
        // Count clicks this month
        const { count } = await supabase
          .from('whatsapp_clicks')
          .select('*', { count: 'exact' })
          .eq('user_id', user.id)
          .gte('clicked_at', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString());

        setClickCount(count || 0);
      }
      setLoading(false);
    };

    loadData();
  }, []);

  const handleWhatsAppClick = async (provider: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/auth/login");
      return;
    }

    if (clickCount >= 5 && !isPremium) {
      alert("You have reached your monthly limit of 5 WhatsApp contacts. Upgrade to Premium for unlimited access.");
      return;
    }

    // Record click
    await supabase.from('whatsapp_clicks').insert({
      user_id: session.user.id,
      provider_id: provider.id
    });

    setClickCount(prev => prev + 1);

    window.open(`https://wa.me/${provider.whatsapp}`, '_blank');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold">Available Providers</h1>
      <p className="text-gray-600 mt-2">Click to chat on WhatsApp</p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {providers.map((provider) => (
          <div key={provider.id} className="border rounded-3xl p-6">
            <h3 className="font-bold text-xl">{provider.full_name}</h3>
            <p className="text-sm text-gray-600 mt-2">{provider.services_offered}</p>

            <button 
              onClick={() => handleWhatsAppClick(provider)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-semibold"
            >
              Chat on WhatsApp
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}