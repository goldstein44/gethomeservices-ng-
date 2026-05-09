export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 prose prose-gray">
      <h1 className="text-4xl font-bold mb-10">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: April 2026</p>

      <p>GetHomeServices NG is a marketplace platform that connects customers with independent service providers. We respect your privacy and are committed to protecting your personal information.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 space-y-2">
        <li>Personal details submitted during provider applications (name, phone, NIN, documents)</li>
        <li>Review submissions and ratings</li>
        <li>Communication sent via our WhatsApp contact</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-4">How We Use Your Information</h2>
      <p>We use your information to verify providers, display profiles, process reviews, and facilitate communication between customers and providers.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Data Sharing</h2>
      <p>We do not sell your personal data. Provider details (name, services, location, reviews) are publicly visible on the platform. Sensitive documents (NIN, utility bills) are used only for internal verification and are not shared publicly.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Security</h2>
      <p>We take reasonable measures to protect your information. However, no system is 100% secure.</p>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mt-12">
        <p className="font-medium">Important Note:</p>
        <p className="mt-2">GetHomeServices NG is only a discovery and lead generation platform. We do not perform any services ourselves. All services are carried out by independent providers.</p>
      </div>
    </div>
  );
}