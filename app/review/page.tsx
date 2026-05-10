"use client";

import { useState } from "react";

export default function ReviewPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);
    formData.append("subject", "New Customer Review - GetHomeServices NG");
    formData.append("from_name", "GetHomeServices NG Review");
    formData.append("email", "kaffatechnologies@gmail.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
        setTimeout(() => window.location.href = "/", 2500);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
        <div>
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-4xl font-bold text-gray-900">Thank You!</h1>
          <p className="mt-4 text-lg text-gray-700">Your review has been submitted successfully.</p>
          <p className="text-sm text-gray-500 mt-8">Redirecting you back to homepage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">Share Your Experience</h1>
        <p className="text-xl text-gray-700 mt-4">Help other customers by reviewing the service you received</p>
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block font-semibold text-gray-800 mb-3">Provider Name or ID</label>
            <input 
              type="text" 
              name="provider_name" 
              placeholder="e.g. Tunde Electrical Solutions or Provider ID 1" 
              required 
              className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-lg text-gray-900 focus:outline-none focus:border-blue-600" 
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-3">Rating</label>
            <select 
              name="rating" 
              required 
              className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-lg text-gray-900 focus:outline-none focus:border-blue-600"
            >
              <option value="">Select Rating</option>
              <option value="5">5 Stars - Excellent</option>
              <option value="4">4 Stars - Very Good</option>
              <option value="3">3 Stars - Good</option>
              <option value="2">2 Stars - Fair</option>
              <option value="1">1 Star - Poor</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-3">Your Review Comment</label>
            <textarea 
              name="comment" 
              rows={7} 
              placeholder="Tell us about your experience with this provider..." 
              required 
              className="border border-gray-400 rounded-3xl px-6 py-5 w-full text-base text-gray-900 focus:outline-none focus:border-blue-600 resize-y min-h-[160px]"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-6 rounded-3xl text-xl font-semibold transition"
          >
            {isSubmitting ? "Submitting Review..." : "Submit Review"}
          </button>

          <p className="text-center text-sm text-gray-500">
            All reviews are moderated before being published.
          </p>
        </form>
      </div>
    </div>
  );
}