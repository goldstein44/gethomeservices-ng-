import { notFound } from "next/navigation";
import ProviderCard from "@/components/ProviderCard";
import categoriesData from "@/data/categories.json";
import providersData from "@/data/providers.json";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categoriesData.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const category = categoriesData.find(c => c.slug === slug);

  if (!category) return { title: "Service Not Found" };

  return {
    title: `${category.name} Services in Lagos Island - GetHomeServices NG`,
    description: `Find trusted ${category.name.toLowerCase()} professionals across Lagos Island. Book via WhatsApp.`,
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const category = categoriesData.find(c => c.slug === slug);

  if (!category) notFound();

  const filteredProviders = providersData.filter(provider =>
    provider.services.some(service =>
      service.toLowerCase().includes(category.name.toLowerCase().split(" ")[0])
    )
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-5xl font-bold tracking-tight">{category.name} Services</h1>
        <p className="text-xl text-gray-600 mt-4">
          Verified professionals across Lagos Island
        </p>
      </div>

      {filteredProviders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl">
          <p className="text-2xl text-gray-600">No providers available yet for this service.</p>
          <p className="mt-4 text-gray-500">We are actively adding more professionals.</p>
          
          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20need%20a%20${encodeURIComponent(category.name)}`}
            className="mt-8 inline-block bg-emerald-600 text-white px-10 py-4 rounded-3xl font-semibold"
          >
            Request This Service via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}