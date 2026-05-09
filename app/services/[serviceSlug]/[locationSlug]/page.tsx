import { notFound } from "next/navigation";
import ProviderCard from "@/components/ProviderCard";
import categoriesData from "@/data/categories.json";
import providersData from "@/data/providers.json";
import locationsData from "@/data/locations.json";

interface Props {
  params: Promise<{ serviceSlug: string; locationSlug: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const category of categoriesData) {
    for (const location of locationsData) {
      params.push({ serviceSlug: category.slug, locationSlug: location.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props) {
  const { serviceSlug, locationSlug } = await params;
  const category = categoriesData.find(c => c.slug === serviceSlug);
  const location = locationsData.find(l => l.slug === locationSlug);

  if (!category || !location) return { title: "Page Not Found" };

  return {
    title: `${category.name} in ${location.name} Lagos | GetHomeServices NG`,
    description: `Find trusted ${category.name.toLowerCase()} professionals in ${location.name}, Lagos Island.`,
  };
}

export default async function ServiceLocationPage({ params }: Props) {
  const { serviceSlug, locationSlug } = await params;

  const category = categoriesData.find(c => c.slug === serviceSlug);
  const location = locationsData.find(l => l.slug === locationSlug);

  if (!category || !location) notFound();

  const filteredProviders = providersData.filter(provider =>
    provider.services.some(s =>
      s.toLowerCase().includes(category.name.toLowerCase().split(" ")[0])
    ) &&
    (provider.location.toLowerCase() === location.name.toLowerCase() ||
     provider.location.toLowerCase().includes(location.name.toLowerCase().split(" ")[0]))
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight">
          {category.name} in {location.name}
        </h1>
        <p className="text-xl text-gray-600 mt-3">
          Verified professionals serving {location.name} and nearby areas
        </p>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-gray-50 rounded-3xl">
          <div className="text-6xl mb-6">🕒</div>
          <h2 className="text-3xl font-semibold text-gray-800">Coming Soon</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-md mx-auto">
            We don't have {category.name.toLowerCase()} providers in {location.name} yet.
          </p>
          <p className="mt-6 text-gray-500">
            Our team is actively onboarding more professionals in this area.
          </p>

          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20need%20a%20${encodeURIComponent(category.name)}%20in%20${encodeURIComponent(location.name)}. Do%20you%20have%20any%20available%20soon%3F`}
            className="mt-10 inline-block bg-emerald-600 text-white px-10 py-4 rounded-3xl font-semibold hover:bg-emerald-700 transition"
          >
            Ask Us About Availability
          </a>
        </div>
      )}
    </div>
  );
}