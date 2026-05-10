import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";
import providersData from "@/data/providers.json";
import reviewsData from "@/data/reviews.json";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return providersData.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const provider = providersData.find(p => p.id === parseInt(id));
  
  if (!provider) return { title: "Provider Not Found" };

  return {
    title: `${provider.name} - GetHomeServices NG`,
    description: provider.description,
  };
}

export default async function ProviderProfile({ params }: Props) {
  const { id } = await params;
  const provider = providersData.find(p => p.id === parseInt(id));

  if (!provider) notFound();

  const providerReviews = reviewsData.filter(r => r.providerId === provider.id);

  const avgRating = providerReviews.length > 0 
    ? (providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length).toFixed(1) 
    : "New";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image 
              src={provider.image} 
              alt={provider.name} 
              fill 
              className="object-cover" 
            />
          </div>
        </div>

        <div className="md:col-span-3">
          <h1 className="text-4xl font-bold">{provider.name}</h1>
          <p className="text-gray-500 mt-2">📍 {provider.location}, Lagos Island</p>

          <div className="mt-6">
            <p className="text-lg leading-relaxed">{provider.description}</p>
          </div>

          <div className="mt-8">
            <h3 className="font-medium mb-3">Services Offered</h3>
            <div className="flex flex-wrap gap-3">
              {provider.services.map((s, i) => (
                <span key={i} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-2xl text-sm">{s}</span>
              ))}
            </div>
          </div>

          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(provider.name)}`}
            target="_blank"
            className="mt-10 block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-5 rounded-3xl text-xl transition"
          >
            Contact this Provider via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}