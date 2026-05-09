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
        setTimeout(() => window.location.href = "/", 2000);
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
          <h1 className="text-4xl font-bold">Thank You!</h1>
          <p className="mt-4 text-lg text-gray-600">Your review has been submitted successfully.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">Share Your Experience</h1>
        <p className="text-xl text-gray-600 mt-4">Help others by leaving a review</p>
      </div>

      <div className="bg-white border rounded-3xl p-10">
        <form onSubmit={handleSubmit} className="space-y-10">
          <div>
            <label className="block font-medium mb-3">Provider Name or ID</label>
            <input type="text" name="provider_name" placeholder="e.g. Tunde Electrical Solutions" required className="border rounded-2xl px-6 py-4 w-full" />
          </div>

          <div>
            <label className="block font-medium mb-3">Rating</label>
            <select name="rating" required className="border rounded-2xl px-6 py-4 w-full">
              <option value="">Select Rating</option>
              {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Stars</option>)}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-3">Your Review</label>
            <textarea name="comment" rows={6} placeholder="Write your review here..." required className="border rounded-3xl px-6 py-5 w-full" />
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white py-6 rounded-3xl text-xl font-semibold">
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}