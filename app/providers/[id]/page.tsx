import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProviderProfile({ params }: Props) {
  const { id } = await params;

  const { data: provider } = await supabase
    .from('provider_applications')
    .select('*')
    .eq('id', id)
    .single();

  if (!provider || provider.status !== 'approved') notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Photo */}
        <div className="md:w-1/3">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-200">
            {provider.documents && provider.documents.length > 0 ? (
              <img 
                src={provider.documents[0]} 
                alt={provider.full_name} 
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-8xl">👤</div>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="md:w-2/3">
          <h1 className="text-5xl font-bold tracking-tight">{provider.full_name}</h1>
          <p className="text-xl text-gray-600 mt-2">{provider.provider_type}</p>

          <div className="mt-8 grid grid-cols-2 gap-8">
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="text-lg font-medium">{provider.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">WhatsApp</p>
              <p className="text-lg font-medium">{provider.whatsapp}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <p className="text-lg font-medium">{provider.experience}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-medium">{provider.residential_address}</p>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-semibold text-2xl mb-4">Services Offered</h3>
            <p className="text-lg">{provider.services_offered}</p>
          </div>

          <div className="mt-12">
            <button 
              onClick={() => window.open(`https://wa.me/${provider.whatsapp}`, '_blank')}
              className="w-full bg-green-600 text-white py-6 rounded-3xl text-xl font-semibold hover:bg-green-700"
            >
              Chat on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}