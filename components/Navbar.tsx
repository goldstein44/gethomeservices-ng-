import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-bold tracking-tighter text-blue-600">GetHome</span>
            <span className="text-3xl font-bold tracking-tighter text-emerald-600">Services</span>
            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2 py-1 rounded">NG</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <Link href="/services/electrician" className="hover:text-blue-600 transition">Services</Link>
            <Link href="/providers/apply" className="hover:text-blue-600 transition">List Your Service</Link>
          </div>

          {/* WhatsApp Button */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/2348125146666?text=Hi%2C%20I%20want%20to%20book%20a%20service%20via%20GetHomeServices%20NG"
              target="_blank"
              className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2.5 rounded-2xl text-sm font-semibold transition"
            >
              <span className="hidden sm:inline">Chat on WhatsApp</span>
              <span className="sm:hidden">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}