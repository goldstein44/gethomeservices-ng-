import Link from "next/link";
import Image from "next/image";

interface Provider {
  id: number;
  name: string;
  location: string;
  services: string[];
  image: string;
}

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
      <div className="relative h-44 bg-gray-100">
        <Image 
          src={provider.image} 
          alt={provider.name}
          fill 
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-semibold text-xl text-gray-900 leading-tight">{provider.name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-gray-600 mt-1.5">
          <span>📍</span>
          <span>{provider.location}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {provider.services.slice(0, 3).map((service, i) => (
            <span key={i} className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700">
              {service}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 flex gap-3">
          <Link 
            href={`/providers/${provider.id}`}
            className="flex-1 text-center py-3 text-sm border border-gray-300 rounded-2xl hover:bg-gray-50 transition font-medium text-gray-800"
          >
            View Profile
          </Link>
          
          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20need%20${encodeURIComponent(provider.services[0])}%20in%20${encodeURIComponent(provider.location)}.`}
            target="_blank"
            className="flex-1 text-center py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl text-sm font-semibold transition"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}