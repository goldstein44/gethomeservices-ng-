import { notFound } from "next/navigation";
import ProviderCard from "@/components/ProviderCard";
import categoriesData from "@/data/categories.json";
import providersData from "@/data/providers.json";
import locationsData from "@/data/locations.json";

interface Props {
  params: { locationSlug: string };
}

export async function generateStaticParams() {
  return locationsData.map(loc => ({ locationSlug: loc.slug }));
}

export async function generateMetadata({ params }: Props) {
  const location = locationsData.find(l => l.slug === params.locationSlug);
  if (!location) return { title: "Location Not Found" };

  return {
    title: `Home Services in ${location.name} Lagos Island - GetHomeServices NG`,
    description: `Find verified electricians, plumbers, AC technicians, cleaners and more in ${location.name}. Book instantly via WhatsApp.`,
  };
}

export default function LocationPage({ params }: Props) {
  const location = locationsData.find(l => l.slug === params.locationSlug);
  if (!location) notFound();

  const providersInLocation = providersData.filter(p => 
    p.location.toLowerCase() === location.name.toLowerCase() ||
    p.location.toLowerCase().includes(location.name.toLowerCase().split(" ")[0])
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-5xl font-bold tracking-tight">Home Services in {location.name}</h1>
      <p className="text-xl text-gray-600 mt-4">Verified professionals ready to serve {location.name} residents</p>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-8">Available Providers in {location.name}</h2>
        
        {providersInLocation.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {providersInLocation.map(provider => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No providers listed yet in this area. We are expanding rapidly.</p>
        )}
      </div>

      {/* Popular Services in this Location */}
      <div className="mt-20">
        <h2 className="text-2xl font-semibold mb-6">Popular Services in {location.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categoriesData.slice(0, 12).map(cat => (
            <a
              key={cat.id}
              href={`/services/${cat.slug}/${params.locationSlug}`}
              className="block p-6 border rounded-3xl hover:border-blue-300 hover:bg-blue-50 transition text-center"
            >
              {cat.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}