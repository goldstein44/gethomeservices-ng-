import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <span className="text-3xl font-bold text-white">GetHome</span>
            <span className="text-3xl font-bold text-emerald-500">Services</span>
            <span className="text-xs font-medium bg-emerald-900 text-emerald-400 px-2 py-1 rounded ml-2">NG</span>
            
            <p className="mt-6 text-sm leading-relaxed">
              Connecting you directly with trusted home service professionals across Lagos Island. 
              Browse profiles, view real reviews, and message providers instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/services/electrician" className="hover:text-white transition">Browse Services</Link></li>
              <li><Link href="/providers/apply" className="hover:text-white transition">List Your Service</Link></li>
              <li><Link href="/review" className="hover:text-white transition">Submit a Review</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold text-white mb-5">Popular Areas</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <Link href="/locations/lekki" className="hover:text-white transition">Lekki</Link>
              <Link href="/locations/ajah" className="hover:text-white transition">Ajah</Link>
              <Link href="/locations/victoria-island" className="hover:text-white transition">Victoria Island</Link>
              <Link href="/locations/ikoyi" className="hover:text-white transition">Ikoyi</Link>
              <Link href="/locations/vgc" className="hover:text-white transition">VGC</Link>
              <Link href="/locations/chevron" className="hover:text-white transition">Chevron</Link>
            </div>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-semibold text-white mb-5">Get In Touch</h4>
            <a 
              href="https://wa.me/2348125146666" 
              target="_blank"
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-500 transition"
            >
              💬 WhatsApp: 0812 514 6666
            </a>

            <div className="mt-10 text-xs space-y-2">
              <p>© 2026 GetHomeServices NG. A product of Kaffa Technologies Ltd.</p>
              <div className="flex gap-4">
                <Link href="/privacy-policy" className="hover:text-white transition">Privacy Policy</Link>
                <Link href="/terms-of-service" className="hover:text-white transition">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}