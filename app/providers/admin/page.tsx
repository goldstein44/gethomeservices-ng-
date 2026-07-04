"use client";

import { useState, useEffect } from "react";
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_USERNAME = "goldstein4";
const ADMIN_PASSWORD = "epignosko";

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      fetchApplications();
    } else {
      setError("Invalid username or password");
    }
  };

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('provider_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
      setError("Failed to load applications");
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('provider_applications')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert("Failed to update status");
    } else {
      fetchApplications();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
          <h1 className="text-3xl font-bold text-center mb-8">Admin Login</h1>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-400 rounded-2xl px-6 py-4"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-400 rounded-2xl px-6 py-4"
                required
              />
            </div>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-6 rounded-3xl text-xl font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Provider Applications</h1>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="px-6 py-3 bg-gray-700 text-white rounded-2xl hover:bg-gray-800"
        >
          Logout
        </button>
      </div>

      {loading ? (
        <p>Loading applications...</p>
      ) : applications.length === 0 ? (
        <p>No applications yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-3 text-left">Date</th>
                <th className="border p-3 text-left">Full Name</th>
                <th className="border p-3 text-left">Phone</th>
                <th className="border p-3 text-left">Provider Type</th>
                <th className="border p-3 text-left">Services</th>
                <th className="border p-3 text-left">Status</th>
                <th className="border p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="border p-3">
                    {new Date(app.created_at).toLocaleDateString()}
                  </td>
                  <td className="border p-3 font-medium">{app.full_name}</td>
                  <td className="border p-3">{app.phone}</td>
                  <td className="border p-3 capitalize">{app.provider_type}</td>
                  <td className="border p-3 text-sm">{app.services_offered}</td>
                  <td className="border p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium
                      ${app.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : 
                        app.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="border p-3">
                    <select 
                      value={app.status}
                      onChange={(e) => updateStatus(app.id, e.target.value)}
                      className="border rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}