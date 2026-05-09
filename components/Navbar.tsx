import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Text Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-3xl font-bold tracking-tighter text-blue-600">GetHome</span>
          <span className="text-3xl font-bold tracking-tighter text-emerald-600">Services</span>
          <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">NG</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-blue-600 transition">Home</Link>
          <Link href="/services/electrician" className="hover:text-blue-600 transition">Services</Link>
          <Link href="/providers/apply" className="hover:text-blue-600 transition">List Your Service</Link>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/2348125146666?text=Hi%2C%20I%20want%20to%20book%20a%20service%20via%20GetHomeServices%20NG"
            target="_blank"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition"
          >
            {/* Inline WhatsApp/Phone Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2 2 2 0 01-2-2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 01-2-2 2 2 0 012-2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 4.01V8" />
            </svg>
            <span>Chat on WhatsApp</span>
          </a>
          <button className="md:hidden">
            {/* Hamburger Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}