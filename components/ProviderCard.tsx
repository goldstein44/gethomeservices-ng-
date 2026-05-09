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
    <div className="bg-white border border-gray-200 rounded-3xl overflow-hidden hover:shadow-lg transition-all group flex flex-col h-full">
      {/* Smaller Image */}
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
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{provider.name}</h3>
        
        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314-11.314z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{provider.location}</span>
        </div>

        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {provider.services.slice(0, 3).map((service, i) => (
              <span 
                key={i} 
                className="text-xs bg-gray-100 px-3 py-1 rounded-full text-gray-700"
              >
                {service}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-auto pt-5 flex gap-3">
          <Link 
            href={`/providers/${provider.id}`}
            className="flex-1 text-center py-3 text-sm border border-gray-300 rounded-2xl hover:bg-gray-50 transition font-medium"
          >
            View Profile
          </Link>
          
          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20need%20${encodeURIComponent(provider.services[0])}%20in%20${encodeURIComponent(provider.location)}. I%20found%20${encodeURIComponent(provider.name)}%20on%20GetHomeServices%20NG.`}
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