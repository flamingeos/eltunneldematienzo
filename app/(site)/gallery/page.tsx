"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const categories = ["Todos", "Exterior", "Interior", "Ceramic Coating", "Antes & Después"];

// Placeholder gallery items (replace with real images from DB)
const galleryItems = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  category: categories[(i % 4) + 1],
  alt: `Detailing photo ${i + 1}`,
  aspect: i % 3 === 0 ? "tall" : "normal",
}));

export default function GalleryPage() {
  const [active, setActive] = useState("Todos");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = active === "Todos"
    ? galleryItems
    : galleryItems.filter((g) => g.category === active);

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
                item.aspect === "tall" ? "h-72" : "h-48"
              } bg-gradient-to-br from-[#0a0f1e] to-[#050505]`}
              onClick={() => setLightbox(item.id)}
            >
              {/* Placeholder gradient (replace with actual <Image>) */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(${i * 30}deg, #050510, #0a1530, #007BFF15)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#007BFF]/10 border border-[#007BFF]/20 flex items-center justify-center text-[#007BFF] opacity-60">
                  <ZoomIn size={20} />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[#007BFF]/0 group-hover:bg-[#007BFF]/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="w-10 h-10 rounded-full bg-[#007BFF] flex items-center justify-center">
                  <ZoomIn size={18} className="text-white" />
                </div>
              </div>

              {/* Category badge */}
              <div className="absolute bottom-3 left-3">
                <span className="text-xs text-[#00AFFF] bg-[#050505]/80 px-2 py-1 rounded-full">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
              onClick={() => setLightbox(null)}
            >
              <button
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#007BFF]/20 border border-[#007BFF]/40 flex items-center justify-center text-white hover:bg-[#007BFF]/40 transition-colors"
                onClick={() => setLightbox(null)}
              >
                <X size={18} />
              </button>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-3xl w-full aspect-video bg-gradient-to-br from-[#0a1530] to-[#050505] rounded-2xl border border-[#007BFF]/30 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-gray-600 text-sm">Imagen #{lightbox}</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
