"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    whatsapp: "",
    residential_address: ""
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      setUser(session.user);

      // Fetch profile data
      const { data: appData } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (appData && appData.length > 0) {
        setProfile({
          full_name: appData[0].full_name || "",
          phone: appData[0].phone || "",
          whatsapp: appData[0].whatsapp || "",
          residential_address: appData[0].residential_address || ""
        });
      }

      setApplications(appData || []);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  const handleProfileUpdate = async () => {
    if (!user) return;
    setSaving(true);

    const { error } = await supabase
      .from('provider_applications')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        whatsapp: profile.whatsapp,
        residential_address: profile.residential_address
      })
      .eq('user_id', user.id);

    if (error) {
      alert("Failed to update profile");
    } else {
      alert("Profile updated successfully!");
    }
    setSaving(false);
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split('.').pop();
    const fileName = `profile-photos/${user.id}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('provider-documents')
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      alert("Photo upload failed");
      return;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('provider-documents')
      .getPublicUrl(fileName);

    setProfilePhoto(publicUrl);
    alert("Profile photo updated!");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) return <div className="p-10 text-center">Loading dashboard...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Provider Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome, {profile.full_name || user?.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Profile Settings */}
        <div className="md:col-span-5 bg-white border rounded-3xl p-8">
          <h2 className="font-semibold text-2xl mb-6">Profile Settings</h2>

          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-md">
              {profilePhoto ? (
                <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl">👤</div>
              )}
            </div>
            <label className="mt-4 cursor-pointer text-blue-600 hover:text-blue-700 text-sm">
              Change Photo
              <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
            </label>
          </div>

          <div className="space-y-6">
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
              onClick={handleProfileUpdate} 
              disabled={saving}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl hover:bg-blue-700 disabled:bg-gray-400"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {/* Applications */}
        <div className="md:col-span-7 bg-white border rounded-3xl p-8">
          <h2 className="font-semibold text-2xl mb-6">My Applications</h2>

          {applications.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500">You have no applications yet.</p>
              <a href="/providers/apply" className="text-blue-600 hover:underline mt-4 inline-block">
                Submit Your First Application →
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {applications.map((app) => (
                <div key={app.id} className="border rounded-2xl p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{app.full_name}</p>
                    <p className="text-sm text-gray-600 mt-1">{app.services_offered}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Applied on {new Date(app.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`px-6 py-2 rounded-full text-sm font-medium self-start
                    ${app.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      app.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {app.status.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}