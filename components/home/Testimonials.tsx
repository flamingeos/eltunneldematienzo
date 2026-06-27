"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Carlos R.",
    avatar: "CR",
    rating: 5,
    comment:
      "Increíble servicio. Mi BMW quedó como nuevo. El ceramic coating que le aplicaron es de otro nivel. 100% recomendado.",
  },
  {
    name: "María G.",
    avatar: "MG",
    rating: 5,
    comment:
      "El mejor car detailing de Puerto Rico sin duda. El equipo es muy profesional y los resultados hablan por sí solos.",
  },
  {
    name: "José M.",
    avatar: "JM",
    rating: 5,
    comment:
      "Tengo la membresía Plus y es la mejor inversión. Mi carro siempre impecable por un precio fijo mensual.",
  },
  {
    name: "Ana V.",
    avatar: "AV",
    rating: 5,
    comment:
      "La corrección de pintura en mi Porsche quedó perfecta. Se fueron todos los swirls. Trabajo de primera.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-[#007BFF] text-sm font-semibold uppercase tracking-widest mb-3">
            Reseñas
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white mb-4">
            Lo que Dicen Nuestros{" "}
            <span className="text-[#007BFF]">Clientes</span>
          </h2>
          <div className="flex items-center justify-center gap-1 mt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400" fill="currentColor" />
            ))}
            <span className="ml-2 text-gray-400 text-sm">5.0 en Google</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 border border-[#007BFF]/15 hover:border-[#007BFF]/30 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-yellow-400" fill="currentColor" />
                ))}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                &ldquo;{t.comment}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#007BFF] flex items-center justify-center text-white text-xs font-bold">
                  {t.avatar}
                </div>
                <span className="text-white text-sm font-medium">{t.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
