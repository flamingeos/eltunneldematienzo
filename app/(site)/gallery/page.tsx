"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";

const categories = ["Todos", "Exterior", "Interior", "Ceramic Coating", "Antes & Después"];

const galleryItems = [
  // Real shop photos - Exterior
  { id: "1", src: "/real car pictures/Screenshot 2026-06-19 022851.png", category: "Exterior", alt: "Toyota RAV4 blanco - detailing exterior", aspect: "normal" },
  { id: "2", src: "/real car pictures/Screenshot 2026-06-19 022904.png", category: "Exterior", alt: "Toyota RAV4 - detailing exterior", aspect: "normal" },
  { id: "3", src: "/real car pictures/Screenshot 2026-06-19 022922.png", category: "Exterior", alt: "Toyota Camry gris - detailing exterior", aspect: "normal" },
  { id: "4", src: "/real car pictures/Screenshot 2026-06-19 022932.png", category: "Exterior", alt: "Ford Raptor - detailing exterior", aspect: "tall" },
  { id: "5", src: "/real car pictures/Screenshot 2026-06-19 022944.png", category: "Exterior", alt: "Jeep Wrangler azul - detailing exterior", aspect: "normal" },
  { id: "6", src: "/real car pictures/Screenshot 2026-06-19 022957.png", category: "Exterior", alt: "BMW X5 blanco - detailing exterior", aspect: "tall" },
  // Exterior filler
  { id: "19", src: "https://images.unsplash.com/photo-1694678505383-676d78ea3b96?w=800&auto=format&fit=crop&q=80", category: "Exterior", alt: "Lavado exterior premium", aspect: "normal" },
  { id: "20", src: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?w=800&auto=format&fit=crop&q=80", category: "Exterior", alt: "Detailing exterior completo", aspect: "normal" },
  // Interior filler
  { id: "7", src: "https://images.unsplash.com/photo-1605437241278-c1806d14a4d9?w=800&auto=format&fit=crop&q=80", category: "Interior", alt: "Detailing interior - tablero", aspect: "tall" },
  { id: "8", src: "https://images.unsplash.com/photo-1732357624591-f2137085659b?w=800&auto=format&fit=crop&q=80", category: "Interior", alt: "Limpieza interior profunda", aspect: "normal" },
  { id: "9", src: "https://images.unsplash.com/photo-1638602030549-d04078ed0b90?w=800&auto=format&fit=crop&q=80", category: "Interior", alt: "Detailing asientos y alfombras", aspect: "normal" },
  { id: "10", src: "https://images.unsplash.com/photo-1614527255138-018e29ff34ee?w=800&auto=format&fit=crop&q=80", category: "Interior", alt: "Interior premium detallado", aspect: "tall" },
  // Ceramic Coating filler
  { id: "11", src: "https://images.unsplash.com/photo-1611239179213-d972da54091a?w=800&auto=format&fit=crop&q=80", category: "Ceramic Coating", alt: "Aplicación ceramic coating", aspect: "normal" },
  { id: "12", src: "https://images.unsplash.com/photo-1683647115932-b33455fe6a3e?w=800&auto=format&fit=crop&q=80", category: "Ceramic Coating", alt: "Ceramic coating brillo espejo", aspect: "tall" },
  { id: "13", src: "https://images.unsplash.com/photo-1666693978382-b9a9d4ee62e4?w=800&auto=format&fit=crop&q=80", category: "Ceramic Coating", alt: "Paint correction y ceramic coating", aspect: "normal" },
  { id: "14", src: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=800&auto=format&fit=crop&q=80", category: "Ceramic Coating", alt: "Pulido y protección cerámica", aspect: "normal" },
  // Antes & Después filler
  { id: "15", src: "https://images.unsplash.com/photo-1508974239320-0a029497e820?w=800&auto=format&fit=crop&q=80", category: "Antes & Después", alt: "Transformación - antes y después", aspect: "tall" },
  { id: "16", src: "https://images.unsplash.com/photo-1485291571150-772bcfc10da5?w=800&auto=format&fit=crop&q=80", category: "Antes & Después", alt: "Resultado final del detailing", aspect: "normal" },
  { id: "17", src: "https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=800&auto=format&fit=crop&q=80", category: "Antes & Después", alt: "Restauración completa del vehículo", aspect: "normal" },
  { id: "18", src: "https://images.unsplash.com/photo-1530675706010-bc677ce30ab6?w=800&auto=format&fit=crop&q=80", category: "Antes & Después", alt: "Antes y después - detailing completo", aspect: "tall" },
];

export default function GalleryPage() {
  const [active, setActive] = useState("Todos");
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const filtered = active === "Todos"
    ? galleryItems
    : galleryItems.filter((g) => g.category === active);

  const lightboxItem = galleryItems.find((g) => g.id === lightboxId);

  return (
    <div className="min-h-screen bg-[#050505] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Galería
          </p>
          <h1 className="text-4xl sm:text-6xl font-black text-white mb-4">
            Nuestro{" "}
            <span className="text-[#007BFF]">Trabajo</span>
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto">
            Cada vehículo es un lienzo. Mira las transformaciones que logramos
            para nuestros clientes.
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? "bg-[#007BFF] text-white shadow-[0_0_15px_rgba(0,123,255,0.4)]"
                  : "border border-[#007BFF]/20 text-gray-400 hover:border-[#007BFF]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`break-inside-avoid cursor-pointer group relative overflow-hidden rounded-2xl border border-[#007BFF]/10 hover:border-[#007BFF]/40 transition-all ${
                item.aspect === "tall" ? "h-72" : "h-52"
              }`}
              onClick={() => setLightboxId(item.id)}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center shadow-[0_0_20px_rgba(0,123,255,0.6)]">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-3 left-3">
                <span className="text-xs text-[#00AFFF] bg-[#050505]/80 backdrop-blur-sm px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => setLightboxId(null)}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center text-white hover:bg-[#007BFF]/40 transition-colors z-10"
                onClick={() => setLightboxId(null)}
              >
                <X size={18} />
              </button>
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                className="relative max-w-4xl w-full max-h-[85vh] rounded-2xl overflow-hidden border border-[#007BFF]/30"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxItem.src}
                  alt={lightboxItem.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3">
                  <p className="text-white text-sm font-medium">{lightboxItem.alt}</p>
                  <span className="text-xs text-[#00AFFF]">{lightboxItem.category}</span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
