"use client";

import { useState } from "react";

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
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("services_offered", selectedServices.join(", "));
    formData.append("access_key", process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY!);
    formData.append("subject", "New Provider Application - GetHomeServices NG");
    formData.append("from_name", "GetHomeServices NG Provider Application");
    formData.append("email", "kaffatechnologies@gmail.com");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert("✅ Application submitted successfully!");
        form.reset();
        setSelectedServices([]);
        window.location.href = "/providers/thank-you";
      } else {
        console.error("Web3Forms Error:", result);
        alert(`❌ Submission failed: ${result.message || "Please try again or contact us on WhatsApp"}`);
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      alert("❌ Network error. Please check your internet connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold tracking-tight">Join Our Network of Verified Professionals</h1>
        <p className="text-xl text-gray-600 mt-4 max-w-lg mx-auto">
          Get consistent jobs across Lagos Island. We connect you with real clients.
        </p>
      </div>

      <div className="bg-white border rounded-3xl p-10">
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-12">
          {/* Provider Type */}
          <div>
            <h2 className="font-semibold text-2xl mb-6">1. Provider Type</h2>
            <div className="flex gap-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="provider_type" value="individual" checked={providerType === "individual"} onChange={() => setProviderType("individual")} className="w-5 h-5 accent-blue-600" />
                <span className="font-medium">Individual Artisan / Technician</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="provider_type" value="business" checked={providerType === "business"} onChange={() => setProviderType("business")} className="w-5 h-5 accent-blue-600" />
                <span className="font-medium">Business / Registered Company</span>
              </label>
            </div>
          </div>

          {/* Personal Information */}
          <div>
            <h2 className="font-semibold text-2xl mb-6">2. Personal / Business Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <input type="text" name="full_name" placeholder="Full Name / Business Name" required className="border rounded-2xl px-6 py-4 w-full" />
              <input type="tel" name="phone" placeholder="Phone Number" required className="border rounded-2xl px-6 py-4 w-full" />
              <input type="tel" name="whatsapp" placeholder="WhatsApp Number" required className="border rounded-2xl px-6 py-4 w-full" />
              <input type="email" name="email" placeholder="Email Address (optional)" className="border rounded-2xl px-6 py-4 w-full" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h2 className="font-semibold text-2xl mb-6">3. Services You Offer</h2>
            <p className="text-sm text-gray-600 mb-3">Select all services you specialize in</p>

            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="border border-gray-300 rounded-2xl px-6 py-4 bg-white flex items-center justify-between cursor-pointer hover:border-blue-500 transition">
              <span className="text-base">
                {selectedServices.length > 0 ? `${selectedServices.length} service${selectedServices.length > 1 ? 's' : ''} selected` : "Select services (tap here)"}
              </span>
              <span className="text-gray-400">▼</span>
            </div>

            {isDropdownOpen && (
              <div className="mt-2 border border-gray-200 rounded-3xl bg-white max-h-80 overflow-auto shadow-lg">
                {allServices.map((service) => (
                  <div key={service} onClick={() => toggleService(service)} className={`px-6 py-4 border-b border-gray-100 flex items-center gap-3 cursor-pointer hover:bg-gray-50 ${selectedServices.includes(service) ? 'bg-blue-50' : ''}`}>
                    <input type="checkbox" checked={selectedServices.includes(service)} readOnly className="w-5 h-5 accent-blue-600 pointer-events-none" />
                    <span>{service}</span>
                  </div>
                ))}
              </div>
            )}

            {selectedServices.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selectedServices.map(service => (
                  <div key={service} className="bg-blue-100 text-blue-700 px-4 py-2 rounded-2xl text-sm flex items-center gap-2">
                    {service}
                    <button type="button" onClick={() => removeService(service)} className="font-bold">×</button>
                  </div>
                ))}
              </div>
            )}

            <textarea name="other_services" placeholder="Any other services not listed above (optional)" className="border rounded-3xl px-6 py-4 w-full h-28 mt-6" />

            <select name="experience" required className="border rounded-2xl px-6 py-4 w-full mt-6">
              <option value="">Years of Experience</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>

          {/* Verification Documents */}
          <div>
            <h2 className="font-semibold text-2xl mb-6">4. Verification Documents</h2>
            {providerType === "individual" ? (
              <div className="space-y-8">
                <div>
                  <label className="block font-medium mb-2">National Identification Number (NIN)</label>
                  <input type="text" name="nin" placeholder="Enter your NIN" required className="border rounded-2xl px-6 py-4 w-full" />
                </div>
                <div>
                  <label className="block font-medium mb-3">NIN Slip</label>
                  <input type="file" name="nin_slip" accept="image/*,.pdf" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3">Full Face Photograph</label>
                  <input type="file" name="face_photo" accept="image/*" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3">Recent Utility Bill</label>
                  <input type="file" name="utility_bill" accept="image/*,.pdf" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label className="block font-medium mb-2">Owner’s National Identification Number (NIN)</label>
                  <input type="text" name="owner_nin" placeholder="Enter owner’s NIN" required className="border rounded-2xl px-6 py-4 w-full" />
                </div>
                <div>
                  <label className="block font-medium mb-3">CAC Certificate</label>
                  <input type="file" name="cac_certificate" accept="image/*,.pdf" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3">Owner’s NIN Slip</label>
                  <input type="file" name="owner_nin_slip" accept="image/*,.pdf" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
                <div>
                  <label className="block font-medium mb-3">Recent Utility Bill</label>
                  <input type="file" name="utility_bill" accept="image/*,.pdf" required className="w-full border rounded-2xl px-6 py-4" />
                </div>
              </div>
            )}
            <input type="text" name="residential_address" placeholder="Residential / Business Address in Lagos Island" required className="border rounded-2xl px-6 py-4 w-full mt-8" />
          </div>

          {/* Terms */}
          <div className="bg-gray-50 border rounded-3xl p-8">
            <h2 className="font-semibold text-2xl mb-6">5. Terms &amp; Conditions</h2>
            <div className="prose text-sm text-gray-700 space-y-4">
              <p>By submitting this application, you agree to the following:</p>
              <ol className="list-decimal pl-5 space-y-3">
                <li>We charge a <strong>20% commission</strong> on every job referred.</li>
                <li>You must maintain high professional standards.</li>
                <li>Breach of terms may lead to suspension or removal.</li>
              </ol>
            </div>
            <label className="flex items-start gap-3 mt-8 cursor-pointer">
              <input type="checkbox" name="terms_agreed" required className="mt-1 w-5 h-5 accent-blue-600" />
              <span className="text-sm text-gray-700">I have read and agree to the Terms &amp; Conditions</span>
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