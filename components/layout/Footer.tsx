import Link from "next/link";
import { Droplets, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#007BFF]/20 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center">
                <Droplets size={16} className="text-white" />
              </div>
              <span className="font-bold text-white">
                El Túnel <span className="text-[#007BFF]">de Matienzo</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Puerto Rico&apos;s premium auto detailing experience. Professional car
              wash, ceramic coatings, and paint protection that transforms your
              vehicle.
            </p>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/eltunneldematienzo/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#007BFF]/10 border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] hover:bg-[#007BFF]/20 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Servicios
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              {["Lavado Exterior", "Detailing Completo", "Ceramic Coating", "Corrección de Pintura", "Membresías"].map((s) => (
                <li key={s}>
                  <Link href="/services" className="hover:text-[#007BFF] transition-colors">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Contacto
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-[#007BFF] mt-0.5 shrink-0" />
                Trujillo Alto, Puerto Rico
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#007BFF] shrink-0" />
                <a href="tel:+17875550000" className="hover:text-white transition-colors">
                  (787) 555-0000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#007BFF] shrink-0" />
                <a href="mailto:info@eltunneldematienzo.com" className="hover:text-white transition-colors">
                  info@eltunneldematienzo.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#007BFF]/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600">
          <p>© 2025 El Túnel de Matienzo. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-gray-400 transition-colors">Privacidad</Link>
            <Link href="#" className="hover:text-gray-400 transition-colors">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
