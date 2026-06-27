"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/services", label: "Servicios" },
  { href: "/memberships", label: "Membresías" },
  { href: "/promotions", label: "Promociones" },
  { href: "/gallery", label: "Galería" },
  { href: "/booking", label: "Reservar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/90 backdrop-blur-lg border-b border-[#007BFF]/20"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/logo/el tunnel logo.png"
            alt="El Tunnel de Matienzo"
            width={36}
            height={36}
            className="object-contain opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <span className="font-bold text-sm tracking-wider uppercase text-white">
            El Tunnel <span className="text-[#007BFF]">de Matienzo</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#007BFF]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/booking"
            className="px-4 py-2 bg-[#007BFF] text-white text-sm font-semibold rounded-lg hover:bg-[#0066dd] transition-all hover:shadow-[0_0_20px_rgba(0,123,255,0.5)]"
          >
            Reservar Ahora
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 -mr-2 rounded-lg hover:bg-white/5 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/98 backdrop-blur-xl border-b border-[#007BFF]/20"
          >
            <div className="px-6 py-3 flex flex-col">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-3.5 text-base font-medium border-b border-white/5 last:border-0 transition-colors ${
                    pathname === link.href ? "text-[#007BFF]" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 pb-2">
                <Link
                  href="/booking"
                  onClick={() => setOpen(false)}
                  className="block py-3.5 bg-[#007BFF] text-white text-base font-bold rounded-xl text-center hover:bg-[#0066dd] transition-colors"
                >
                  Reservar Ahora
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
