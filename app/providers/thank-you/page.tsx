export default function ThankYou() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="text-7xl mb-8">✅</div>
        <h1 className="text-4xl font-bold tracking-tight">Application Received!</h1>
        <p className="mt-6 text-lg text-gray-600">
          Thank you. Our team will carefully review your documents and contact you within 48 hours via WhatsApp or call.
        </p>
        <a href="/" className="mt-12 inline-block text-blue-600 underline">Return to Homepage</a>
      </div>
    </div>
  );
}