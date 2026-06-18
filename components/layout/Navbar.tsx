"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Droplets } from "lucide-react";

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
          <div className="w-8 h-8 rounded-full bg-[#007BFF] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(0,123,255,0.8)] transition-shadow">
            <Droplets size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm tracking-wider uppercase text-white">
            El Túnel <span className="text-[#007BFF]">de Matienzo</span>
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
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#050505]/95 backdrop-blur-lg border-b border-[#007BFF]/20"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium ${
                    pathname === link.href ? "text-[#007BFF]" : "text-gray-300"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/booking"
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-[#007BFF] text-white text-sm font-semibold rounded-lg text-center"
              >
                Reservar Ahora
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
