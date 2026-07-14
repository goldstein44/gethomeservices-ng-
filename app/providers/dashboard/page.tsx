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
  const [fullName, setFullName] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/auth/login");
        return;
      }

      setUser(session.user);
      setFullName(session.user.user_metadata?.full_name || session.user.email?.split('@')[0] || "Provider");

      const { data } = await supabase
        .from('provider_applications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      setApplications(data || []);
      setLoading(false);
    };

    checkAuth();
  }, [router]);

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
          <p className="text-gray-600 mt-1">Welcome, {fullName}</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>

      <div className="grid md:grid-cols-12 gap-8">
        {/* Quick Actions */}
        <div className="md:col-span-4 bg-white border rounded-3xl p-8 h-fit">
          <h2 className="font-semibold text-2xl mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button 
              onClick={() => router.push("/providers/settings")}
              className="w-full bg-gray-900 text-white py-4 rounded-2xl hover:bg-black transition"
            >
              Profile Settings
            </button>
            <button 
              onClick={() => router.push("/providers/premium")}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl hover:bg-emerald-700 transition"
            >
              Upgrade to Premium
            </button>
          </div>
        </div>

        {/* Applications */}
        <div className="md:col-span-8 bg-white border rounded-3xl p-8">
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