export default function TermsOfService() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20 prose prose-gray">
      <h1 className="text-4xl font-bold mb-10">Terms of Service</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: April 2026</p>

      <p>Welcome to GetHomeServices NG. By using our platform, you agree to these Terms of Service.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">1. Platform Role</h2>
      <p>GetHomeServices NG is a <strong>marketplace platform</strong> that connects customers with independent service providers. We do not provide any services ourselves. All services are performed by third-party independent providers.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">2. For Customers</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>You are entering into a direct agreement with the service provider you choose.</li>
        <li>We only facilitate the initial introduction via WhatsApp.</li>
        <li>Payment arrangements, service delivery, and quality are solely between you and the provider.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-4">3. For Service Providers</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li>You are an independent contractor. GetHomeServices NG does not employ you.</li>
        <li>We charge a 20% commission on every referred job.</li>
        <li>You must maintain high professional standards and respond to leads promptly.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-12 mb-4">4. Liability &amp; Dispute Resolution</h2>
      <p className="font-medium">Important:</p>
      <p>GetHomeServices NG is not liable for any loss, damage, theft, injury, or poor service caused by a provider.</p>
      
      <div className="bg-red-50 border-l-4 border-red-500 p-6 my-8">
        <p><strong>If a provider steals, damages property, or fails to deliver:</strong></p>
        <ul className="list-disc pl-6 mt-3 space-y-2">
          <li>We will investigate the complaint thoroughly.</li>
          <li>The provider may be warned, suspended, or permanently removed from our platform.</li>
          <li>We will share relevant provider details with you to assist with police reports or legal action if needed.</li>
          <li>However, we are not responsible for recovering losses or compensating you financially.</li>
        </ul>
      </div>

      <p>You are encouraged to verify the provider, take photos before/after service, and use secure payment methods.</p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">5. Commission &amp; Payments</h2>
      <p>Our 20% commission applies to all jobs originated through our platform. Providers agree to remit this commission whether payment is made through us or directly to them.</p>

      <p className="mt-12 text-sm text-gray-500">
        For questions regarding these terms, please contact us via WhatsApp at 0812 514 6666.
      </p>
    </div>
  );
}