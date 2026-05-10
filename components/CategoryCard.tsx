import Link from "next/link";

export default function CategoryCard({ category }: { category: any }) {
  return (
    <Link 
      href={`/services/${category.slug}`}
      className="group block bg-white border border-gray-200 rounded-3xl p-6 hover:border-blue-200 hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-xl text-gray-900">{category.name}</h3>
          <p className="text-sm text-gray-500 mt-1">Available in Lagos Island</p>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}