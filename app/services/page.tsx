import Link from "next/link";
import categoriesData from "@/data/categories.json";

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tight">All Services</h1>
        <p className="text-xl text-gray-600 mt-4">45+ Professional Services Available</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categoriesData.map((category) => (
          <Link 
            key={category.id} 
            href={`/services/${category.slug}`}
            className="group border border-gray-200 hover:border-blue-600 rounded-3xl p-8 transition-all hover:shadow-lg flex flex-col"
          >
            <div className="text-6xl mb-6 group-hover:scale-110 transition-transform">{category.icon || "🔧"}</div>
            <h3 className="text-2xl font-semibold mb-3">{category.name}</h3>
            <p className="text-gray-600 flex-1">Find trusted {category.name.toLowerCase()} professionals in Lagos Island</p>
            <div className="mt-6 text-blue-600 font-medium group-hover:underline">View Providers →</div>
          </Link>
        ))}
      </div>
    </div>
  );
}