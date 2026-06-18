"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, Image as ImageIcon } from "lucide-react";
import { useEffect } from "react";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  createdAt: Date;
}

const inputClass =
  "w-full bg-[#050505] border border-[#007BFF]/20 rounded-xl px-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-[#007BFF] transition-all text-sm";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [form, setForm] = useState({ url: "", alt: "", category: "exterior" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/gallery").then((r) => r.json()).then(setImages).catch(() => {});
  }, []);

  async function addImage(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        const img = await res.json();
        setImages((prev) => [img, ...prev]);
        setForm({ url: "", alt: "", category: "exterior" });
      }
    } finally {
      setLoading(false);
    }
  }

  async function deleteImage(id: string) {
    if (!confirm("¿Eliminar esta imagen?")) return;
    await fetch(`/api/gallery/${id}`, { method: "DELETE" });
    setImages((prev) => prev.filter((i) => i.id !== id));
  }

  return (
    <div className="p-6 lg:p-8 pt-16 lg:pt-8">
      <div className="mb-6">
        <h1 className="text-white font-black text-2xl">Galería</h1>
        <p className="text-gray-500 text-sm">{images.length} imágenes</p>
      </div>

      {/* Add image form */}
      <form
        onSubmit={addImage}
        className="glass rounded-2xl border border-[#007BFF]/20 p-6 mb-6"
      >
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <Upload size={18} className="text-[#007BFF]" />
          Agregar Imagen (por URL)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
          <input
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
            placeholder="URL de la imagen"
            className={inputClass}
            required
          />
          <input
            value={form.alt}
            onChange={(e) => setForm({ ...form, alt: e.target.value })}
            placeholder="Descripción"
            className={inputClass}
            required
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          >
            <option value="exterior">Exterior</option>
            <option value="interior">Interior</option>
            <option value="ceramic">Ceramic Coating</option>
            <option value="before-after">Antes & Después</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-[#007BFF] text-white font-semibold rounded-xl hover:bg-[#0066dd] transition-all text-sm disabled:opacity-60"
        >
          {loading ? "Agregando..." : "Agregar Imagen"}
        </button>
      </form>

      {/* Grid */}
      {images.length === 0 ? (
        <div className="py-20 text-center">
          <ImageIcon size={40} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-600">No hay imágenes en la galería</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group rounded-xl overflow-hidden aspect-square bg-[#0a0a0a] border border-[#007BFF]/10"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                <button
                  onClick={() => deleteImage(img.id)}
                  className="p-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 bg-black/60 backdrop-blur-sm">
                <p className="text-white text-xs truncate">{img.alt}</p>
                <p className="text-gray-400 text-xs">{img.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
