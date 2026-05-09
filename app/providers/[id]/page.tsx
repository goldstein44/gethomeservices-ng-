import Image from "next/image";
import { notFound } from "next/navigation";
import ReviewCard from "@/components/ReviewCard";
import providersData from "@/data/providers.json";
import reviewsData from "@/data/reviews.json";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return providersData.map((p) => ({ id: p.id.toString() }));
}

export async function generateMetadata({ params }: Props) {
  const provider = providersData.find(p => p.id === parseInt(params.id));
  if (!provider) return { title: "Provider Not Found" };

  return {
    title: `${provider.name} - Verified Provider | GetHomeServices NG`,
    description: provider.description,
  };
}

export default function ProviderProfile({ params }: Props) {
  const provider = providersData.find(p => p.id === parseInt(params.id));
  if (!provider) notFound();

  const providerReviews = reviewsData.filter(r => r.providerId === provider.id);

  const avgRating = providerReviews.length > 0 
    ? (providerReviews.reduce((sum, r) => sum + r.rating, 0) / providerReviews.length).toFixed(1) 
    : "New";

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-5 gap-12">
        {/* Left Column - Image + Info */}
        <div className="md:col-span-2">
          <div className="relative aspect-square rounded-3xl overflow-hidden">
            <Image 
              src={provider.image} 
              alt={provider.name} 
              fill 
              className="object-cover" 
            />
          </div>

          <div className="mt-8 bg-white border rounded-3xl p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">{provider.name}</h1>
                <p className="text-gray-500 flex items-center gap-2 mt-2">
                  📍 {provider.location}, Lagos Island
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-semibold text-emerald-600">{avgRating}</div>
                <p className="text-xs text-gray-400">Average Rating</p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-medium mb-3">Services Offered</h3>
              <div className="flex flex-wrap gap-3">
                {provider.services.map((s, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-5 py-2 rounded-2xl text-sm">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Description + CTA + Reviews */}
        <div className="md:col-span-3">
          <div className="prose max-w-none">
            <p className="text-lg leading-relaxed text-gray-700">{provider.description}</p>
          </div>

          <a 
            href={`https://wa.me/2348125146666?text=Hi%2C%20I%20want%20to%20book%20${encodeURIComponent(provider.name)}%20for%20${encodeURIComponent(provider.services[0])}%20in%20${encodeURIComponent(provider.location)}.`}
            target="_blank"
            className="mt-10 block w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-5 rounded-3xl text-xl transition"
          >
            Request This Provider via WhatsApp
          </a>

          <p className="text-center text-xs text-gray-400 mt-4">Our team will confirm availability and assign the job</p>

          {/* Reviews Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-semibold mb-8">Client Reviews ({providerReviews.length})</h2>
            
            {providerReviews.length > 0 ? (
              <div className="space-y-6">
                {providerReviews.map((review, i) => (
                  <ReviewCard key={i} review={review} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet. Be the first to review after service!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}