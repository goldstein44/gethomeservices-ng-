"use client";

import { useState } from "react";
import { createClient } from '@supabase/supabase-js';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState<"client" | "provider">("client");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          role: role,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        router.push(role === "provider" ? "/providers/apply" : "/");
      }, 1500);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full text-center">
          <h1 className="text-3xl font-bold mb-4">Account Created!</h1>
          <p className="text-gray-600">Please check your email to confirm your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">Create Account</h1>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">I am a:</label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setRole("client")}
                className={`flex-1 py-4 rounded-2xl ${role === "client" ? "bg-blue-600 text-white" : "border border-gray-400"}`}
              >
                Client
              </button>
              <button
                type="button"
                onClick={() => setRole("provider")}
                className={`flex-1 py-4 rounded-2xl ${role === "provider" ? "bg-blue-600 text-white" : "border border-gray-400"}`}
              >
                Service Provider
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input 
              type="text" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
              required 
              className="w-full border border-gray-400 rounded-2xl px-6 py-4 text-base" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full border border-gray-400 rounded-2xl px-6 py-4 text-base" 
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="w-full border border-gray-400 rounded-2xl px-6 py-4 pr-12 text-base" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <label className="flex items-start gap-3 mt-6 cursor-pointer text-sm">
            <input type="checkbox" required className="mt-1" />
            <span>By signing up, you agree to our <a href="/terms-of-service" className="text-blue-600 hover:underline">Terms & Conditions</a></span>
          </label>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-blue-600 text-white py-6 rounded-3xl text-xl font-semibold hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}