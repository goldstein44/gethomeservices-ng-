"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProviderSettings() {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    residential_address: ""
  });
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      const { data } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .limit(1);

      if (data && data.length > 0) {
        setProfile({
          full_name: data[0].full_name || "",
          phone: data[0].phone || "",
          whatsapp: data[0].whatsapp || "",
          residential_address: data[0].residential_address || ""
        });
      }
    };

    loadProfile();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();

    const { error } = await supabase
      .from('provider_applications')
      .update(profile)
      .eq('user_id', session?.user.id);

    if (error) alert("Failed to save");
    else alert("Profile updated successfully!");

    setSaving(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10">Profile Settings</h1>

      <div className="space-y-8">
        <div>
          <label className="block text-sm font-medium mb-2">Full Name / Business Name</label>
          <input 
            type="text" 
            value={profile.full_name} 
            onChange={(e) => setProfile({...profile, full_name: e.target.value})} 
            className="w-full border border-gray-400 rounded-2xl px-6 py-4" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <input 
            type="tel" 
            value={profile.phone} 
            onChange={(e) => setProfile({...profile, phone: e.target.value})} 
            className="w-full border border-gray-400 rounded-2xl px-6 py-4" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">WhatsApp Number</label>
          <input 
            type="tel" 
            value={profile.whatsapp} 
            onChange={(e) => setProfile({...profile, whatsapp: e.target.value})} 
            className="w-full border border-gray-400 rounded-2xl px-6 py-4" 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Address</label>
          <input 
            type="text" 
            value={profile.residential_address} 
            onChange={(e) => setProfile({...profile, residential_address: e.target.value})} 
            className="w-full border border-gray-400 rounded-2xl px-6 py-4" 
          />
        </div>

        <button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}