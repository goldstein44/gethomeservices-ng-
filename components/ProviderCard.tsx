import Link from "next/link";

export default function ProviderCard({ provider }: { provider: any }) {
  return (
    <div className="border rounded-3xl overflow-hidden hover:shadow-lg transition">
      <div className="h-56 bg-gray-200 relative">
        {provider.documents && provider.documents.length > 0 ? (
          <img 
            src={provider.documents[0]} 
            alt={provider.full_name} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">👤</div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl">{provider.full_name}</h3>
        <p className="text-sm text-gray-600 mt-1">{provider.services_offered}</p>
        <p className="text-sm text-gray-500 mt-1">📍 {provider.residential_address}</p>

        <div className="mt-6 flex gap-3">
          <Link 
            href={`/providers/${provider.id}`}
            className="flex-1 border border-gray-400 text-gray-700 py-3 rounded-2xl hover:bg-gray-50 text-center"
          >
            View Details
          </Link>
          <button 
            onClick={() => window.open(`https://wa.me/${provider.whatsapp}`, '_blank')}
            className="flex-1 bg-green-600 text-white py-3 rounded-2xl hover:bg-green-700"
          >
            WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}