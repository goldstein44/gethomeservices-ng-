"use client";

import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ApplyPage() {
  const [providerType, setProviderType] = useState<"individual" | "business">("individual");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const allServices = [
    "Electrician", "Plumber", "Gas Cooker Repair", "AC Technician", "Home Cleaning",
    "Barbing", "Hair & Salon", "Car Wash", "Private Chef", "Laundry/Dry Cleaning",
    "Massage Therapy", "Screeding & Painting", "Pest Control", "Sofa Cleaning",
    "DSTV Installation", "Solar Installation", "TV Wall Installation", "Kitchen Cabinet",
    "Automechanics", "Tiler", "CCTV Camera Installation"
  ];

  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
  const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const removeService = (service: string) => {
    setSelectedServices(selectedServices.filter(s => s !== service));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const files = formData.getAll("documents") as File[];
      const uploadedUrls: string[] = [];

      for (const file of files) {
        if (file.size > 0) {
          if (file.size > MAX_FILE_SIZE) {
            throw new Error(`File "${file.name}" is too large. Maximum size is 5MB.`);
          }
          if (!ALLOWED_TYPES.includes(file.type)) {
            throw new Error(`File "${file.name}" is not allowed. Only JPG, PNG, WebP & PDF files are accepted.`);
          }

          const fileExt = file.name.split('.').pop()?.toLowerCase();
          const fileName = `applications/${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('provider-documents')
            .upload(fileName, file, { upsert: true });

          if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

          const { data: { publicUrl } } = supabase.storage
            .from('provider-documents')
            .getPublicUrl(fileName);

          uploadedUrls.push(publicUrl);
        }
      }

      const { error } = await supabase
        .from('provider_applications')
        .insert([{
          full_name: formData.get("full_name"),
          phone: formData.get("phone"),
          whatsapp: formData.get("whatsapp"),
          email: formData.get("email"),
          provider_type: providerType,
          services_offered: selectedServices.join(", "),
          other_services: formData.get("other_services"),
          experience: formData.get("experience"),
          nin: formData.get("nin"),
          residential_address: formData.get("residential_address"),
          documents: uploadedUrls,
          status: "pending"
        }]);

      if (error) throw error;

      alert("✅ Application submitted successfully!");
      form.reset();
      setSelectedServices([]);
      window.location.href = "/providers/thank-you";

    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`❌ ${error.message || "Submission failed. Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">Join Our Network of Verified Professionals</h1>
        <p className="text-xl text-gray-700 mt-4 max-w-lg mx-auto">
          Get consistent jobs across Lagos Island. We connect you with real clients.
        </p>
      </div>

      <div className="bg-white border border-gray-300 rounded-3xl p-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-12">

          {/* 1. Provider Type */}
          <div>
            <h2 className="font-semibold text-2xl mb-6 text-gray-900">1. Provider Type <span className="text-red-500">*</span></h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="provider_type" 
                  value="individual" 
                  checked={providerType === "individual"} 
                  onChange={() => setProviderType("individual")} 
                  className="w-5 h-5 accent-blue-600" 
                />
                <span className="font-medium text-gray-800">Individual Artisan / Technician</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="radio" 
                  name="provider_type" 
                  value="business" 
                  checked={providerType === "business"} 
                  onChange={() => setProviderType("business")} 
                  className="w-5 h-5 accent-blue-600" 
                />
                <span className="font-medium text-gray-800">Business / Registered Company</span>
              </label>
            </div>
          </div>

          {/* 2. Personal / Business Information */}
          <div>
            <h2 className="font-semibold text-2xl mb-6 text-gray-900">2. Personal / Business Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name / Business Name <span className="text-red-500">*</span></label>
                <input type="text" name="full_name" placeholder="Full Name / Business Name" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Phone Number <span className="text-red-500">*</span></label>
                <input type="tel" name="phone" placeholder="Phone Number" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">WhatsApp Number <span className="text-red-500">*</span></label>
                <input type="tel" name="whatsapp" placeholder="WhatsApp Number" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" name="email" placeholder="Email Address (optional)" className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
              </div>
            </div>
          </div>

          {/* 3. Services You Offer - same as before */}
          <div>
            <h2 className="font-semibold text-2xl mb-6 text-gray-900">3. Services You Offer <span className="text-red-500">*</span></h2>
            <p className="text-sm text-gray-600 mb-3">Select all services you specialize in</p>

            <div 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="border border-gray-400 rounded-2xl px-6 py-4 bg-white flex items-center justify-between cursor-pointer hover:border-blue-600 transition text-gray-900"
            >
              <span>
                {selectedServices.length > 0 ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected` : "Select services (tap here)"}
              </span>
              <span className="text-gray-400">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="mt-2 border border-gray-300 rounded-3xl bg-white max-h-80 overflow-auto shadow-lg z-50 relative">
                {allServices.map((service) => (
                  <div
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-6 py-4 border-b border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${selectedServices.includes(service) ? 'bg-blue-50' : ''}`}
                  >
                    <input type="checkbox" checked={selectedServices.includes(service)} readOnly className="w-5 h-5 accent-blue-600 pointer-events-none" />
                    <span className="text-gray-800">{service}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedServices.map((service) => (
                  <div key={service} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm flex items-center gap-2">
                    {service}
                    <button type="button" onClick={() => removeService(service)} className="font-bold">×</button>
                  </div>
                ))}
              </div>
            )}

            <textarea name="other_services" placeholder="Any other services not listed above (optional)" className="border border-gray-400 rounded-3xl px-6 py-4 w-full h-28 mt-6 text-gray-900" />

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Years of Experience <span className="text-red-500">*</span></label>
              <select name="experience" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900">
                <option value="">Select years of experience</option>
                <option value="1-3">1-3 years</option>
                <option value="3-5">3-5 years</option>
                <option value="5+">5+ years</option>
              </select>
            </div>
          </div>

          {/* 4. Verification Documents - Dynamic based on providerType */}
          <div>
            <h2 className="font-semibold text-2xl mb-6 text-gray-900">4. Verification Documents</h2>
            
            {providerType === "individual" ? (
              <div className="space-y-8">
                <div>
                  <label className="block font-medium mb-2 text-gray-800">National Identification Number (NIN) <span className="text-red-500">*</span></label>
                  <input type="text" name="nin" placeholder="Enter your NIN" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">NIN Slip <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*,.pdf" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">Full Face Photograph <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">Recent Utility Bill <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*,.pdf" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label className="block font-medium mb-2 text-gray-800">Owner’s National Identification Number (NIN) <span className="text-red-500">*</span></label>
                  <input type="text" name="owner_nin" placeholder="Enter owner’s NIN" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">CAC Certificate <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*,.pdf" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">Owner’s NIN Slip <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*,.pdf" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3 text-gray-800">Recent Utility Bill <span className="text-red-500">*</span></label>
                  <input type="file" name="documents" accept="image/*,.pdf" required className="w-full border border-gray-400 rounded-2xl px-6 py-4" />
                </div>
              </div>
            )}

            <div className="mt-8">
              <label className="block font-medium mb-2 text-gray-800">Residential / Business Address in Lagos Island <span className="text-red-500">*</span></label>
              <input type="text" name="residential_address" placeholder="Residential / Business Address in Lagos Island" required className="border border-gray-400 rounded-2xl px-6 py-4 w-full text-gray-900" />
            </div>
          </div>

          {/* 5. Terms & Conditions - same */}
          <div className="bg-gray-50 border rounded-3xl p-8">
            <h2 className="font-semibold text-2xl mb-6 text-gray-900">5. Terms &amp; Conditions <span className="text-red-500">*</span></h2>
            <div className="prose text-sm text-gray-700 space-y-4">
              <p>By submitting this application, you agree to the following terms and conditions:</p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>We charge a <strong>20% commission</strong> on every job referred through our platform.</li>
                <li>Payment by the client is either made directly to us or to you. If payment is made to us first, we deduct our 20% commission and remit your 80% the same day.</li>
                <li>All receipts of payment received from clients must be sent to us immediately as proof of payment. <strong>Cash payments are not allowed</strong> without prior approval.</li>
                <li>If payment is made directly to you, you must send us our 20% commission before the end of the same day.</li>
                <li>You must contact the client within <strong>30 minutes</strong> of receiving their details. Failure to do so may result in the job being reassigned to another provider.</li>
                <li>If for any reason you cannot fulfill an assigned job, you must notify both the client and us at least <strong>24 hours</strong> in advance (or a minimum of 6 hours in emergencies).</li>
                <li>Failure to show up for an assigned task without proper notification may lead to immediate suspension or permanent removal from the platform.</li>
                <li>Receiving multiple bad reviews from clients may result in suspension or complete removal from our platform.</li>
                <li>You must maintain high professional standards, punctuality, and excellent customer service at all times.</li>
                <li>Breach of any of these terms may lead to suspension or permanent removal from the platform.</li>
              </ol>
            </div>
            <label className="flex items-start gap-3 mt-8 cursor-pointer">
              <input type="checkbox" name="terms_agreed" required className="mt-1 w-5 h-5 accent-blue-600" />
              <span className="text-sm text-gray-800">I have read and agree to the Terms &amp; Conditions above.</span>
            </label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-6 rounded-3xl text-xl font-semibold transition"
          >
            {isSubmitting ? "Submitting Application..." : "Submit Application for Review"}
          </button>
        </form>
      </div>
    </div>
  );
}